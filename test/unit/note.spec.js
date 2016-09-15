'use strict';
// React Native component dependencies
import React, {
  View,
  Text,
  Modal,
  ListView,
  Navigator,
  TextInput,
  TouchableOpacity,
} from 'react-native';
// Note component
import Note from '../../app/components/Note';
// Custom components
import moment from 'moment';
import api from '../../app/lib/api';
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome';
// Testing dependencies
import { expect } from 'chai';
import fetchMock from 'fetch-mock';
import { shallow, mount } from 'enzyme';
// Wrapper
const noteWrapper = shallow(
  <Note
    note={{}}
    habit={{}}
    token={{}}
    profile={{}}
    rowData={{}}
    visible={true}
    instanceId={'1'}
    date={Date.now()}
    hideModal={() => {}}
    getRowData={() => {}}
  />
);

describe('Note', () => {
  it('should render 4 View components', () => {
    expect(noteWrapper.find(View)).to.have.length(4);
  });

  it('should render 1 Modal component', () => {
    expect(noteWrapper.find(Modal)).to.have.length(1);
  });

  it('should render 1 Text component', () => {
    expect(noteWrapper.find(Text)).to.have.length(1);
  });

  it('should render 1 TextInput component', () => {
    expect(noteWrapper.find(TextInput)).to.have.length(1);
  });

  it('should render 3 TouchableOpacity components', () => {
    expect(noteWrapper.find(TouchableOpacity)).to.have.length(3);
  });

  it('should render 3 Icon components', () => {
    expect(noteWrapper.find(Icon)).to.have.length(3);
  });

  describe('Methods', () => {
    let fullNoteWrapper;
    before(() => {
      fetchMock.put(/\/habits/, 200);
      fullNoteWrapper = mount(
        <Note
          note={{}}
          habit={{}}
          token={{}}
          profile={{}}
          rowData={{}}
          visible={true}
          instanceId={'1'}
          date={Date.now()}
          hideModal={() => {}}
          getRowData={() => {}}
        />
      );
    });

    after(() => {
      fetchMock.restore();
    });

    it('should have a componentWillReceiveProps method', () => {
      let mockProps = {
        note: 'foo',
        rowData: {},
        instanceId: '2',
        date: Date.now(),
        modalVisible: true,
      };
      fullNoteWrapper.node.componentWillReceiveProps(mockProps);
      expect(fullNoteWrapper.node.componentWillReceiveProps).to.be.a('function');
    });

    it('should have an updateHabit method', () => {
      fullNoteWrapper.node.updateHabit();
      expect(fullNoteWrapper.node.updateHabit).to.be.a('function');
    });

    it('updateHabit should log errors', () => {
      fetchMock.restore();
      let mockError = new Error('intentional note.spec error for testing');
      fetchMock.put(/\/habits/, { throws: mockError });
      fullNoteWrapper.node.updateHabit();
      fetchMock.restore();
      fetchMock.put(/\/habits/, 200);
    });

    it('should have a handleUpdate method', () => {
      fullNoteWrapper.node.handleUpdate();
      expect(fullNoteWrapper.node.handleUpdate).to.be.a('function');
    });

    it('should have a handleClearText method', () => {
      fullNoteWrapper.node.handleClearText();
      expect(fullNoteWrapper.node.handleClearText).to.be.a('function');
    });

    it('should have a handleDeleteNote method', () => {
      fullNoteWrapper.node.handleDeleteNote();
      expect(fullNoteWrapper.node.handleDeleteNote).to.be.a('function');
    });

    it('should have an onTextChange method', () => {
      fullNoteWrapper.node.onTextChange();
      expect(fullNoteWrapper.node.onTextChange).to.be.a('function');
    });
  });
});
