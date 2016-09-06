'use strict';
// React Native component dependencies
import React, {
  View,
  Text,
  Image,
  TextInput,
  Navigator,
} from 'react-native';
// Create components
import {
  Create,
  TextField,
  SubmitButton,
} from '../../app/components/Create';
// Create container
import CreateContainer from '../../app/containers/CreateContainer';
// Custom components
import Button from 'react-native-button';
// Testing dependencies
import sinon from 'sinon';
import { expect } from 'chai';
import fetchMock from 'fetch-mock';
import { shallow, mount } from 'enzyme';
// Wrappers
let submitButtonWrapper = shallow(<SubmitButton />);
let createContainerWrapper = shallow(<CreateContainer />);
let textFieldWrapper = shallow(<TextField onChange={() => {}}/>);
let createWrapper = shallow(<Create fields={{ action: 'foo' }} />);

describe('Create Container', () => {
  it('should render 1 View component', () => {
    expect(createContainerWrapper.find(View)).to.have.length(1);
  });

  it('should render 1 Navigator component', () => {
    expect(createContainerWrapper.find(Navigator)).to.have.length(1);
  });

  it('should have initial state', () => {
    expect(createContainerWrapper.state()).to.eql({ fields: { action: null } });
  });

  describe('Methods', () => {
    afterEach(() => {
      fetchMock.restore();
    });

    it('should have a sendHabit method', () => {
      fetchMock.post(/\/habits/, {});
      let fullContainerWrapper = mount(
        <CreateContainer
          token={{}}
          profile={{}}
          onboard={false}
          resetToTabs={() => {}}
          navigator={{ push: function() {} }}
        />
      );
      fullContainerWrapper.node.sendHabit();
      expect(fullContainerWrapper.node.sendHabit).to.be.a('function');
    });

    it('should error', () => {
      let fullContainerWrapper = mount(
        <CreateContainer
          token={{}}
          profile={{}}
          onboard={false}
          resetToTabs={() => {}}
          navigator={{ push: function() {} }}
        />
      );
      let error = new Error('foo');
      fetchMock.post(/\/habits/, { throws: error });
      fullContainerWrapper.node.sendHabit();
    });

    it('should have a goToInbox method', () => {
      let fullContainerWrapper = mount(
        <CreateContainer
          token={{}}
          profile={{}}
          onboard={false}
          resetToTabs={() => {}}
          navigator={{ push: function() {} }}
        />
      );
      fullContainerWrapper.node.goToInbox({});
      fullContainerWrapper = mount(
        <CreateContainer
          token={{}}
          profile={{}}
          onboard={true}
          resetToTabs={() => {}}
          navigator={{ push: function() {} }}
        />
      );
      fullContainerWrapper.node.goToInbox({});
      expect(fullContainerWrapper.node.goToInbox).to.be.a('function');
    });

    it('should have a handleClick method', () => {
      fetchMock.post(/\/habits/, {});
      let fullContainerWrapper = mount(
        <CreateContainer
          token={{}}
          profile={{}}
          onboard={false}
          resetToTabs={() => {}}
          navigator={{ push: function() {} }}
        />
      );
      fullContainerWrapper.node.handleClick();
      fullContainerWrapper.state().fields.action = 'foo';
      fullContainerWrapper.node.handleClick();
      expect(fullContainerWrapper.node.handleClick).to.be.a('function');
    });

    it('should have a renderScene method', () => {
      let fullContainerWrapper = mount(
        <CreateContainer
          token={{}}
          profile={{}}
          onboard={false}
          resetToTabs={() => {}}
          navigator={{ push: function() {} }}
        />
      );
      fullContainerWrapper.node.renderScene();
      expect(fullContainerWrapper.node.renderScene).to.be.a('function');
    });
  });

  describe('Create component', () => {
    it('should ', () => {
      createWrapper.find(TextField).node.props.onChange();
    });
  });

  describe('TextField component', () => {
    it('should ', () => {
    });
  });

  describe('SubmitButton component', () => {
    it('should ', () => {

    });
  });
});
