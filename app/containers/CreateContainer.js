'use strict';
// React Native components
import React, {
  Component,
  View,
  Text,
  Alert,
  Navigator,
  TouchableOpacity,
} from 'react-native';
// Custom components and methods
import api from '../lib/api';
import { Create } from '../components/Create';

export default class AddHabit extends Component {
  constructor (props) {
    super(props);
    this.state = {
      fields: {
        action: null,
      },
    };
    this.sendHabit = this.sendHabit.bind(this);
    this.goToInbox = this.goToInbox.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderScene = this.renderScene.bind(this);
  }

  sendHabit (reqbody) {
    fetch(`${process.env.SERVER}/habits/${this.props.profile.email}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.token.idToken}`,
      },
      body: JSON.stringify(reqbody),
    })
    .then(api.handleErrors)
    .then( response => response.json() )
    .then( resJSON => this.goToInbox(resJSON.badge) )
    .catch( err => console.warn(err) );
  }

  goToInbox (badge) {
    if (this.props.onboard === true) {
      this.props.resetToTabs(badge);
    } else {
      if (badge) {
        this.props.navigator.push({ id: 'Habits', badge: badge });
      } else {
        this.props.navigator.push({ id: 'Habits' });
      }
    }
  }

  handleClick () {
    // Values stored to be sent to server
    const action = this.state.fields.action;
    // Clears input field upon submit
    this.setState({
      fields: {
        action: null,
      },
    });
    if (action !== null) {
      this.sendHabit({ action });
    } else {
      Alert.alert(
        'Please enter an action',
        null,
        [ { text: 'Ok' } ]
      );
    }
  }

  render () {
    return (
      <View style={{ flex: 1 }}>
        <Navigator
          renderScene={this.renderScene}
          navigator={this.props.navigator}
          navigationBar={
            <Navigator.NavigationBar style={{backgroundColor: '#6399DC', alignItems: 'center'}}
              routeMapper={NavigationBarRouteMapper}
            />
          }
        />
      </View>
    );
  }

  renderScene (route, navigator) {
    return (
      <Create
        fields={this.state.fields}
        handleClick={this.handleClick}
      />
    );
  }
};

const NavigationBarRouteMapper = {
  LeftButton (route, navigator, index, navState) {
    return null;
  },

  RightButton (route, navigator, index, navState) {
    return null;
  },

  Title (route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{color: 'white', margin: 10, fontSize: 16}}>
          New Habit
        </Text>
      </TouchableOpacity>
    );
  }
};
