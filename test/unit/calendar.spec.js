'use strict';
// Calendar helpers
import {
  getDaysArray,
  calendarLabel,
  getPeriodArray,
  getInstancePeriod,
} from '../../app/lib/calendar';
// Custom components
require('moment-range');
import moment from 'moment';
// Testing dependencies
import { expect } from 'chai';
import fetchMock from 'fetch-mock';
import { shallow, mount } from 'enzyme';

describe('Calendar Helpers', () => {
  describe('calendarLabel', () => {
    it('should exist', () => {
      expect(calendarLabel).to.be.a('function');
    });

    it('should return an array of objects', () => {
      let result = calendarLabel();
      expect(result).to.be.an('array');
      result.forEach(label => {
        expect(label).to.be.an('object');
      });
    });
  });

  describe('getPeriodArray', () => {
    it('should exist', () => {
      expect(getPeriodArray).to.be.a('function');
    });

    it('should return an array of moment dates in ISOString format', () => {
      let results = getPeriodArray();
      expect(results).to.be.an('array');
      results.forEach(date => {
        expect(date).to.be.a('string');
      });
    });
  });

  describe('getDaysArray', () => {
    it('should exist', () => {
      expect(getDaysArray).to.be.a('function');
    });

    it('should return an array of objects, each one with an ISOString, date, and done key', () => {
      let period = getPeriodArray();
      let results = getDaysArray(period);
      // For branch code coverage
      period.pop();
      getDaysArray(period);
      expect(results).to.be.an('array');
      results.forEach(dateObj => {
        expect(dateObj).to.be.an('object');
        expect(dateObj.ISOString).to.be.a('string');
        expect(dateObj.date).to.be.a('number');
        expect(dateObj.done).to.be.a('boolean');
        expect(dateObj.done).to.be.false;
      });
    });
  });

  describe('getInstancePeriod', () => {
    it('should exist', () => {
      expect(getInstancePeriod).to.be.a('function');
    });

    it('should return an array of objects, each one with an ISOString and done key', () => {
      let now = Date.now();
      let fiveDaysAhead = Date.now() + (1000 * 60 * 60 * 24 * 5);
      let results = getInstancePeriod(now, fiveDaysAhead);
      results.forEach(dateObj => {
        expect(dateObj.ISOString).to.be.a('string');
        expect(dateObj.done).to.be.a('boolean');
        expect(dateObj.done).to.be.false;
      });
    });
  });
});
