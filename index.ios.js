'use strict';
// React Native components
import React, {
  AppRegistry,
  Component,
  View,
  Text,
  Image,
  TabBarIOS,
} from 'react-native';
// External libraries and components
import Auth0Lock from 'react-native-lock-ios';
import { clientId, domain } from './auth0_credentials';
import Icon from 'react-native-vector-icons/Foundation';
// Custom components and methods
import api from './app/lib/api';
import AppContainer from './app/containers/AppContainer';
import ProfileContainer from './app/containers/ProfileContainer';

// EDIT THIS VARIABLE FOR LOCAL TESTING
const localServer = false;

// DO NOT EDIT THIS
if (localServer === true) {
  process.env.SERVER = 'http://localhost:3000';
} else {
  process.env.SERVER = 'http://better-habits.herokuapp.com';
}

// Instantiate a new Lock
const lock = new Auth0Lock({ clientId, domain });

class TabContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedTab: 'inbox',
      auth: false,
      profile: null,
      token: null,
      user: null,
      onboard: null,
    };
    this.showLock = this.showLock.bind(this);
    this.resetToTabs = this.resetToTabs.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout () {
    this.setState({
      auth: false,
      token: null,
      profile: null,
      user: null,
      onboard: null,
    });
    this.showLock();
  }

  showLock () {
    // Display login widget
    lock.show({}, (err, profile, token) => {
      if (err) {
        console.log(err);
        return;
      }
      // Store user in DB
      fetch(`${process.env.SERVER}/user`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.idToken}`,
        },
        body: JSON.stringify(profile),
      })
      .then(api.handleErrors)
      .then( response => response.json() )
      .then(user => {
        // On successful login + store user
        // Set user info on state
        let onboardState = user.newUser;
        this.setState({
          selectedTab: 'inbox',
          auth: true,
          token: token,
          profile: profile,
          user: user,
          onboard: onboardState,
        });
      })
      .catch( err => console.warn(err) );
    });
  }

  resetToTabs (badge) {
    fetch(`${process.env.SERVER}/user/${this.state.user.email}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.state.token.idToken}`,
        },
      })
      .then(api.handleErrors)
      .then( response => response.json() )
      .then(response => {
        this.setState({
          user: response.user,
          onboard: false,
          badge: badge,
        });
      })
      .catch( err => console.warn(err) );
  }

  componentDidMount () {
    // If user not logged in
    if (!this.state.auth) {
      this.showLock();
    }
  }

  render () {
    if (this.state.auth) {
      if (this.state.onboard === true) {
        return (
          <AppContainer
            onboard={true}
            user={this.state.user}
            token={this.state.token}
            profile={this.state.profile}
            resetToTabs={this.resetToTabs}
          />
        )
      } else {
        return (
          <TabBarIOS
            tintColor='#6399DC'
            barTintColor='#fff'
            transluscent={false}
            selectedTab={this.state.selectedTab}
          >
            <Icon.TabBarItemIOS
              iconSize={30}
              title='Habits'
              iconName='mountains'
              selected={this.state.selectedTab === 'inbox'}
              onPress={ () => this.setState({ selectedTab: 'inbox' }) }
            >
              <AppContainer
                user={this.state.user}
                badge={this.state.badge}
                token={this.state.token}
                profile={this.state.profile}
              />
            </Icon.TabBarItemIOS>
            <Icon.TabBarItemIOS
              iconSize={30}
              title='Profile'
              iconName='torso'
              selected={this.state.selectedTab === 'profile'}
              onPress={ () => this.setState({ selectedTab: 'profile' }) }
            >
              <ProfileContainer
                user={this.state.user}
                token={this.state.token}
                profile={this.state.profile}
                handleLogout={this.handleLogout}
              />
            </Icon.TabBarItemIOS>
          </TabBarIOS>
        );
      }
    } else {
      return (
        <View></View>
      );
    }
  }
};

AppRegistry.registerComponent('thesis', () => TabContainer);
