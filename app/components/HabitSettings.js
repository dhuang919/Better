'use strict';
// Temporary fix for suppressing warnings from DatePickerIOS which
// has an unresolved issue regarding the date being passed to it
// https://github.com/facebook/react-native/issues/4547
console.ignoredYellowBox = [
  'Warning: Failed propType',
];

import React, {
  Component,
  View,
  Text,
  AlertIOS,
  TextInput,
  StyleSheet,
  Navigator,
  TouchableOpacity,
  DatePickerIOS,
  Switch,
} from 'react-native';
import api from '../lib/api';
import Button from 'react-native-button';

export default class HabitSettings extends Component {
  constructor (props) {
    super(props);
    this.state = {
      habit: props.habit,
      user: props.user,
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
    this.props.navigator.push({ id: 'Habits' });
  }
  updateHabit (habitId) {
    fetch(`${process.env.SERVER}/habits/${this.props.profile.email}/${habitId}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.token.idToken}`
      },
      body: JSON.stringify(this.state.habit)
    })
    .then(api.handleErrors)
    .then( (res) => res.json() )
    .then( (habit) => this.gotoInbox() )
    .catch( (err) => console.warn(err) );
  }
  deleteHabit (habitId) {
    // TODO: refactor server call to api library
    fetch(`${process.env.SERVER}/habits/${this.props.profile.email}/${habitId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this.props.token.idToken}`
      }
    })
    .then(api.handleErrors)
    .then( () => this.props.navigator.push({ id: 'Habits' }) )
    .catch( (err) => console.warn(err) );
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
  toggleDay (day) {
    let updates = this.state.habit;
    updates.reminder.days[day] = !updates.reminder.days[day];
    this.setState({ habit: updates });
  }
  renderScene (route, navigator) {
    if (this.state.habit.reminder.active) {
      return (
        <View style={styles.container}>
          <TextInput
            style={styles.heading}
            defaultValue={this.props.habit.action}
            onChangeText={this.onTextChange}
          />
          <View style={{flexDirection: 'row', marginTop: 25}}>
            <Text style={{fontSize: 22, fontFamily: 'Avenir'}}>
              SMS Reminder
            </Text>
            <Switch
              onValueChange={this.onReminderChange}
              style={{left: 140, marginBottom: 10}}
              value={this.state.habit.reminder.active}
            />
          </View>
          <DatePickerIOS
            date={new Date(this.state.habit.reminder.time)}
            mode="time"
            minuteInterval={5}
            onDateChange={this.onDateChange}
          />
          <Text style={styles.weekTitle}>Weekdays (tap to select)</Text>
          <View style={styles.week}>
            <Button
              containerStyle={ this.state.habit.reminder.days['sun'] ? styles.dayActive : styles.dayInactive }
              style={styles.dayButtonText}
              styleDisabled={{color: 'red'}}
              onPress={ () => this.toggleDay('sun') }
            >
              Sun
            </Button>
            <Button
              containerStyle={ this.state.habit.reminder.days['mon'] ? styles.dayActive : styles.dayInactive }
              style={styles.dayButtonText}
              styleDisabled={{color: 'red'}}
              onPress={ () => this.toggleDay('mon') }
            >
              Mon
            </Button>
            <Button
              containerStyle={ this.state.habit.reminder.days['tue'] ? styles.dayActive : styles.dayInactive }
              style={styles.dayButtonText}
              styleDisabled={{color: 'red'}}
              onPress={ () => this.toggleDay('tue') }
            >
              Tue
            </Button>
            <Button
              containerStyle={ this.state.habit.reminder.days['wed'] ? styles.dayActive : styles.dayInactive }
              style={styles.dayButtonText}
              styleDisabled={{color: 'red'}}
              onPress={ () => this.toggleDay('wed') }
            >
              Wed
            </Button>
            <Button
              containerStyle={ this.state.habit.reminder.days['thu'] ? styles.dayActive : styles.dayInactive }
              style={styles.dayButtonText}
              styleDisabled={{color: 'red'}}
              onPress={ () => this.toggleDay('thu') }
            >
              Thu
            </Button>
            <Button
              containerStyle={ this.state.habit.reminder.days['fri'] ? styles.dayActive : styles.dayInactive }
              style={styles.dayButtonText}
              styleDisabled={{color: 'red'}}
              onPress={ () => this.toggleDay('fri') }
            >
              Fri
            </Button>
            <Button
              containerStyle={ this.state.habit.reminder.days['sat'] ? styles.dayActive : styles.dayInactive }
              style={styles.dayButtonText}
              styleDisabled={{color: 'red'}}
              onPress={ () => this.toggleDay('sat') }
            >
              Sat
            </Button>
          </View>
          <Button
            containerStyle={styles.updateButtonContainer}
            style={styles.updateButtonText}
            styleDisabled={{color: 'red'}}
            onPress={ () => this.updateHabit(this.state.habit._id) }
          >
            Update Habit
          </Button>
          <Button
            containerStyle={styles.deleteButtonContainer}
            style={styles.deleteButtonText}
            styleDisabled={{color: 'red'}}
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
            defaultValue={this.props.habit.action}
            onChangeText={this.onTextChange}
          />
          <View style={{ flexDirection: 'row', marginTop: 25, marginBottom: 216 }}>
            <Text style={{fontSize: 22, fontFamily: 'Avenir'}}>
              SMS Reminder
            </Text>
            <Switch
              onValueChange={this.onReminderChange}
              style={{left: 140, marginBottom: 10}}
              value={this.state.habit.reminder.active}
            />
          </View>
          <Button
            containerStyle={styles.updateButtonContainer}
            style={styles.updateButtonText}
            styleDisabled={{color: 'red'}}
            onPress={ () => this.updateHabit(this.state.habit._id) }
          >
            Update Habit
          </Button>
          <Button
            containerStyle={styles.deleteButtonContainer}
            style={styles.deleteButtonText}
            styleDisabled={{color: 'red'}}
            onPress={ () => this.deleteHabit(this.state.habit._id) }
          >
            Delete
          </Button>
        </View>
      );
    }
  }
}

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
    marginTop: 15
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
    marginTop: 15
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
    backgroundColor: '#d4d4d4'
  },
  dayActive: {
    borderRadius: 2,
    paddingTop: 12,
    height: 44,
    width: 44,
    backgroundColor: '#499860'
  },
  week: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 2
  },
  weekTitle: {
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
    color: '#adadad'
  }
});
