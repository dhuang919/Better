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
import badges from '../../app/lib/badges';
import ProgressBar from 'react-native-progress-bar';
import BadgeView from '../../app/components/BadgeView';
// Testing dependencies
import sinon from 'sinon';
import { expect } from 'chai';
import fetchMock from 'fetch-mock';
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

  it('should render 1 View component', () => {
    expect(profileContainerWrapper.find(View)).to.have.length(1);
  });

  it('should render 1 Navigator component', () => {
    expect(profileContainerWrapper.find(Navigator)).to.have.length(1);
  });

  describe('Methods', () => {
    it('should have a configureScene method that returns a function', () => {
      let fullContainerWrapper = mount(
        <ProfileContainer
          user={{}}
          token={{}}
          profile={{}}
          handleLogout={() => {}}
        />
      );
      expect(fullContainerWrapper.node.configureScene).to.be.a('function');
      expect(fullContainerWrapper.node.configureScene()).to.be.a('function');
    });

    it('should have a renderScene method which returns a component', () => {
      let fullContainerWrapper = mount(
        <ProfileContainer
          user={{}}
          token={{}}
          profile={{}}
          handleLogout={() => {}}
        />
      );
      fullContainerWrapper.node.renderScene({ id: 'Profile' });
      fullContainerWrapper.node.renderScene({ id: 'Badges' });
      expect(fullContainerWrapper.node.renderScene).to.be.a('function');
    });
  });

  describe('Profile component', () => {
    it('should render 1 Navigator component', () => {
      expect(profileWrapper.find(Navigator)).to.have.length(1);
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
      let mockUser = {
        badges: [
          badges['First Step'],
          badges['Better Already'],
          badges['Top of the World'],
        ],
        email: 'foo@bar.com',
        newUser: false,
        userName: 'foo',
      };
      let mockProfile = {
        email: 'foo@bar.com',
        name: 'foo@bar.com',
        nickanme: 'foo',
        picture: 'foobarbaz',
      };
      fetchMock.get(/\/user/, {
        body: {
          user: mockUser,
          habits: [
            {
              action: 'Foo',
              streak: { current: 1 }
            },
            {
              action: 'Bar',
              streak: { current: 1 }
            },
            {
              action: 'Baz',
              streak: { current: 1 }
            },
          ],
        }
      });
      let fullProfileWrapper = mount(
        <Profile
          token={{}}
          badgeURIs={{}}
          user={mockUser}
          profile={mockProfile}
          handleLogout={() => {}}
          navigator={{ push: function() {} }}
        />
      );

      after(() => {
        fetchMock.restore();
      });

      it('should have a renderRow method', () => {
        let badges = {
          uri: 'foobarbaz',
          name: 'foo',
        };
        fullProfileWrapper.node.renderRow(badges);
        expect(fullProfileWrapper.node.renderRow).to.be.a('function');
      });

      it('should have a goToBadges method', () => {
        fullProfileWrapper.node.goToBadges();
        expect(fullProfileWrapper.node.goToBadges).to.be.a('function');
      });

      it('should have a renderScene method', () => {
        fullProfileWrapper.state().currentStreakHabit = null;
        fullProfileWrapper.node.renderScene();
        expect(fullProfileWrapper.node.renderScene).to.be.a('function');
      });

      it('should have a parseUserData method', () => {
        let newData = {
          user: {
            badges: [
              badges['First Step'],
              badges['Better Already'],
              badges['Top of the World'],
            ],
          },
          habits: [
            {
              action: 'Foo',
              streak: { current: 1 }
            },
            {
              action: 'Bar',
              streak: { current: 1 }
            },
            {
              action: 'Baz',
              streak: { current: 1 }
            },
          ],
        };
        fullProfileWrapper.node.parseUserData(newData);
        let newerData = {
          user: {
            badges: [
              { 'First Step': 'foo' },
              { 'Better Already': 'bar' },
              { 'Top of the World': 'baz' },
              { 'Gone Streaking': 'foobar' },
            ],
          },
          habits: [
            {
              action: 'Foo',
              streak: { current: 1 }
            },
            {
              action: 'Bar',
              streak: { current: 1 }
            },
            {
              action: 'Baz',
              streak: { current: 1 }
            },
          ],
        };
        fullProfileWrapper.node.parseUserData(newerData);
        expect(fullProfileWrapper.node.parseUserData).to.be.a('function');
      });

      it('should have a refreshUserData method', () => {
        fullProfileWrapper.node.refreshUserData();
        expect(fullProfileWrapper.node.refreshUserData).to.be.a('function');
      });

      it('refreshUserData should log errors', () => {
        let mockError = new Error('foo');
        fetchMock.restore();
        fetchMock.get(/\/user/, { throws: mockError });
      });

      it('should have a calculateProgress method', () => {
        let userHabits = [
          {
            action: 'Foo',
            streak: { current: 1 }
          },
          {
            action: 'Bar',
            streak: { current: 1 }
          },
          {
            action: 'Baz',
            streak: { current: 1 }
          },
        ];
        fullProfileWrapper.node.calculateProgress(0, userHabits);
        fullProfileWrapper.node.calculateProgress(1, userHabits);
        fullProfileWrapper.node.calculateProgress(2, userHabits);
        fullProfileWrapper.node.componentWillReceiveProps();
        expect(fullProfileWrapper.node.calculateProgress).to.be.a('function');
      });
    });
  });

  describe('BadgeView component', () => {

  });
});