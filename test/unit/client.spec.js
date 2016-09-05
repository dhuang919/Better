'use strict';
// React Native component dependencies
import React, {
  View,
  Text,
  Navigator,
} from 'react-native';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';

// Loading component dependency
import Loading from '../../app/components/Loading';

// CreateContainer dependencies
import {
  Create,
  TextField,
  SubmitButton,
} from '../../app/components/Create';
import AddHabits from '../../app/containers/CreateContainer';

// InboxContainer dependencies
import Inbox from '../../app/components/Inbox';
import Habits from '../../app/containers/InboxContainer';

describe('<Loading />', () => {
  it('it should render 1 view component', () => {
    let wrapper = shallow(<Loading />);
    expect(wrapper.find(View)).to.have.length(1);
  });

  it('it should render 1 text component', () => {
    let wrapper = shallow(<Loading />);
    expect(wrapper.find(Text)).to.have.length(1);
  });
});

describe('<AddHabits />', () => {

  it('it should render a view component', () => {
    let wrapper = shallow(<AddHabits navigator={{}} />);
    expect(wrapper.find(View)).to.have.length(1);
  });

  it('it should contain a navigator component', () => {
    let wrapper = shallow(<AddHabits navigator={{}} />);
    expect(wrapper.find(Navigator)).to.have.length(1);
  });

  it('it should have an object property type', () => {
    let wrapper = mount(<AddHabits navigator={{}} />);
    expect(wrapper.props().navigator).to.be.an('object');
  });

  it('it should have a navigation bar', () => {
    let wrapper = shallow(<AddHabits navigator={{}} />);
    let navigator = wrapper.find('Navigator');
    expect(navigator.props().navigationBar).to.exist;
  });
});

describe('<Create />', () => {
  it('it should render form controls', () => {
    let fields = {
      action: 'Floss',
    };
    let wrapper = shallow(<Create fields={fields} handleClick={() => {}} />);
    expect(wrapper.find(View)).to.have.length(2);
    expect(wrapper.find(TextField)).to.have.length(1);
    expect(wrapper.find('SubmitButton')).to.have.length(1);
  });
});
