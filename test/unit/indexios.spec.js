'use strict';
// React Native components
import React, {
  View,
  Text,
  Image,
  TabBarIOS,
} from 'react-native';
// Tab container
import TabContainer from '../../index.ios';
// Custom components
import api from '../../app/lib/api';
import Auth0Lock from 'react-native-lock-ios';
import Icon from 'react-native-vector-icons/Foundation';
import { clientId, domain } from '../../auth0_credentials';
import AppContainer from '../../app/containers/AppContainer';
import ProfileContainer from '../../app/containers/ProfileContainer';
// Testing dependencies
import sinon from 'sinon';
import { expect } from 'chai';
import fetchMock from 'fetch-mock';
import { shallow, mount } from 'enzyme';
// Wrappers
const tabWrapper = shallow(<TabContainer />);

describe('Tab Container (index.ios)', () => {
  it('should ', () => {

  });

  describe('Methods', () => {
    let fullTabWrapper;
    before(() => {
      fetchMock.get(/\/user/, {});
      fetchMock.post(/\/user/, {});
      fullTabWrapper = mount(<TabContainer />);
    });

    after(() => {
      fetchMock.restore();
    });

    it('should have a handleLogout method', () => {
      fullTabWrapper.node.handleLogout();
      expect(fullTabWrapper.node.handleLogout).to.be.a('function');
    });

    it('should have a showLock method', () => {
      fullTabWrapper.node.showLock();
      expect(fullTabWrapper.node.showLock).to.be.a('function');
    });

    it('should have a resetToTabs method', () => {
      fullTabWrapper.node.resetToTabs();
      expect(fullTabWrapper.node.resetToTabs).to.be.a('function');
    });
  });
});
