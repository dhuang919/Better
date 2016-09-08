'use strict';
// React Native components
import React, {
  View,
  Text,
  Modal,
  TextInput,
  Component,
  PropTypes,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
// custome components and methods
import api from '../lib/api';
// external libraries and components
import moment from 'moment';
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Note extends Component {
  constructor (props) {
    super(props);
    this.state = {
      date: null,
      rowData: null,
      instanceId: null,
      note: { note: '' },
      modalVisible: false,
    };
    this.updateHabit = this.updateHabit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.handleClearText = this.handleClearText.bind(this);
    this.handleDeleteNote = this.handleDeleteNote.bind(this);
  }

  componentWillReceiveProps (props) {
    this.setState({
      note: props.note,
      date: props.date,
      rowData: props.rowData,
      modalVisible: props.visible,
      instanceId: props.instanceId,
    });
  }

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
  }

  handleUpdate () {
    this.updateHabit();
  }

  handleClearText () {
    this.setState({ note: { note: ''} });
  }

  handleDeleteNote () {
    this.handleUpdate();
    this.handleClearText();
  }

  onTextChange (text) {
    this.setState({ note: { note: text } });
  }

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
                maxLength={200}
                multiline={true}
                autoFocus={true}
                placeholder="Write a note.."
                onChangeText={this.onTextChange}
                defaultValue={this.state.note.note}
                style={{height: 250, width: 300, fontSize: 18, borderColor: 'white', borderWidth: 1}}
              />
              <View style={styles.formControls}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={this.handleUpdate}
                >
                  <Icon
                    size={25}
                    name='save'
                    color='#ffffff'
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={this.handleClearText}
                >
                  <Icon
                    size={25}
                    color='#ffffff'
                    name='times-circle-o'
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.deleteButton]}
                  onPress={this.handleDeleteNote}
                >
                  <Icon
                    size={25}
                    name='trash-o'
                    color='#ffffff'
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

Note.PropTypes = {
  note: PropTypes.object,
  date: PropTypes.string,
  habit: PropTypes.object,
  token: PropTypes.object,
  visible: PropTypes.bool,
  profile: PropTypes.object,
  rowData: PropTypes.object,
  hideModal: PropTypes.func,
  getRowData: PropTypes.func,
  instanceId: PropTypes.string,
};

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
