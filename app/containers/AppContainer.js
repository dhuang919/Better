'use strict';
// React Native components
import React, {
  Text,
  View,
  Navigator,
  TouchableOpacity,
} from 'react-native';
// App components
import Habits from './InboxContainer';
import Onboard from './OnboardContainer';
import AddHabit from './CreateContainer';
import LoadingContainer from './LoadingContainer';
import HabitDetails from '../components/HabitDetails';
import HabitSettings from '../components/HabitSettings';
import InstanceHistory from '../components/InstanceHistory';

const AppContainer = React.createClass({
  getInitialState () {
    return {
      token: this.props.token,
      profile: this.props.profile,
      user: this.props.user,
      resetToTabs: this.props.resetToTabs,
    };
  },

  configureScene (route, routeStack) {
    return Navigator.SceneConfigs.FadeAndroid;
  },

  render () {
    return (
      <View style={{ flex: 1 }}>
        <Navigator
          configureScene={this.configureScene}
          initialRoute={{id: 'Loading'}}
          renderScene={this.renderScene}
        />
      </View>
    );
  },

  renderScene (route, navigator) {
    switch (route.id) {
      case 'Loading':
        return (
          <LoadingContainer
            navigator={navigator}
            token={this.state.token}
            profile={this.state.profile}
            user={this.state.user}
            badge={this.props.badge}
          />
        );
      case 'Onboard':
        return (
          <Onboard
            navigator={navigator}
          />
        );
      case 'AddHabit':
        return (
          <AddHabit
            navigator={navigator}
            habit={route.habit}
            token={this.state.token}
            profile={this.state.profile}
            onboard={this.props.onboard}
            resetToTabs={this.state.resetToTabs}
          />
        );
      case 'Habits':
        return (
          <Habits
            navigator={navigator}
            token={this.state.token}
            profile={this.state.profile}
            route={route}
          />
        );
      case 'HabitSettings':
        return (
          <HabitSettings
            navigator={navigator}
            token={this.state.token}
            profile={this.state.profile}
            habit={route.habit}
            user={this.state.user}
          />
        );
      case 'HabitDetails':
        return (
          <HabitDetails
            navigator={navigator}
            token={this.state.token}
            profile={this.state.profile}
            habit={route.habit}
          />
        );
      case 'InstanceHistory':
        return (
          <InstanceHistory
            navigator={navigator}
            token={this.state.token}
            profile={this.state.profile}
            habit={route.habit}
            instances={route.instances}
          />
        );
    }
  }
});

module.exports = AppContainer;
