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
      const fullLoadingContainerWrapper = mount(
        <LoadingContainer
          user={{}}
          navigator={{ push: function() {} }}
        />
      );
      expect(fullLoadingContainerWrapper.node.goToOnboard).to.be.a('function');
    });

    it('should have a goToInbox method', () => {
      const fullLoadingContainerWrapper = mount(
        <LoadingContainer
          user={{}}
          navigator={{ push: function() {} }}
        />
      );
      expect(fullLoadingContainerWrapper.node.goToInbox).to.be.a('function');
    });

    it('should have a renderScene method', () => {
      const fullLoadingContainerWrapper = mount(
        <LoadingContainer
          user={{}}
          navigator={{ push: function() {} }}
        />
      );
      fullLoadingContainerWrapper.node.renderScene();
      expect(fullLoadingContainerWrapper.node.renderScene).to.be.a('function');
    });

    it('should invoke goToOnboard upon mount if the user is new', () => {
      mount(
        <LoadingContainer
          user={{ newUser: true }}
          navigator={{ push: function() {} }}
        />
      );
    });

    it('should invoke goToInbox upon mount if the user exists', () => {
      mount(
        <LoadingContainer
          user={{ newUser: false }}
          navigator={{ push: function() {} }}
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

