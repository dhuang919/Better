'use strict';
// React Native component dependencies
import React, {
  View,
  Text,
  Image,
  Alert,
  ListView,
  Navigator,
  TouchableOpacity,
} from 'react-native';
// Inbox component
import Inbox from '../../app/components/Inbox';
// Inbox container
import InboxContainer, {
  NavigationBarRouteMapper
} from '../../app/containers/InboxContainer';
// Custom components
import moment from 'moment';
import api from '../../app/lib/api';
import Swipeout from 'react-native-swipeout';
import Auth0credentials from '../../auth0_credentials';
import Icon from 'react-native-vector-icons/FontAwesome';
import Notification from '../../app/components/Notification';
// Testing dependencies
import { expect } from 'chai';
import fetchMock from 'fetch-mock';
import { shallow, mount } from 'enzyme';
// Wrappers
const inboxWrapper = shallow(
  <Inbox
    habit={{}}
    editHabit={() => {}}
    gotoDetails={() => {}}
    allowScroll={() => {}}
    toggleInstance={() => {}}
    toggleInstance={() => {}}
  />
);
const inboxContainerWrapper = shallow(
  <InboxContainer
    route={{}}
    token={{}}
    profile={{}}
    navigator={{ push: function() {} }}
  />
);

describe('Inbox Container', () => {

  describe('Navigation Bar Route Mapper', () => {
    it('should be an object with 3 methods', () => {
      expect(NavigationBarRouteMapper).to.be.an('object');
      expect(NavigationBarRouteMapper.LeftButton).to.be.a('function');
      expect(NavigationBarRouteMapper.RightButton).to.be.a('function');
      expect(NavigationBarRouteMapper.Title).to.be.a('function');
    });

    describe('LeftButton', () => {
      it('should return null', () => {
        expect(NavigationBarRouteMapper.LeftButton()).to.be.null;
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

      it('should render a Text component which reads "Inbox"', () => {
        expect(wrapper.find(Text).children().node).to.equal('Inbox');
      });
    });
  });

  describe('Methods', () => {

  });

  describe('Inbox component', () => {

  });
});
