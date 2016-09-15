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
import CreateContainer, {
  NavigationBarRouteMapper
} from '../../app/containers/CreateContainer';
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
let createWrapper = shallow(
  <Create
    handleClick={() => {}}
    fields={{ action: 'foo' }}
  />
);
let textFieldWrapper = shallow(
  <TextField
    title={'foo'}
    onChange={() => {}}
  />
);

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

  describe('Navigation Bar Route Mapper', () => {
    it('should be an object with 3 methods', () => {
      expect(NavigationBarRouteMapper).to.be.an('object');
      expect(NavigationBarRouteMapper.LeftButton).to.be.a('function');
      expect(NavigationBarRouteMapper.RightButton).to.be.a('function');
      expect(NavigationBarRouteMapper.Title).to.be.a('function');
    });

    describe('LeftButton', () => {
      it('should return null', () => {
        expect(NavigationBarRouteMapper.LeftButton()).to.be.null;
      });
    });

    describe('RightButton', () => {
      it('should return null', () => {
        expect(NavigationBarRouteMapper.RightButton()).to.be.null;
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

      it('should render a Text component which reads "New Habit"', () => {
        expect(wrapper.find(Text).children().node).to.equal('New Habit');
      });
    });
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

    it('sendHabit should log errors', () => {
      let mockError = new Error('intentional create.spec error for testing');
      fetchMock.post(/\/habits/, { throws: mockError });
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
    it('should render 2 View components', () => {
      expect(createWrapper.find(View)).to.have.length(2);
    });

    it('should render 1 custom TextField component', () => {
      expect(createWrapper.find(TextField)).to.have.length(1);
    });

    it('should render 1 custom SubmitButton component', () => {
      expect(createWrapper.find(SubmitButton)).to.have.length(1);
    });

    it('should render 4 Text components', () => {
      expect(createWrapper.find(Text)).to.have.length(4);
    });

    it('should pass a callback function to TextField', () => {
      createWrapper.find(TextField).node.props.onChange();
    });
  });

  describe('TextField component', () => {
    it('should render 1 View component', () => {
      expect(textFieldWrapper.find(View)).to.have.length(1);
    });

    it('should render 1 Text component', () => {
      expect(textFieldWrapper.find(Text)).to.have.length(1);
    });

    it('should render 1 TextInput component', () => {
      expect(textFieldWrapper.find(TextInput)).to.have.length(1);
    });

    it('should render props.title as the text in the Text component', () => {
      expect(textFieldWrapper.find(Text).props().children).to.equal('foo');
    });
  });

  describe('SubmitButton component', () => {
    it('should render 1 Button component', () => {
      expect(submitButtonWrapper.find(Button)).to.have.length(1);
    });
  });
});
