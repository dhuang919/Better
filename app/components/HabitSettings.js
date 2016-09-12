'use strict';
// Temporary fix for suppressing warnings from DatePickerIOS which
// has an unresolved issue regarding the date being passed to it
// https://github.com/facebook/react-native/issues/4547
console.ignoredYellowBox = [
  'Warning: Failed propType',
];

import React, {
  View,
  Text,
  Switch,
  AlertIOS,
  PropTypes,
  Component,
  TextInput,
  Navigator,
  StyleSheet,
  DatePickerIOS,
  TouchableOpacity,
} from 'react-native';
import api from '../lib/api';
import Button from 'react-native-button';

export default class HabitSettings extends Component {
  constructor (props) {
    super(props);
    this.state = {
      user: props.user,
      habit: props.habit,
    };
    this.toggleDay = this.toggleDay.bind(this);
    this.gotoInbox = this.gotoInbox.bind(this);
    this.updateHabit = this.updateHabit.bind(this);
    this.deleteHabit = this.deleteHabit.bind(this);
    this.renderScene = this.renderScene.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.onReminderChange = this.onReminderChange.bind(this);
  }

  onDateChange (date) {
    let updates = this.state.habit;
    updates.reminder.time = date;
    this.setState({ habit: updates });
  }

  onTextChange (text) {
    let updates = this.state.habit;
    updates.action = text;
    this.setState({ habit: updates });
  }

