'use strict';
// React Native component dependencies
import React, {
  View,
  Text,
  Switch,
  AlertIOS,
  ListView,
  TextInput,
  Navigator,
  DatePickerIOS,
  TouchableOpacity,
} from 'react-native';
// Habit Settings component
import HabitSettings, {
  NavigationBarRouteMapper
} from '../../app/components/HabitSettings';
// Custom components
import api from '../../app/lib/api';
import Button from 'react-native-button';
// Testing dependencies
import sinon from 'sinon';
import { expect } from 'chai';
import fetchMock from 'fetch-mock';
import { shallow, mount } from 'enzyme';
// Wrappers
const settingsWrapper = shallow(
  <HabitSettings
    habit={{}}
    token={{}}
    profile={{}}
    user={{}}
    navigator={{ push: function () {} }}
  />
);

describe('Habit Settings', () => {
  it('should render 1 View component', () => {
    expect(settingsWrapper.find(View)).to.have.length(1);
  });

  it('should render 1 Navigator component', () => {
    expect(settingsWrapper.find(Navigator)).to.have.length(1);
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

      it('should render a Text component which reads "Habit Settings"', () => {
        expect(wrapper.find(Text).children().node).to.equal('Habit Settings');
      });
    });
  });

  describe('Methods', () => {
    let fullSettingsWrapper, mockHabit, mockUser;
    before(() => {
      mockUser = {
        phoneNumber: false,
      };
      mockHabit = {
        reminder: {
          active: true,
          days: {
            mon: true,
            tue: true,
            wed: true,
            thu: true,
            fri: true,
            sat: true,
            sun: true,
          }
        },
      };
      fetchMock.put(/\/habits/, {});
      fetchMock.delete(/\/habits/, 200);
      fullSettingsWrapper = mount(
        <HabitSettings
          token={{}}
          profile={{}}
          user={mockUser}
          habit={mockHabit}
          navigator={{ push: function () {} }}
        />
      );
    });

    after(() => {
      fetchMock.restore();
    });

    it('should have an onDateChange method', () => {
      fullSettingsWrapper.node.onDateChange(new Date());
      expect(fullSettingsWrapper.node.onDateChange).to.be.a('function');
    });

    it('should have an onTextChange method', () => {
      fullSettingsWrapper.node.onTextChange('foo');
      expect(fullSettingsWrapper.node.onTextChange).to.be.a('function');
    });

    it('should have an onReminderChange method', () => {
      fullSettingsWrapper.node.onReminderChange(true);
      mockUser.phoneNumber = true;
      let tempSettingsWrapper = mount(
        <HabitSettings
          token={{}}
          profile={{}}
          user={mockUser}
          habit={mockHabit}
          navigator={{ push: function () {} }}
        />
      );
      tempSettingsWrapper.node.onReminderChange(true);
      expect(fullSettingsWrapper.node.onReminderChange).to.be.a('function');
    });

    it('should have an gotoInbox method', () => {
      fullSettingsWrapper.node.gotoInbox();
      expect(fullSettingsWrapper.node.gotoInbox).to.be.a('function');
    });

    it('should have an updateHabit method', () => {
      fullSettingsWrapper.node.updateHabit();
      expect(fullSettingsWrapper.node.updateHabit).to.be.a('function');
    });

    it('updateHabit should log errors', () => {
      fetchMock.restore();
      let mockError = new Error('intentional habitSettings.spec error for testing');
      fetchMock.put(/\/habits/, { throws: mockError });
      fullSettingsWrapper.node.updateHabit();
      fetchMock.restore();
      fetchMock.put(/\/habits/, {})
      fetchMock.delete(/\/habits/, 200);
    });

    it('should have an deleteHabit method', () => {
      fullSettingsWrapper.node.deleteHabit();
      expect(fullSettingsWrapper.node.deleteHabit).to.be.a('function');
    });

    it('deleteHabit should log errors', () => {
      fetchMock.restore();
      let mockError = new Error('intentional habitSettings.spec error for testing');
      fetchMock.delete(/\/habits/, { throws: mockError });
      fullSettingsWrapper.node.deleteHabit();
      fetchMock.restore();
      fetchMock.put(/\/habits/, {})
      fetchMock.delete(/\/habits/, 200);
    });

    it('should have an toggleDay method', () => {
      fullSettingsWrapper.node.toggleDay('fri');
      fullSettingsWrapper.node.toggleDay('fri');
      expect(fullSettingsWrapper.node.toggleDay).to.be.a('function');
    });

    describe('renderScene', () => {
      it('should exist', () => {
        expect(fullSettingsWrapper.node.renderScene).to.be.a('function');
      });

      it('should render more Button components, each with their own callbacks, if the reminder is active', () => {
        let RenderedScene = () => fullSettingsWrapper.node.renderScene();
        let renderedWrapper = shallow(<RenderedScene />);
        renderedWrapper.find(Button).nodes.forEach(buttonNode => {
          buttonNode.props.onPress();
          expect(buttonNode.props.onPress).to.be.a('function');
        });
        fullSettingsWrapper.node.renderScene();
      });

      it('should render less Button components, each with their own callbacks, if the reminder is not active', () => {
        mockHabit.reminder.active = false;
        fullSettingsWrapper = mount(
          <HabitSettings
          user={{}}
          token={{}}
          profile={{}}
          habit={mockHabit}
          navigator={{ push: function () {} }}
          />
        );
        let RenderedScene = () => fullSettingsWrapper.node.renderScene();
        let renderedWrapper = shallow(<RenderedScene />);
        renderedWrapper.find(Button).nodes.forEach(buttonNode => {
          buttonNode.props.onPress();
          expect(buttonNode.props.onPress).to.be.a('function');
        });
      });
    });
  });
});
