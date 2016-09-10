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
const loadingWrapper = shallow(<Loading />);
const loadingContainerWrapper = shallow(<LoadingContainer />);

describe('Loading Container', () => {
  it('shoulder render 1 View component', () => {
    expect(loadingContainerWrapper.find(View)).to.have.length(1);
  });

  it('should render 1 Navigator component', () => {
    expect(loadingContainerWrapper.find(Navigator)).to.have.length(1);
  });

  describe('Methods', () => {
    it('should have a goToOnboard method', () => {
      
    });

    it('should invoke goToOnboard if the user is new', () => {
      let mockUser = { newUser: true };
      let mockNavigator = { push: function() {} };
      const fullContainerWrapper = mount(
        <LoadingContainer
        user={mockUser}
        navigator={mockNavigator}
        />
      );
    });

    it('should invoke goToInbox if the user exists', () => {
      let mockUser = { newUser: false };
      let mockNavigator = { push: function() {} };
      const fullContainerWrapper = mount(
        <LoadingContainer
        user={mockUser}
        navigator={mockNavigator}
        />
      );
    });
  });

  describe('Loading component', () => {
    it('should render 1 View component', () => {
      expect(loadingWrapper.find(View)).to.have.length(1);
    });

    it('should render 1 Text component', () => {
      expect(loadingWrapper.find(Text)).to.have.length(1);
    });

    it('should render "BETTER." as a child of Text', () => {
      expect(loadingWrapper.find(Text).children().node).to.equal('BETTER.');
    });
  });
});

