'use strict';
// React Native components
import React from 'react-native';
// Custom components
import {
  Welcome,
  PageOne,
  PageTwo
} from '../components/Onboard';
import Swiper from 'react-native-swiper';

export default function OnboardContainer (props) {
  return (
    <Swiper loop={false}>
      <PageOne />
      <PageTwo />
      <Welcome navigator={props.navigator} />
    </Swiper>
  );
}
