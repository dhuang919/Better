import React, {
  View,
  Navigator,
} from 'react-native';
import {
  Welcome,
  PageOne,
  PageTwo
} from '../components/Onboard';
import Swiper from 'react-native-swiper';

const OnboardContainer = React.createClass({
  render () {
    return (
      <Swiper loop={false}>
        <PageOne />
        <PageTwo />
        <Welcome navigator={this.props.navigator} />
      </Swiper>
    );
  }
});

module.exports = OnboardContainer;
