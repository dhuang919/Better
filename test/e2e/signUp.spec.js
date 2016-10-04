"use strict";
require('colors');
const wd = require('wd');
const _ = require('underscore');
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
chaiAsPromised.transferPromiseness = wd.transferPromiseness;
chai.should();

const serverConfigs = {
  host: 'localhost',
  port: 4723,
};

describe('Account Sign Up', function () {
  this.timeout(300000);
  let driver;

  before(function () {
    driver = wd.promiseChainRemote(serverConfigs);
    require("./helpers/logging").configure(driver);
    let desired = require("./helpers/caps").ios93;
    return driver.init(desired);
  });

  after(function () {
    return driver.quit();
  });

  it('should', function () {
    expect(true).to.be(true);
  });
});
