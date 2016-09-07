'use strict';
// React Native component dependencies
import React, {
  View,
  Text,
  Image,
  ListView,
  Navigator,
} from 'react-native';
// Profile component
import Profile, { NavigationBarRouteMapper } from '../../app/components/Profile';
// Profile container
import ProfileContainer from '../../app/containers/ProfileContainer';
// Custom components
import Button from 'react-native-button';
import ProgressBar from 'react-native-progress-bar';
import BadgeView from '../../app/components/BadgeView';
// Testing dependencies
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
// Wrappers
const profileWrapper = shallow(
  <Profile
    user={{}}
    token={{}}
    profile={{}}
    navigator={{}}
    badgeURIs={{}}
    handleLogout={() => {}}
  />
);
const profileContainerWrapper = shallow(
  <ProfileContainer
    user={{}}
    token={{}}
    profile={{}}
    handleLogout={() => {}}
  />
);
const badgeViewWrapper = shallow(
  <BadgeView
    navigator={{}}
    earnedBadges={{}}
  />
);

describe('Profile Container', () => {

  describe('Methods', () => {
    it('should have a configureScene method', () => {

    });

    it('should have a renderScene method', () => {

    });
  });

  describe('Profile component', () => {
    it('should render  View components', () => {

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

        it('should render a Text component which reads "Profile"', () => {
          expect(wrapper.find(Text).children().node).to.equal('Profile');
        });
      });
    });

    describe('Methods', () => {
      it('should have a renderRow method', () => {

      });

      it('should have a goToBadges method', () => {

      });

      it('should have a renderScene method', () => {

      });

      it('should have a parseUserData method', () => {

      });

      it('should have a refreshUserData method', () => {

      });

      it('should have a calculateProgress method', () => {

      });
    });
  });

  describe('BadgeView component', () => {

  });
});
