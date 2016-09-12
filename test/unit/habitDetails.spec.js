'use strict';
// React Native component dependencies
import React, {
  View,
  Text,
  ListView,
  Navigator,
  TouchableOpacity,
} from 'react-native';
// Habit Details component
import HabitDetails, {
  NavigationBarRouteMapper
} from '../../app/components/HabitDetails';
// Custom components
import {
  getDaysArray,
  calendarLabel,
  getPeriodArray,
} from '../../app/lib/calendar';
import moment from 'moment';
import api from '../../app/lib/api';
import Note from '../../app/components/Note';
import Icon from 'react-native-vector-icons/FontAwesome';
// Testing dependencies
import { expect } from 'chai';
import fetchMock from 'fetch-mock';
import { shallow, mount } from 'enzyme';
// Wrappers
const detailsWrapper = shallow(
  <HabitDetails
    token={{}}
    habit={{}}
    profile={{}}
    navigator={{ push: function() {} }}
  />
);

describe('Habit Details', () => {
  it('should render 1 View component', () => {
    expect(detailsWrapper.find(View)).to.have.length(1);
  });

  it('should render 1 Navigator component', () => {
    expect(detailsWrapper.find(Navigator)).to.have.length(1);
  });

  it('should have initial state', () => {
    let initialState = {
      date: null,
      rowData: null,
      instances: null,
      instanceId: null,
      note: { note: '' },
      modalVisible: false,
      dataSource: new ListView.DataSource({
        rowHasChanged (row1, row2) {
          return row1 !== row2;
        }
      }),
    };
    // currentDate is excluded since it's a snapshot of the current time
    delete detailsWrapper.state().currentDate;
    expect(detailsWrapper.state()).to.eql(initialState);
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
      let wrapper;
      before(() => {
        let mockNavigator = {
          parentNavigator: { push: function() {} },
        };
        let RightButton = () => NavigationBarRouteMapper.RightButton({}, mockNavigator)
        wrapper = shallow(<RightButton />);
      });

      it('should return a TouchableOpacity component with an onPress callback', () => {
        expect(wrapper.find('TouchableOpacity')).to.have.length(1);
        wrapper.find('TouchableOpacity').props().onPress();
        expect(wrapper.find('TouchableOpacity').props().onPress).to.be.a('function');
      });

      it('should return 1 nested Text component', () => {
        expect(wrapper.find(Text)).to.have.length(1);
      });

      it('should render a Text component which reads "History"', () => {
        expect(wrapper.find(Text).children().node).to.equal('History');
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

      it('should render a Text component which reads "Habit Details"', () => {
        expect(wrapper.find(Text).children().node).to.equal('Habit Details');
      });
    });
  });

  describe('Methods', () => {
    let fullDetailsWrapper;
    before(() => {
      let mockHabit = {
        action: 'foobar',
        lastDone: Date.now(),
        streak: {
          max: 3,
          current: 1,
          instanceCount: 2,
        },
      };
      fetchMock.get(/\/habits/, {
        body: [
          {
            _id: '1',
            createdAt: Date.now(),
            note: 'foo',
            updatedAt: Date.now(),
          },
          {
            _id: '2',
            createdAt: Date.now(),
            note: 'bar',
            updatedAt: Date.now(),
          }
        ],
      });
      fullDetailsWrapper = mount(
        <HabitDetails
          token={{}}
          profile={{}}
          habit={mockHabit}
          navigator={{ push: function() {} }}
        />
      );
    });

    after(() => {
      fetchMock.restore();
    });

    it('should have a hideModal method', () => {
      fullDetailsWrapper.node.hideModal();
      expect(fullDetailsWrapper.node.hideModal).to.be.a('function');
    });

    it('should have a getRowData method', () => {
      fullDetailsWrapper.node.getRowData();
      expect(fullDetailsWrapper.node.getRowData).to.be.a('function');
    });

    it('getRowData should log errors', () => {
      fetchMock.restore();
      let mockError = new Error('intentional habitDetails.spec error for testing');
      fetchMock.get(/\/habits/, { throws: mockError });
      fullDetailsWrapper.node.getRowData();
      fetchMock.restore();
      fetchMock.get(/\/habits/, { body: [] });
    });

    it('should have a handleInstancePress method', () => {
      let mockRowData = {
        ISOString: Date.now(),
        date: 9,
        done: true,
        instanceId: '123',
        note: { note: 'foo' },
      };
      fullDetailsWrapper.node.handleInstancePress(mockRowData);
      expect(fullDetailsWrapper.node.handleInstancePress).to.be.a('function');
    });

    it('should have a renderScene method', () => {
      fullDetailsWrapper.node.renderScene();
      let eightDaysAgo = Date.now() * 1000 * 60 * 60 * 24 * 8;
      let mockHabit = {
        action: 'foobar',
        lastDone: eightDaysAgo,
        streak: {
          max: 3,
          current: 1,
          instanceCount: 2,
        },
      };
      let tempFullDetailsWrapper = mount(
        <HabitDetails
          token={{}}
          profile={{}}
          habit={mockHabit}
          navigator={{ push: function() {} }}
        />
      );
      tempFullDetailsWrapper.node.renderScene();
      expect(fullDetailsWrapper.node.renderScene).to.be.a('function');
    });

    // renderRow has it's own block because of the number of
    // different variations it renders depending on the data
    describe('renderRow', () => {
      it('should be a method', () => {
        expect(fullDetailsWrapper.node.renderRow).to.be.a('function');
      });

      it('should render a calendar heading if it exists', () => {
        let mockRowData = { calendarHeading: 'F' };
        fullDetailsWrapper.node.renderRow(mockRowData);
      });

      it('should render a present day instance that is done and has a note', () => {
        let mockRowData = {
          ISOString: Date.now(),
          done: true,
          note: { note: 'foo' },
        };
        fullDetailsWrapper.node.renderRow(mockRowData);
      });

      it('should render a present day instance that is done and does not have a note', () => {
        let mockRowData = {
          ISOString: Date.now(),
          done: true,
          note: { note: '' },
        };
        fullDetailsWrapper.node.renderRow(mockRowData);
      });

      it('should render a present day instance that is not done', () => {
        let mockRowData = {
          ISOString: Date.now(),
          done: false,
          note: { note: '' },
        };
        fullDetailsWrapper.node.renderRow(mockRowData);
      });

      it('should render an instance that is done with a note', () => {
        let twoDaysAgo = Date.now() - (1000 * 60 * 60 * 24 * 2);
        let mockRowData = {
          ISOString: twoDaysAgo,
          done: true,
          note: { note: 'foo' },
        };
        fullDetailsWrapper.node.renderRow(mockRowData);
      });

      it('should render an instance that is done', () => {
        let twoDaysAgo = Date.now() - (1000 * 60 * 60 * 24 * 2);
        let mockRowData = {
          ISOString: twoDaysAgo,
          done: true,
          note: { note: '' },
        };
        fullDetailsWrapper.node.renderRow(mockRowData);
      });

      it('should render an instance that is in the future', () => {
        let twoDaysAhead = Date.now() + (1000 * 60 * 60 * 24 * 2);
        let mockRowData = {
          ISOString: twoDaysAhead,
          done: false,
          note: { note: '' },
        };
        fullDetailsWrapper.node.renderRow(mockRowData);
      });

      it('should render an instance that is not done and n/a', () => {
        let twoDaysAgo = Date.now() - (1000 * 60 * 60 * 24 * 2);
        let mockRowData = {
          ISOString: twoDaysAgo,
          done: false,
          note: { note: '' },
        };
        fullDetailsWrapper.node.renderRow(mockRowData);
      });
    })
  });
});
