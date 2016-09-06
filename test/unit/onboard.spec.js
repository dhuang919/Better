'use strict';
// React Native component dependencies
import React, {
  View,
  Text,
  Navigator,
} from 'react-native';
// Onboard component
import {
  Welcome,
  PageOne,
  PageTwo,
} from '../../app/components/Onboard';
// Onboard container
import OnboardContainer from '../../app/containers/OnboardContainer';
// Custom components
import Swiper from 'react-native-swiper';
import Button from 'react-native-button';
// Testing dependencies
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
// Wrappers
const welcomeWrapper = mount(<Welcome />);
const pageOneWrapper = shallow(<PageOne />);
const pageTwoWrapper = shallow(<PageTwo />);

let mockNavigator = { push: function() {} };
const onboardContainerWrapper = shallow(<OnboardContainer navigator={mockNavigator}/>);

describe('Onboard container', () => {
  it('should render a Swiper component', () => {
    expect(onboardContainerWrapper.find(Swiper)).to.have.length(1);
  });

  it('should render 1 PageOne component', () => {
    expect(onboardContainerWrapper.find(PageOne)).to.have.length(1);
  });

  it('should render 1 PageTwo component', () => {
    expect(onboardContainerWrapper.find(PageTwo)).to.have.length(1);
  });

  it('should render 1 Welcome component', () => {
    expect(onboardContainerWrapper.find(Welcome)).to.have.length(1);
  });

  describe('Welcome component', () => {
    it('should render 1 View component', () => {
      expect(welcomeWrapper.find(View)).to.have.length(1);
    });

    it('should render 2 Text components', () => {
      expect(welcomeWrapper.find(Text)).to.have.length(2);
    });

    it('should render 1 Button component', () => {
      expect(welcomeWrapper.find(Button)).to.have.length(1);
    });

    it('should have an onPressButtom method', () => {
      expect(welcomeWrapper.node.onPressButton).to.be.a.function;
    });
  });

  describe('PageOne component', () => {
    it('should ', () => {

    });
  });

  describe('PageTwo component', () => {
    it('should ', () => {

    });
  });
});
