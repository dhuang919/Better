'use strict';
require('moment-range');
import moment from 'moment';

// Generates labels for calendar
export function calendarLabel () {
  let result = [];
  const weekDays = ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'];
  weekDays.forEach( item => result.push({ calendarHeading: item }) );
  return result;
}

// Creates an array of dates (moment objects) in ISOString format
// Current range - Start of 3 weeks prior to start of current week to end of the current week
export function getPeriodArray () {
  // Current range
  const timeInterval = `${moment().startOf('week').subtract(3, 'weeks').format()}/${moment().endOf('week').add(1, 'weeks').format()}`;
  const dr = moment.range(timeInterval);
  const periodArray = dr.toArray('weeks');
  // Converts moment object to ISOString format
  let transform = periodArray.map( week => week.format() );
  return transform;
}

// Creates an array containing objects representing each day in the period
export function getDaysArray (array) {
  let daysArray = [];

  for (let i = 0; i < 4; i++) {
    let weekInterval, weekRange, weekRangeArray;
    if (i + 1 < array.length) {
      weekInterval = array[i] + '/' + array[ i + 1 ];
      weekRange = moment.range(weekInterval);
      weekRangeArray = weekRange.toArray('days');
      let transform = weekRangeArray.map(day => {
        return {
          ISOString: day.format(),
          date: day.date(),
          done: false,
        };
      });
      // removes duplicate end-of-week day
      transform.pop();
      transform.forEach( day => daysArray.push(day) );
    }
  }
  return daysArray;
}

export function getInstancePeriod (startDate, endDate) {
  const timeInterval = `${moment(startDate).startOf('day').format()}/${moment(endDate).startOf('day').format()}`;
  const dr = moment.range(timeInterval);
  const instanceArray = dr.toArray('days');
  // Converts moment object to ISOString format
  let transform = instanceArray.map(day => {
    return {
      ISOString: day.format(),
      done: false,
    };
  });
  return transform;
}
