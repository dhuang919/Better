'use strict';
// React Native component dependencies
import React, {
  View,
  Text,
  Navigator,
} from 'react-native';
// Loading component
import Loading from '../../app/components/Loading';
// Loading container
import LoadingContainer from '../../app/containers/LoadingContainer';
// Testing dependencies
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
// Wrappers
const componentWrapper = shallow(<Loading />);

describe('Loading container', () => {
  it('shoulder render 1 View component', () => {
    const containerWrapper = shallow(<LoadingContainer />);
    expect(containerWrapper.find(View)).to.have.length(1);
  });

  it('should render 1 Navigator component', () => {
    const containerWrapper = shallow(<LoadingContainer />);
    expect(containerWrapper.find(Navigator)).to.have.length(1);
  });

  it('should invoke goToOnboard if the user is new', () => {
    let mockUser = { newUser: true };
    let mockNavigator = { push: function() {} };
    const containerWrapper = mount(
      <LoadingContainer
        user={mockUser}
        navigator={mockNavigator}
      />
    );
  });

  it('should invoke goToInbox if the user exists', () => {
    let mockUser = { newUser: false };
    let mockNavigator = { push: function() {} };
    const containerWrapper = mount(
      <LoadingContainer
        user={mockUser}
        navigator={mockNavigator}
      />
    );
  });

  describe('Loading component', () => {
    it('should render 1 View component', () => {
      expect(componentWrapper.find(View)).to.have.length(1);
    });

    it('should render 1 Text component', () => {
      expect(componentWrapper.find(Text)).to.have.length(1);
    });

    it('should render "BETTER." as a child of Text', () => {
      expect(componentWrapper.find(Text).children().node).to.equal('BETTER.');
    });
  });
});

