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
  before(() => {
    fetchMock.get(/\/habits/, {});
  });

  after(() => {
    fetchMock.restore();
  });

  it('should render 1 View component', () => {
    expect(detailsWrapper.find(View)).to.have.length(1);
  });

  it('should render 1 Navigator component', () => {
    expect(detailsWrapper.find(Navigator)).to.have.length(1);
  });

  describe('Navigation Bar Route Mapper', () => {
    
  });

  describe('Methods', () => {
    it('should have a hideModal method', () => {

    });

    it('should have a getRowData method', () => {

    });

    it('should have a handleInstancePress method', () => {

    });

    it('should have a renderRow method', () => {

    });

    it('should have a renderScene method', () => {

    });
  });
});
