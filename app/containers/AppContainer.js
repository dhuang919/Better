'use strict';
// React Native components
import React, {
  Component,
  Text,
  View,
  Navigator,
  TouchableOpacity,
} from 'react-native';
// App components
import Habits from './InboxContainer';
import AddHabit from './CreateContainer';
import OnboardContainer from './OnboardContainer';
import LoadingContainer from './LoadingContainer';
import HabitDetails from '../components/HabitDetails';
import HabitSettings from '../components/HabitSettings';
import InstanceHistory from '../components/InstanceHistory';

export default class AppContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      user: this.props.user,
      token: this.props.token,
      profile: this.props.profile,
      resetToTabs: this.props.resetToTabs,
    };
    this.renderScene = this.renderScene.bind(this);
    this.configureScene = this.configureScene.bind(this);
  }

  configureScene (route, routeStack) {
    return Navigator.SceneConfigs.FadeAndroid;
  }

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
  }

  renderScene (route, navigator) {
    switch (route.id) {
      case 'Loading':
        return (
          <LoadingContainer
            navigator={navigator}
            user={this.state.user}
            token={this.state.token}
            badge={this.props.badge}
            profile={this.state.profile}
          />
        );
      case 'Onboard':
        return (
          <OnboardContainer
            navigator={navigator}
          />
        );
      case 'AddHabit':
        return (
          <AddHabit
          habit={route.habit}
            navigator={navigator}
            token={this.state.token}
            profile={this.state.profile}
            onboard={this.props.onboard}
            resetToTabs={this.state.resetToTabs}
          />
        );
      case 'Habits':
        return (
          <Habits
            route={route}
            navigator={navigator}
            token={this.state.token}
            profile={this.state.profile}
          />
        );
      case 'HabitSettings':
        return (
          <HabitSettings
            habit={route.habit}
            navigator={navigator}
            user={this.state.user}
            token={this.state.token}
            profile={this.state.profile}
          />
        );
      case 'HabitDetails':
        return (
          <HabitDetails
            habit={route.habit}
            navigator={navigator}
            token={this.state.token}
            profile={this.state.profile}
          />
        );
      case 'InstanceHistory':
        return (
          <InstanceHistory
            habit={route.habit}
            navigator={navigator}
            token={this.state.token}
            instances={route.instances}
            profile={this.state.profile}
          />
        );
    }
  }
}
