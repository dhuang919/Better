'use strict';
// React Native components
import React, {
  Component,
  View,
  Text,
  Navigator,
} from 'react-native';
// Custom components and methods
import Loading from '../components/Loading';

export default class LoadingContainer extends Component {
  constructor (props) {
    super(props);
    this.goToInbox = this.goToInbox.bind(this);
    this.goToOnboard = this.goToOnboard.bind(this);
    this.renderScene = this.renderScene.bind(this);
  }

  goToOnboard () {
    this.props.navigator.push({id: 'Onboard'})
  }

  goToInbox () {
    this.props.navigator.push({
      id: 'Habits',
      badge: this.props.badge,
    });
  }

  componentDidMount () {
    this.props.user.newUser ?
    this.goToOnboard() :
    this.goToInbox();
  }

  render () {
    return (
      <View style={{ flex: 1 }}>
        <Navigator
          renderScene={this.renderScene}
          navigator={this.props.navigator}
        />
      </View>
    );
  }

  renderScene (route, navigator) {
    return (
      <Loading
        fields={this.fields}
        handleClick={this.handleClick}
      />
    );
  }
};
