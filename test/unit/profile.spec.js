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
import Profile, {
  NavigationBarRouteMapper as profileNavigationBarRouteMapper,
} from '../../app/components/Profile';
// Profile container
import ProfileContainer from '../../app/containers/ProfileContainer';
// Custom components
import Button from 'react-native-button';
import badges from '../../app/lib/badges';
import ProgressBar from 'react-native-progress-bar';
import BadgeView, {
  NavigationBarRouteMapper as badgeNavigationBarRouteMapper,
} from '../../app/components/BadgeView';
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
    earnedBadges={[]}
    navigator={{ push: function() {} }}
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

    describe('Profile Navigation Bar Route Mapper', () => {
      it('should be an object with 3 methods', () => {
        expect(profileNavigationBarRouteMapper).to.be.an('object');
        expect(profileNavigationBarRouteMapper.LeftButton).to.be.a('function');
        expect(profileNavigationBarRouteMapper.RightButton).to.be.a('function');
        expect(profileNavigationBarRouteMapper.Title).to.be.a('function');
      });

      describe('LeftButton', () => {
        it('should return null', () => {
          expect(profileNavigationBarRouteMapper.LeftButton()).to.be.null;
        });
      });

      describe('RightButton', () => {
        it('should return null', () => {
          expect(profileNavigationBarRouteMapper.RightButton()).to.be.null;
        });
      });

      describe('Title', () => {
        let wrapper;
        before(() => {
          wrapper = shallow(<profileNavigationBarRouteMapper.Title />);
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
      let fullProfileWrapper, mockUser, mockProfile;

      before(() => {
        mockUser = {
          badges: [
            badges['First Step'],
            badges['Better Already'],
            badges['Top of the World'],
          ],
          email: 'foo@bar.com',
          newUser: false,
          userName: 'foo',
        };
        mockProfile = {
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
        fullProfileWrapper = mount(
          <Profile
            token={{}}
            badgeURIs={{}}
            user={mockUser}
            profile={mockProfile}
            handleLogout={() => {}}
            navigator={{ push: function() {} }}
          />
        );
      });

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
        fetchMock.restore();
        let mockError = new Error('intentional profile.spec error for testing');
        fetchMock.get(/\/user/, { throws: mockError });
        fullProfileWrapper.node.refreshUserData();
        fetchMock.restore();
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
    it('should render 1 Navigator component', () => {
      expect(badgeViewWrapper.find(Navigator)).to.have.length(1);
    });

    it('should have initial state', () => {
      let dataSource = new ListView.DataSource({
        rowHasChanged (row1, row2) {
          return row1 !== row2;
        }
      });
      expect(badgeViewWrapper.state()).to.eql({ dataSource });
    });

    describe('Badge Navigation Bar Route Mapper', () => {
      it('should be an object with 3 methods', () => {
        expect(badgeNavigationBarRouteMapper).to.be.an('object');
        expect(badgeNavigationBarRouteMapper.LeftButton).to.be.a('function');
        expect(badgeNavigationBarRouteMapper.RightButton).to.be.a('function');
        expect(badgeNavigationBarRouteMapper.Title).to.be.a('function');
      });

      describe('LeftButton', () => {
        let wrapper;
        before(() => {
          let mockNavigator = {
            parentNavigator: { pop: function() {} },
          };
          let LeftButton = () => badgeNavigationBarRouteMapper.LeftButton({}, mockNavigator)
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
          expect(badgeNavigationBarRouteMapper.RightButton()).to.be.null;
        });
      });

      describe('Title', () => {
        let wrapper;
        before(() => {
          wrapper = shallow(<badgeNavigationBarRouteMapper.Title />);
        });

        it('should return a TouchableOpacity component', () => {
          expect(wrapper.find('TouchableOpacity')).to.have.length(1);
        });

        it('should return 1 nested Text component', () => {
          expect(wrapper.find(Text)).to.have.length(1);
        });

        it('should render a Text component which reads "All Badges"', () => {
          expect(wrapper.find(Text).children().node).to.equal('All Badges');
        });
      });
    });

    describe('Methods', () => {
      let earnedBadges = [
        { 'First Step': 'foo' },
        { 'Better Already': 'bar' },
        { 'Top of the World': 'baz' },
        { 'Gone Streaking': 'foobar' },
      ];
      let fullBadgeViewWrapper = mount(
        <BadgeView
          earnedBadges={earnedBadges}
          navigator={{ push: function() {} }}
        />
      );
      it('should have a renderRow method', () => {
        let rowData = {
          earned: true,
        };
        fullBadgeViewWrapper.node.renderRow(rowData);
        rowData.earned = false;
        fullBadgeViewWrapper.node.renderRow(rowData);
        expect(fullBadgeViewWrapper.node.renderRow).to.be.a('function');
      });

      it('should have a renderScene method', () => {
        fullBadgeViewWrapper.node.renderScene();
        expect(fullBadgeViewWrapper.node.renderScene).to.be.a('function');
      });
    });
  });
});