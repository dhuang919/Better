'use strict';
// React Native components
import React, {
  Component,
  View,
  Text,
  Navigator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
// Custom components and methods
import api from '../lib/api';
import Profile from '../components/Profile';
import BadgeView from '../components/BadgeView';

export default class ProfileContainer extends Component {
  constructor (props) {
    super(props);
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
          initialRoute={{id: 'Profile'}}
          renderScene={this.renderScene}
        />
      </View>
    );
  }

  renderScene (route, navigator) {
    switch (route.id) {
      case 'Profile':
        return (
          <Profile
            navigator={navigator}
            user={this.props.user}
            token={this.props.token}
            profile={this.props.profile}
            badgeURIs={this.props.badgeURIs}
            handleLogout={this.props.handleLogout}
          />
        );
      case 'Badges':
        return (
          <BadgeView
            navigator={navigator}
            earnedBadges={route.earnedBadges}
          />
        );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 54,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
});
