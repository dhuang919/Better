'use strict';
// React Native component dependencies
import React, {
  View,
  Text,
  Image,
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
const welcomeWrapper = shallow(<Welcome />);
const pageOneWrapper = shallow(<PageOne />);
const pageTwoWrapper = shallow(<PageTwo />);
const onboardContainerWrapper = shallow(<OnboardContainer />);

describe('Onboard Container', () => {
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

    it('should have an onPressButton method', () => {
      let mockNavigator = { push: function() {} };
      let fullWelcomeWrapper = mount(<Welcome navigator={mockNavigator}/>);
      fullWelcomeWrapper.node.onPressButton();
      expect(fullWelcomeWrapper.node.onPressButton).to.be.a('function');
    });

    it('should have a first Text component which reads "Ready to be Better?"', () => {
      let firstText = welcomeWrapper.find(Text).children().nodes[0];
      expect(firstText).to.equal('Ready to be Better?');
    });

    it('should have a second Text component which reads "Create your first habit!"', () => {
      let secondText = welcomeWrapper.find(Text).children().nodes[1];
      expect(secondText).to.equal('Create your first habit!');
    });
  });

  describe('PageOne component', () => {
    it('should render 1 View component', () => {
      expect(pageOneWrapper.find(View)).to.have.length(1);
    });

    it('should render 2 Text components', () => {
      expect(pageOneWrapper.find(Text)).to.have.length(2);
    });

    it('should render 1 Image component', () => {
      expect(pageOneWrapper.find(Image)).to.have.length(1);
    });

    it('should have a first Text component which reads "Welcome to Better."', () => {
      let firstText = pageOneWrapper.find(Text).children().nodes[0];
      expect(firstText).to.equal('Welcome to Better.');
    });

    it('should render the "odometer" image', () => {
      let uri = pageOneWrapper.find(Image).props().source.uri;
      expect(uri.includes('odometer.png')).to.be.true;
    });

    it('should have a second Text component which reads "Our mission is to..."', () => {
      let secondText = pageOneWrapper.find(Text).children().nodes[1];
      expect(secondText).to.equal('Our mission is to help you achieve your goals by building positive daily habits.');
    });
  });

  describe('PageTwo component', () => {
    it('should render 1 View component', () => {
      expect(pageTwoWrapper.find(View)).to.have.length(1);
    });

    it('should render 2 Text components', () => {
      expect(pageTwoWrapper.find(Text)).to.have.length(2);
    });

    it('should render 1 Image component', () => {
      expect(pageTwoWrapper.find(Image)).to.have.length(1);
    });

    it('should have a first Text component which reads "Start Small"', () => {
      let firstText = pageTwoWrapper.find(Text).children().nodes[0];
      expect(firstText).to.equal('Start Small');
    });

    it('should render the "bars" image', () => {
      let uri = pageTwoWrapper.find(Image).props().source.uri;
      expect(uri.includes('bars.png')).to.be.true;
    });

    it('should have a second Text component which reads "Pick a habit..."', () => {
      let secondText = pageTwoWrapper.find(Text).children().nodes[1];
      expect(secondText).to.equal('Pick a habit that will get you closer to your goal, but will be easy to accomplish every day. We will move up together from there.');
    });
  });
});
