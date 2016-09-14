'use strict';
// React Native component dependencies
import React, {
  View,
  Text,
  Image,
  ListView,
  Navigator,
  TouchableOpacity,
} from 'react-native';
// Instance History component
import InstanceHistory, {
  NavigationBarRouteMapper
} from '../../app/components/InstanceHistory';
// Custom components
import moment from 'moment';
import api from '../../app/lib/api';
import { getInstancePeriod } from '../../app/lib/calendar';
// Testing dependencies
import sinon from 'sinon';
import { expect } from 'chai';
import fetchMock from 'fetch-mock';
import { shallow, mount } from 'enzyme';
// Wrappers
const historyWrapper = shallow(
  <InstanceHistory
    token={{}}
    habit={{}}
    profile={{}}
    navigator={{}}
    instances={[]}
  />
);

describe('Instance History', () => {
  it('should render 1 View component', () => {
    expect(historyWrapper.find(View)).to.have.length(1);
  });

  it('should render 1 Navigator component', () => {
    expect(historyWrapper.find(Navigator)).to.have.length(1);
  });

  describe('Navigation Bar Route Mapper', () => {
    it('should be an object with 3 methods', () => {
      expect(NavigationBarRouteMapper).to.be.an('object');
      expect(NavigationBarRouteMapper.LeftButton).to.be.a('function');
      expect(NavigationBarRouteMapper.RightButton).to.be.a('function');
      expect(NavigationBarRouteMapper.Title).to.be.a('function');
    });

    describe('LeftButton', () => {
      let wrapper;
      before(() => {
        let mockNavigator = {
          parentNavigator: { pop: function() {} },
        };
        let LeftButton = () => NavigationBarRouteMapper.LeftButton({}, mockNavigator)
        wrapper = shallow(<LeftButton />);
      });

      it('should return a TouchableOpacity component with an onPress callback', () => {
        expect(wrapper.find('TouchableOpacity')).to.have.length(1);
        wrapper.find('TouchableOpacity').props().onPress();
        expect(wrapper.find('TouchableOpacity').props().onPress).to.be.a('function');
      });

      it('should return 1 nested Text component', () => {
        expect(wrapper.find(Text)).to.have.length(1);
      });

      it('should render a Text component which reads "Back"', () => {
        expect(wrapper.find(Text).children().node).to.equal('Back');
      });
    });

    describe('RightButton', () => {
      it('should return null', () => {
        expect(NavigationBarRouteMapper.RightButton()).to.be.null;
      });
    });

    describe('Title', () => {
      let wrapper;
      before(() => {
        wrapper = shallow(<NavigationBarRouteMapper.Title />);
      });

      it('should return a TouchableOpacity component', () => {
        expect(wrapper.find('TouchableOpacity')).to.have.length(1);
      });

      it('should return 1 nested Text component', () => {
        expect(wrapper.find(Text)).to.have.length(1);
      });

      it('should render a Text component which reads "History"', () => {
        expect(wrapper.find(Text).children().node).to.equal('History');
      });
    });
  });

  describe('Methods', () => {
    let fullHistoryWrapper;
    before(() => {
      fullHistoryWrapper = mount(
        <InstanceHistory
          token={{}}
          habit={{}}
          profile={{}}
          navigator={{}}
          instances={[Date.now()]}
        />
      );
    });

    it('should have a renderRow method', () => {
      fullHistoryWrapper.node.renderRow();
      expect(fullHistoryWrapper.node.renderRow).to.be.a('function');
    });

    it('should have a renderScene method', () => {
      fullHistoryWrapper.node.renderScene();
      expect(fullHistoryWrapper.node.renderScene).to.be.a('function');
    });
  });
});