  onReminderChange (bool) {
    let updates = this.state.habit;
    updates.reminder.active = bool;
    this.setState({ habit: updates });
    let user = this.state.user;

    if (bool && !user.phoneNumber) {
      AlertIOS.prompt(
        'Update Phone #',
        'We need your phone number to send you SMS reminders!',
        [
          {
            text: 'Cancel',
            onPress: (function () {
              updates.reminder.active = false;
              this.setState({ habit: updates });
            }).bind(this),
            style: 'cancel',
          },
          {
            text: 'Save',
            onPress: (function (number) {
              number = number.replace(/\D/g,'');
              if (number.length === 10) {
                fetch(`${process.env.SERVER}/user/${user.email}`, {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.props.token.idToken}`
                  },
                  body: JSON.stringify({
                    phoneNumber: `+1${number}`
                  })
                })
                .then(api.handleErrors)
                .catch( (err) => console.error(err) );
              } else {
                updates.reminder.active = false;
                this.setState({ habit: updates });
                AlertIOS.alert('Please enter a US number', 'Format: (555) 555-1212. Country code not required.');
              }
            }).bind(this)
          }
        ]
      );
    }
  }

  gotoInbox () {
    this.props.navigator.push({ id: 'InboxContainer' });
  }

  updateHabit (habitId) {
    fetch(`${process.env.SERVER}/habits/${this.props.profile.email}/${habitId}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.token.idToken}`,
      },
      body: JSON.stringify(this.state.habit),
    })
    .then(api.handleErrors)
    .then( response => response.json() )
    .then( habit => this.gotoInbox() )
    .catch( err => console.warn(err) );
  }

  deleteHabit (habitId) {
    // TODO: refactor server call to api library
    fetch(`${process.env.SERVER}/habits/${this.props.profile.email}/${habitId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this.props.token.idToken}`,
      },
    })
    .then(api.handleErrors)
    .then( () => this.props.navigator.push({ id: 'InboxContainer' }) )
    .catch( err => console.warn(err) );
  }

  toggleDay (day) {
    let updates = this.state.habit;
    updates.reminder.days[day] = !updates.reminder.days[day];
    this.setState({ habit: updates });
  }

  render () {
    return (
      <View style={{ flex: 1 }}>
        <Navigator
          renderScene={this.renderScene}
          navigator={this.props.navigator}
          navigationBar={
            <Navigator.NavigationBar
              style={{backgroundColor: '#6399DC', alignItems: 'center'}}
              routeMapper={NavigationBarRouteMapper}
            />
          }
        />
      </View>
    );
  }

  renderScene (route, navigator) {
    if (this.state.habit.reminder.active) {
      return (
        <View style={styles.container}>
          <TextInput
            style={styles.heading}
            onChangeText={this.onTextChange}
            defaultValue={this.props.habit.action}
          />
          <View style={{flexDirection: 'row', marginTop: 25}}>
            <Text style={{fontSize: 22, fontFamily: 'Avenir'}}>
              SMS Reminder
            </Text>
            <Switch
              style={{left: 140, marginBottom: 10}}
              onValueChange={this.onReminderChange}
              value={this.state.habit.reminder.active}
            />
          </View>
          <DatePickerIOS
            mode="time"
            minuteInterval={5}
            onDateChange={this.onDateChange}
            date={new Date(this.state.habit.reminder.time)}
          />
          <Text style={styles.weekTitle}>Weekdays (tap to select)</Text>
          <View style={styles.week}>
            <Button
              style={styles.dayButtonText}
              styleDisabled={{color: 'red'}}
              onPress={ () => this.toggleDay('sun') }
              containerStyle={ this.state.habit.reminder.days['sun'] ? styles.dayActive : styles.dayInactive }
            >
              Sun
            </Button>
            <Button
              style={styles.dayButtonText}
              styleDisabled={{color: 'red'}}
              onPress={ () => this.toggleDay('mon') }
              containerStyle={ this.state.habit.reminder.days['mon'] ? styles.dayActive : styles.dayInactive }
            >
              Mon
            </Button>
            <Button
              style={styles.dayButtonText}
              styleDisabled={{color: 'red'}}
              onPress={ () => this.toggleDay('tue') }
              containerStyle={ this.state.habit.reminder.days['tue'] ? styles.dayActive : styles.dayInactive }
            >
              Tue
            </Button>
            <Button
              style={styles.dayButtonText}
              styleDisabled={{color: 'red'}}
              onPress={ () => this.toggleDay('wed') }
              containerStyle={ this.state.habit.reminder.days['wed'] ? styles.dayActive : styles.dayInactive }
            >
              Wed
            </Button>
            <Button
              style={styles.dayButtonText}
              styleDisabled={{color: 'red'}}
              onPress={ () => this.toggleDay('thu') }
              containerStyle={ this.state.habit.reminder.days['thu'] ? styles.dayActive : styles.dayInactive }
            >
              Thu
            </Button>
            <Button
              style={styles.dayButtonText}
              styleDisabled={{color: 'red'}}
              onPress={ () => this.toggleDay('fri') }
              containerStyle={ this.state.habit.reminder.days['fri'] ? styles.dayActive : styles.dayInactive }
            >
              Fri
            </Button>
            <Button
              style={styles.dayButtonText}
              styleDisabled={{color: 'red'}}
              onPress={ () => this.toggleDay('sat') }
              containerStyle={ this.state.habit.reminder.days['sat'] ? styles.dayActive : styles.dayInactive }
            >
              Sat
            </Button>
          </View>
          <Button
            styleDisabled={{color: 'red'}}
            style={styles.updateButtonText}
            containerStyle={styles.updateButtonContainer}
            onPress={ () => this.updateHabit(this.state.habit._id) }
          >
            Update Habit
          </Button>
          <Button
            styleDisabled={{color: 'red'}}
            style={styles.deleteButtonText}
            containerStyle={styles.deleteButtonContainer}
            onPress={ () => this.deleteHabit(this.state.habit._id) }
          >
            Delete Habit
          </Button>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <TextInput
            style={styles.heading}
            onChangeText={this.onTextChange}
            defaultValue={this.props.habit.action}
          />
          <View style={{ flexDirection: 'row', marginTop: 25, marginBottom: 216 }}>
            <Text style={{fontSize: 22, fontFamily: 'Avenir'}}>
              SMS Reminder
            </Text>
            <Switch
              style={{left: 140, marginBottom: 10}}
              onValueChange={this.onReminderChange}
              value={this.state.habit.reminder.active}
            />
          </View>
          <Button
            style={styles.updateButtonText}
            styleDisabled={{color: 'red'}}
            containerStyle={styles.updateButtonContainer}
            onPress={ () => this.updateHabit(this.state.habit._id) }
          >
            Update Habit
          </Button>
          <Button
            styleDisabled={{color: 'red'}}
            style={styles.deleteButtonText}
            containerStyle={styles.deleteButtonContainer}
            onPress={ () => this.deleteHabit(this.state.habit._id) }
          >
            Delete
          </Button>
        </View>
      );
    }
  }
}

HabitSettings.PropTypes = {
  user: PropTypes.object,
  habit: PropTypes.object,
  token: PropTypes.object,
  profile: PropTypes.object,
  navigator: PropTypes.object,
};

const NavigationBarRouteMapper = {
  LeftButton (route, navigator, index, navState) {
    return (
      <TouchableOpacity
        style={{flex: 1, justifyContent: 'center'}}
        onPress={ () => navigator.parentNavigator.pop() }>
        <Text style={{color: 'white', margin: 10}}>
          Back
        </Text>
      </TouchableOpacity>
    );
  },

  RightButton (route, navigator, index, navState) {
    return null;
  },

  Title (route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{color: 'white', margin: 10, fontSize: 18}}>
          Habit Settings
        </Text>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    top: 90,
  },
  heading: {
    height: 40,
    textAlign: 'center',
    fontSize: 34,
    fontFamily: 'Avenir',
  },
  deleteButtonText: {
    fontSize: 20,
    fontFamily: 'Avenir',
    color: '#e14f3f',
  },
  deleteButtonContainer: {
    padding: 10,
    height: 45,
    overflow:'hidden',
    borderRadius: 4,
    backgroundColor: 'white',
    marginTop: 15,
  },
  updateButtonText: {
    fontSize: 20,
    fontFamily: 'Avenir',
    color: 'white',
  },
  updateButtonContainer: {
    padding: 10,
    height: 45,
    overflow:'hidden',
    borderRadius: 4,
    backgroundColor: '#6399DC',
    marginTop: 15,
  },
  dayButtonText: {
    fontSize: 15,
    fontFamily: 'Avenir',
    color: 'black',
  },
  dayInactive: {
    borderRadius: 2,
    paddingTop: 12,
    height: 44,
    width: 44,
    backgroundColor: '#d4d4d4',
  },
  dayActive: {
    borderRadius: 2,
    paddingTop: 12,
    height: 44,
    width: 44,
    backgroundColor: '#499860',
  },
  week: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 2,
  },
  weekTitle: {
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
    color: '#adadad',
  },
});
