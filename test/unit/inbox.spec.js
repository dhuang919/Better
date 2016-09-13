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
  it('should render 1 View component', () => {
    expect(inboxContainerWrapper.find(View)).to.have.length(1)
  });

  it('should render 1 Navigator component', () => {
    expect(inboxContainerWrapper.find(Navigator)).to.have.length(1)
  });

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
    let fullInboxWrapper;
    before(() => {
      fetchMock.get(/\/habits/, {});
      fetchMock.post(/\/habits/, { badges: [1, 2] });
      fullInboxWrapper = mount(
        <InboxContainer
          token={{}}
          profile={{}}
          route={{ badge: true }}
          navigator={{ push: function() {} }}
        />
      );
      fullInboxWrapper = mount(
        <InboxContainer
          token={{}}
          profile={{}}
          route={{ badge: false }}
          navigator={{ push: function() {} }}
        />
      );
    });

    after(() => {
      fetchMock.restore();
    })

    it('should have a getHabits method', () => {
      expect(fullInboxWrapper.node.getHabits).to.be.a('function');
    });

    it('getHabits should log errors', () => {
      fetchMock.restore();
      let mockError = new Error('intentional inbox.spec error for testing');
      fetchMock.get(/\/habits/, { throws: mockError });
      fullInboxWrapper.node.getHabits();
      fetchMock.restore();
      fetchMock.get(/\/habits/, {});
      fetchMock.post(/\/habits/, { badges: [1, 2] });
    });

    it('should have a editHabit method', () => {
      fullInboxWrapper.node.editHabit();
      expect(fullInboxWrapper.node.editHabit).to.be.a('function');
    });

    it('should have a showAlert method', function(done) {
      // showAlert has two setTimeout calls, the longest being 3200 ms
      this.timeout(4000);
      fullInboxWrapper.node.showAlert({});
      setTimeout(done, 3500);
      expect(fullInboxWrapper.node.showAlert).to.be.a('function');
    });

    it('should have a toggleInstance method', () => {
      fullInboxWrapper.node.toggleInstance();
      fetchMock.restore();
      fetchMock.get(/\/habits/, {});
      fetchMock.post(/\/habits/, { badges: [] });
      fullInboxWrapper.node.toggleInstance();
      expect(fullInboxWrapper.node.toggleInstance).to.be.a('function');
    });

    it('toggleInstance should log errors', () => {
      fetchMock.restore();
      let mockError = new Error('intentional inbox.spec error for testing');
      fetchMock.post(/\/habits/, { throws: mockError });
      fullInboxWrapper.node.toggleInstance();
      fetchMock.restore();
      fetchMock.get(/\/habits/, {});
      fetchMock.post(/\/habits/, { badges: [1, 2] });
    });

    it('should have a gotoDetails method', () => {
      fullInboxWrapper.node.gotoDetails();
      expect(fullInboxWrapper.node.gotoDetails).to.be.a('function');
    });

    it('should have a handlePress method', () => {
      fullInboxWrapper.node.handlePress();
      expect(fullInboxWrapper.node.handlePress).to.be.a('function');
    });

    it('should have a allowScroll method', () => {
      fullInboxWrapper.node.allowScroll(false);
      fullInboxWrapper.node.allowScroll(false);
      expect(fullInboxWrapper.node.allowScroll).to.be.a('function');
    });

    it('should have a renderInboxRow method', () => {
      fullInboxWrapper.node.renderInboxRow();
      expect(fullInboxWrapper.node.renderInboxRow).to.be.a('function');
    });

    it('should have a renderScene method', () => {
      fullInboxWrapper.node.renderScene();
      fullInboxWrapper.state().badge = false;
      fullInboxWrapper.node.renderScene();
      expect(fullInboxWrapper.node.renderScene).to.be.a('function');
    });
  });

  describe('Inbox component', () => {

  });
});
