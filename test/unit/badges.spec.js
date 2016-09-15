'use strict';
// React Native component dependencies
import React, {
  View,
  Text,
  Image,
  ListView,
  Navigator,
} from 'react-native';
import moment from 'moment';
// Badges
import badges from '../../app/lib/badges';
// Testing dependencies
import { expect } from 'chai';

describe('Badge Module', () => {

  it('should have a "First Step" badge', () => {
    expect(badges.hasOwnProperty('First Step')).to.be.true;
    expect(badges['First Step']).to.be.an('object');
    expect(Object.keys(badges['First Step'])).to.have.length(3);
    expect(badges['First Step'].toastText).to.be.a('string');
    expect(badges['First Step'].uri).to.be.a('string');
    expect(badges['First Step'].check).to.be.a('function');
    expect(badges['First Step'].check()).to.be.false;
  });

  it('should have a "Better Already" badge', () => {
    expect(badges.hasOwnProperty('Better Already')).to.be.true;
    expect(badges['Better Already']).to.be.an('object');
    expect(Object.keys(badges['Better Already'])).to.have.length(3);
    expect(badges['Better Already'].toastText).to.be.a('string');
    expect(badges['Better Already'].uri).to.be.a('string');
    expect(badges['Better Already'].check).to.be.a('function');
    // check() compares habit.instanceCount to 1
    let habit = { instanceCount: 1 };
    expect(badges['Better Already'].check(habit)).to.be.true;
    habit.instanceCount = 2;
    expect(badges['Better Already'].check(habit)).to.not.be.true;
  });

  it('should have a "Top of the World" badge', () => {
    expect(badges.hasOwnProperty('Top of the World')).to.be.true;
    expect(badges['Top of the World']).to.be.an('object');
    expect(Object.keys(badges['Top of the World'])).to.have.length(3);
    expect(badges['Top of the World'].toastText).to.be.a('string');
    expect(badges['Top of the World'].uri).to.be.a('string');
    expect(badges['Top of the World'].check).to.be.a('function');
    // check() returns false if store.length <= 2 and any object in
    // store has an undefined 'lastDone' key
    // It returns true if store.length > 2 and all objects in store
    // have a `lastDone` timestamp in the same day as Date.now()
    let store = [{}, {}, {}];
    expect(badges['Top of the World'].check(null, store)).to.be.false;
    store = [{}];
    expect(badges['Top of the World'].check(null, store)).to.be.false;
    store = [
      { lastDone: Date.now() },
      { lastDone: Date.now() },
      { lastDone: Date.now() },
    ];
    expect(badges['Top of the World'].check(null, store)).to.be.true;
  });

  it('should have a "Gone Streaking" badge', () => {
    expect(badges.hasOwnProperty('Gone Streaking')).to.be.true;
    expect(badges['Gone Streaking']).to.be.an('object');
    expect(Object.keys(badges['Gone Streaking'])).to.have.length(3);
    expect(badges['Gone Streaking'].toastText).to.be.a('string');
    expect(badges['Gone Streaking'].uri).to.be.a('string');
    expect(badges['Gone Streaking'].check).to.be.a('function');
    // check() compares habit.streak.current to 5
    let habit = { streak: { current: 5 } };
    expect(badges['Gone Streaking'].check(habit)).to.be.true;
    habit.streak.current = 7;
    expect(badges['Gone Streaking'].check(habit)).to.not.be.true;
  });

  it('should have a "HOOOOOO" badge', () => {
    expect(badges.hasOwnProperty('HOOOOOO')).to.be.true;
    expect(badges['HOOOOOO']).to.be.an('object');
    expect(Object.keys(badges['HOOOOOO'])).to.have.length(3);
    expect(badges['HOOOOOO'].toastText).to.be.a('string');
    expect(badges['HOOOOOO'].uri).to.be.a('string');
    expect(badges['HOOOOOO'].check).to.be.a('function');
    // check() compares habit.streak.current to 10
    let habit = { streak: { current: 10 } };
    expect(badges['HOOOOOO'].check(habit)).to.be.true;
    habit.streak.current = 7;
    expect(badges['HOOOOOO'].check(habit)).to.not.be.true;
  });

  it('should have a "On Point" badge', () => {
    expect(badges.hasOwnProperty('On Point')).to.be.true;
    expect(badges['On Point']).to.be.an('object');
    expect(Object.keys(badges['On Point'])).to.have.length(3);
    expect(badges['On Point'].toastText).to.be.a('string');
    expect(badges['On Point'].uri).to.be.a('string');
    expect(badges['On Point'].check).to.be.a('function');
    // check() compares habit.streak.current to 15
    let habit = { streak: { current: 15 } };
    expect(badges['On Point'].check(habit)).to.be.true;
    habit.streak.current = 7;
    expect(badges['On Point'].check(habit)).to.not.be.true;
  });

  it('should have a "Soaring" badge', () => {
    expect(badges.hasOwnProperty('Soaring')).to.be.true;
    expect(badges['Soaring']).to.be.an('object');
    expect(Object.keys(badges['Soaring'])).to.have.length(3);
    expect(badges['Soaring'].toastText).to.be.a('string');
    expect(badges['Soaring'].uri).to.be.a('string');
    expect(badges['Soaring'].check).to.be.a('function');
    // check() compares habit.streak.current to 20
    let habit = { streak: { current: 20 } };
    expect(badges['Soaring'].check(habit)).to.be.true;
    habit.streak.current = 7;
    expect(badges['Soaring'].check(habit)).to.not.be.true;
  });

  it('should have a "En Garde" badge', () => {
    expect(badges.hasOwnProperty('En Garde')).to.be.true;
    expect(badges['En Garde']).to.be.an('object');
    expect(Object.keys(badges['En Garde'])).to.have.length(3);
    expect(badges['En Garde'].toastText).to.be.a('string');
    expect(badges['En Garde'].uri).to.be.a('string');
    expect(badges['En Garde'].check).to.be.a('function');
    expect(badges['En Garde'].check()).to.be.false;
  });

  it('should have a "Better Empire" badge', () => {
    expect(badges.hasOwnProperty('Better Empire')).to.be.true;
    expect(badges['Better Empire']).to.be.an('object');
    expect(Object.keys(badges['Better Empire'])).to.have.length(3);
    expect(badges['Better Empire'].toastText).to.be.a('string');
    expect(badges['Better Empire'].uri).to.be.a('string');
    expect(badges['Better Empire'].check).to.be.a('function');
    expect(badges['Better Empire'].check()).to.be.false;
  });

  it('should have a "Leap of Faith" badge', () => {
    expect(badges.hasOwnProperty('Leap of Faith')).to.be.true;
    expect(badges['Leap of Faith']).to.be.an('object');
    expect(Object.keys(badges['Leap of Faith'])).to.have.length(3);
    expect(badges['Leap of Faith'].toastText).to.be.a('string');
    expect(badges['Leap of Faith'].uri).to.be.a('string');
    expect(badges['Leap of Faith'].check).to.be.a('function');
    expect(badges['Leap of Faith'].check()).to.be.false;
  });

  it('should have a "Colossal" badge', () => {
    expect(badges.hasOwnProperty('Colossal')).to.be.true;
    expect(badges['Colossal']).to.be.an('object');
    expect(Object.keys(badges['Colossal'])).to.have.length(3);
    expect(badges['Colossal'].toastText).to.be.a('string');
    expect(badges['Colossal'].uri).to.be.a('string');
    expect(badges['Colossal'].check).to.be.a('function');
    expect(badges['Colossal'].check()).to.be.false;
  });

  it('should have a "8th Wonder" badge', () => {
    expect(badges.hasOwnProperty('8th Wonder')).to.be.true;
    expect(badges['8th Wonder']).to.be.an('object');
    expect(Object.keys(badges['8th Wonder'])).to.have.length(3);
    expect(badges['8th Wonder'].toastText).to.be.a('string');
    expect(badges['8th Wonder'].uri).to.be.a('string');
    expect(badges['8th Wonder'].check).to.be.a('function');
    expect(badges['8th Wonder'].check()).to.be.false;
  });

  it('should have a "True Beauty" badge', () => {
    expect(badges.hasOwnProperty('True Beauty')).to.be.true;
    expect(badges['True Beauty']).to.be.an('object');
    expect(Object.keys(badges['True Beauty'])).to.have.length(3);
    expect(badges['True Beauty'].toastText).to.be.a('string');
    expect(badges['True Beauty'].uri).to.be.a('string');
    expect(badges['True Beauty'].check).to.be.a('function');
    expect(badges['True Beauty'].check()).to.be.false;
  });

  it('should have a "9th Wonder" badge', () => {
    expect(badges.hasOwnProperty('9th Wonder')).to.be.true;
    expect(badges['9th Wonder']).to.be.an('object');
    expect(Object.keys(badges['9th Wonder'])).to.have.length(3);
    expect(badges['9th Wonder'].toastText).to.be.a('string');
    expect(badges['9th Wonder'].uri).to.be.a('string');
    expect(badges['9th Wonder'].check).to.be.a('function');
    expect(badges['9th Wonder'].check()).to.be.false;
  });

  it('should have a "AUSome" badge', () => {
    expect(badges.hasOwnProperty('AUSome')).to.be.true;
    expect(badges['AUSome']).to.be.an('object');
    expect(Object.keys(badges['AUSome'])).to.have.length(3);
    expect(badges['AUSome'].toastText).to.be.a('string');
    expect(badges['AUSome'].uri).to.be.a('string');
    expect(badges['AUSome'].check).to.be.a('function');
    expect(badges['AUSome'].check()).to.be.false;
  });

  it('should have a "10th Wonder" badge', () => {
    expect(badges.hasOwnProperty('10th Wonder')).to.be.true;
    expect(badges['10th Wonder']).to.be.an('object');
    expect(Object.keys(badges['10th Wonder'])).to.have.length(3);
    expect(badges['10th Wonder'].toastText).to.be.a('string');
    expect(badges['10th Wonder'].uri).to.be.a('string');
    expect(badges['10th Wonder'].check).to.be.a('function');
    expect(badges['10th Wonder'].check()).to.be.false;
  });

  it('should have a "Deep Sea" badge', () => {
    expect(badges.hasOwnProperty('Deep Sea')).to.be.true;
    expect(badges['Deep Sea']).to.be.an('object');
    expect(Object.keys(badges['Deep Sea'])).to.have.length(3);
    expect(badges['Deep Sea'].toastText).to.be.a('string');
    expect(badges['Deep Sea'].uri).to.be.a('string');
    expect(badges['Deep Sea'].check).to.be.a('function');
    expect(badges['Deep Sea'].check()).to.be.false;
  });

  it('should have a "International" badge', () => {
    expect(badges.hasOwnProperty('International')).to.be.true;
    expect(badges['International']).to.be.an('object');
    expect(Object.keys(badges['International'])).to.have.length(3);
    expect(badges['International'].toastText).to.be.a('string');
    expect(badges['International'].uri).to.be.a('string');
    expect(badges['International'].check).to.be.a('function');
    expect(badges['International'].check()).to.be.false;
  });
});
