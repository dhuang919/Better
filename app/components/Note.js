'use strict';
// React Native components
import React, {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
// custome components and methods
import api from '../lib/api';
// external libraries and components
import moment from 'moment';
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome';

const Note = React.createClass({
  getInitialState () {
    return {
      modalVisible: false,
      instanceId: null,
      rowData: null,
      date: null,
      note: { note: '' },
    };
  },

  componentWillReceiveProps (props) {
    this.setState({
      modalVisible: props.visible,
      instanceId: props.instanceId,
      rowData: props.rowData,
      date: props.date,
      note: props.note,
    });
  },

  updateHabit () {
    fetch(`${process.env.SERVER}/habits/${this.props.profile.email}/${this.props.habit._id}/${this.props.instanceId}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.token.idToken}`
      },
      body: JSON.stringify(this.state.note)
    })
    .then(api.handleErrors)
    .then( (response) => this.props.hideModal() )
    .then( () => this.props.getRowData() )
    .catch( (err) => console.warn(err) );
  },

  handleUpdate () {
    this.updateHabit();
  },

  handleClearText () {
    this.setState({
      note: { note: ''},
    });
  },

  handleDeleteNote () {
    this.handleClearText();
    this.handleUpdate();
  },

  onTextChange (text) {
    this.setState({
      note: { note: text },
    });
  },

  render () {
    const modalBackgroundStyle = {backgroundColor: 'rgba(0, 0, 0, 0.5)'};
    const innerContainerTransparentStyle = {backgroundColor: '#fff', padding: 20};
    return (
      <View>
        <Modal
          animated={true}
          transparent={true}
          visible={this.state.modalVisible} >
          <View style={[styles.container, modalBackgroundStyle]}>
            <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
              <Text style={{fontSize: 15, marginBottom: 20}}>{moment(this.props.date).format('MMMM Do YYYY')}</Text>
              <TextInput
                style={{height: 250, width: 300, fontSize: 18, borderColor: 'white', borderWidth: 1}}
                defaultValue={this.state.note.note}
                autoFocus={true}
                placeholder="Write a note.."
                onChangeText={this.onTextChange}
                multiline={true}
                maxLength={200}
              />
              <View style={styles.formControls}>
                <TouchableOpacity style={styles.modalButton} onPress={this.handleUpdate}>
                  <Icon name='save' size={25} color='#ffffff' />
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={this.handleClearText}>
                  <Icon name='times-circle-o' size={25} color='#ffffff' />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modalButton, styles.deleteButton]} onPress={this.handleDeleteNote}>
                  <Icon name='trash-o' size={25} color='#ffffff' />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  innerContainer: {
    borderRadius: 10,
    height: 400,
    alignItems: 'center',
  },
  modalButton: {
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#6399DC",
  },
  deleteButton: {
    backgroundColor: "red",
  },
  formControls: {
    flexDirection: 'row',
  },
});

module.exports = Note;
