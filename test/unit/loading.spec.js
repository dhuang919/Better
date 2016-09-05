'use strict';
// React Native component dependencies
import React, {
  View,
  Text,
  Navigator,
} from 'react-native';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
// Loading component
import Loading from '../../app/components/Loading';
// Loading container
import LoadingContainer from '../../app/containers/LoadingContainer';

const wrapper = shallow(<Loading />);

describe('Loading component', () => {
  it('should render 1 View component', () => {
    expect(wrapper.find(View)).to.have.length(1);
  });

  it('should render 1 Text component', () => {
    // console.log('FOO:', wrapper.find(Text).children().node);
    expect(wrapper.find(Text)).to.have.length(1);
  });

  it('should render "BETTER." as a child of Text', () => {
    expect(wrapper.find(Text).children().node).to.equal('BETTER.');
  });
});

describe('Loading container', () => {
  it('')
});
