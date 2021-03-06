'use strict';
// React Native components
import React, {
  View,
  Text,
  Image,
  Alert,
  ListView,
  Component,
  Navigator,
  PropTypes,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
// External libraries and components
import moment from 'moment';
import api from '../lib/api';
import Auth0credentials from '../../auth0_credentials';
import Icon from 'react-native-vector-icons/FontAwesome';
// Custom compoments and methods
import Inbox from '../components/Inbox';
import Notification from '../components/Notification';

export default class InboxContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      badge: {},
      alert: false,
      scrollEnabled: true,
      dataSource: new ListView.DataSource({
        rowHasChanged (row1, row2) {
          return row1 !== row2;
        },
      }),
    };
    this.getHabits = this.getHabits.bind(this);
    this.editHabit = this.editHabit.bind(this);
    this.showAlert = this.showAlert.bind(this);
    this.gotoDetails = this.gotoDetails.bind(this);
    this.handlePress = this.handlePress.bind(this);
    this.allowScroll = this.allowScroll.bind(this);
    this.renderScene = this.renderScene.bind(this);
    this.renderInboxRow = this.renderInboxRow.bind(this);
    this.toggleInstance = this.toggleInstance.bind(this);
  }
  // TODO: refactor server call to api library
  getHabits () {
    fetch(`${process.env.SERVER}/habits/${this.props.profile.email}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.props.token.idToken}`,
      },
    })
    .then(api.handleErrors)
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseData)
      });
    })
    .catch(err => console.warn(err));
  }

  editHabit (habit) {
    this.props.navigator.push({ id: 'HabitSettings', habit: habit });
  }

  showAlert (badge) {
    setTimeout( () => {
      this.setState({ alert: true, badge: badge });
    }, 500);
    setTimeout( () => {
      this.setState({ alert: false });
    }, 3200);
  }

  toggleInstance (habitId) {
    // TODO: refactor server call to api library
    // Ask server to create a new instance of this habit
    fetch(`${process.env.SERVER}/habits/${this.props.profile.email}/${habitId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.props.token.idToken}`,
      },
    })
    .then(api.handleErrors)
    .then(response => response.json() )
    .then(res => {
      if (res.badges && res.badges.length) {
        this.showAlert(res.badges[0]);
      }
      this.getHabits();
    })
    .catch(err => console.warn(err));
  }

  gotoDetails (habit) {
    this.props.navigator.push({ id: 'HabitDetails', habit: habit });
  }

  componentDidMount () {
    if (this.props.route.badge) {
      this.showAlert(this.props.route.badge);
    }
    this.getHabits();
  }

  handlePress () {
    this.props.navigator.push({ id:'CreateContainer' });
  }

  allowScroll (scrollEnabled) {
    if (scrollEnabled !== this.state.scrollEnabled) {
      this.setState({ scrollEnabled: scrollEnabled });
    }
  }

  // Render each row of the inbox as an Inbox component
  renderInboxRow (habit) {
    return (
      <Inbox
        habit={habit}
        editHabit={this.editHabit}
        gotoDetails={this.gotoDetails}
        allowScroll={this.allowScroll}
        toggleInstance={this.toggleInstance}
      />
    );
  }

  render () {
    return (
      <View style={{flex: 1}}>
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
    return (
      <View style={styles.container}>
        <ListView
          renderRow={this.renderInboxRow}
          dataSource={this.state.dataSource}
          scrollEnabled={this.state.scrollEnabled}
          automaticallyAdjustContentInsets={false}
        />
        <Notification
          visible={this.state.alert}
          name={this.state.badge ? this.state.badge.name : null}
          icon={this.state.badge ? this.state.badge.icon : null}
        >
        </Notification>
        <TouchableOpacity
          style={styles.circleButton}
          onPress={this.handlePress}
        >
          <Icon
            size={25}
            name='plus'
            color='#ffffff'
          />
        </TouchableOpacity>
      </View>
    );
  }
}

InboxContainer.PropTypes = {
  route: PropTypes.object,
  token: PropTypes.object,
  profile: PropTypes.object,
  navigator: PropTypes.object,
};

export const NavigationBarRouteMapper = {
  LeftButton (route, navigator, index, navState) {
    return null;
  },

  RightButton (route, navigator, index, navState) {
    return null;
  },

  Title (route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{color: 'white', margin: 10, fontSize: 18}}>
          Inbox
        </Text>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
    backgroundColor: '#EDBE40',
  },
  circleButton: {
    position: 'absolute',
    top: 480,
    right: 20,
    height: 60,
    width: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6399DC',
    shadowColor: '#000000',
    shadowOpacity: 0.6,
    shadowRadius: 4,
    shadowOffset: {
      height: 4,
      width: 3,
    },
  },
});
