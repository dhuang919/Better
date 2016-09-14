'use strict';
// React Native components
import React, {
  Text,
  View,
  Navigator,
  TouchableOpacity,
} from 'react-native';
// App Container
import AppContainer from '../../app/containers/AppContainer';
// Custom components
import HabitDetails from '../../app/components/HabitDetails';
import HabitSettings from '../../app/components/HabitSettings';
import InboxContainer from '../../app/containers/InboxContainer';
import InstanceHistory from '../../app/components/InstanceHistory';
import CreateContainer from '../../app/containers/CreateContainer';
import OnboardContainer from '../../app/containers/OnboardContainer';
import LoadingContainer from '../../app/containers/LoadingContainer';
// Testing dependencies
import sinon from 'sinon';
import { expect } from 'chai';
import fetchMock from 'fetch-mock';
import { shallow, mount } from 'enzyme';
// Wrappers
const appWrapper = shallow(
  <AppContainer
    user={{}}
    badge={{}}
    token={{}}
    profile={{}}
  />
);

describe('App Container', () => {
  it('should render 1 View component', () => {
    expect(appWrapper.find(View)).to.have.length(1);
  });

  it('should render 1 Navigator component', () => {
    expect(appWrapper.find(Navigator)).to.have.length(1);
  });

  describe('Methods', () => {
    let fullAppWrapper;
    before(() => {
      fullAppWrapper = mount(
        <AppContainer
          user={{}}
          badge={{}}
          token={{}}
          profile={{}}
        />
      );
    });

    it('should have a configureScene method', () => {
      fullAppWrapper.node.configureScene();
      expect(fullAppWrapper.node.configureScene).to.be.a('function');
    });

    it('should have a renderScene method', () => {
      expect(fullAppWrapper.node.renderScene).to.be.a('function');
    });

    it('renderScene should render LoadingContainer if the route ID is "Loading"', () => {
      let route = { id: 'Loading' };
      let RenderedScene = () => fullAppWrapper.node.renderScene(route);
      let renderedWrapper = shallow(<RenderedScene />);
      expect(renderedWrapper.find(LoadingContainer)).to.have.length(1);
    });

    it('renderScene should render OnboardContainer if the route ID is "Onboard"', () => {
      let route = { id: 'Onboard' };
      let RenderedScene = () => fullAppWrapper.node.renderScene(route);
      let renderedWrapper = shallow(<RenderedScene />);
      expect(renderedWrapper.find(OnboardContainer)).to.have.length(1);
    });

    it('renderScene should render CreateContainer if the route ID is "CreateContainer"', () => {
      let route = { id: 'CreateContainer' };
      let RenderedScene = () => fullAppWrapper.node.renderScene(route);
      let renderedWrapper = shallow(<RenderedScene />);
      expect(renderedWrapper.find(CreateContainer)).to.have.length(1);
    });

    it('renderScene should render InboxContainer if the route ID is "InboxContainer"', () => {
      let route = { id: 'InboxContainer' };
      let RenderedScene = () => fullAppWrapper.node.renderScene(route);
      let renderedWrapper = shallow(<RenderedScene />);
      expect(renderedWrapper.find(InboxContainer)).to.have.length(1);
    });

    it('renderScene should render HabitSettings if the route ID is "HabitSettings"', () => {
      let route = { id: 'HabitSettings' };
      let RenderedScene = () => fullAppWrapper.node.renderScene(route);
      let renderedWrapper = shallow(<RenderedScene />);
      expect(renderedWrapper.find(HabitSettings)).to.have.length(1);
    });

    it('renderScene should render HabitDetails if the route ID is "HabitDetails"', () => {
      let route = { id: 'HabitDetails' };
      let RenderedScene = () => fullAppWrapper.node.renderScene(route);
      let renderedWrapper = shallow(<RenderedScene />);
      expect(renderedWrapper.find(HabitDetails)).to.have.length(1);
    });

    it('renderScene should render InstanceHistory if the route ID is "InstanceHistory"', () => {
      let route = { id: 'InstanceHistory' };
      let RenderedScene = () => fullAppWrapper.node.renderScene(route);
      let renderedWrapper = shallow(<RenderedScene />);
      expect(renderedWrapper.find(InstanceHistory)).to.have.length(1);
    });
  });
});
