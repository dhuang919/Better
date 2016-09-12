'use strict';
// React Native components
import React, {
  View,
  Text,
  ListView,
  PropTypes,
  Navigator,
  Component,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
// Custom components and methods
import {
  getDaysArray,
  calendarLabel,
  getPeriodArray,
} from '../lib/calendar';
import api from '../lib/api';
import Note from './Note';
// External libraries and components
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';

// Global variables
let _habitInstances;
let _habit;

export default class HabitDetails extends Component {
  constructor (props) {
    super(props);
    this.state = {
      date: null,
      rowData: null,
      instances: null,
      instanceId: null,
      note: { note: '' },
      modalVisible: false,
      currentDate: moment(),
      dataSource: new ListView.DataSource({
        rowHasChanged (row1, row2) {
          return row1 !== row2;
        }
      }),
    };
    this.hideModal = this.hideModal.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.getRowData = this.getRowData.bind(this);
    this.renderScene = this.renderScene.bind(this);
    this.handleInstancePress = this.handleInstancePress.bind(this);
  }

  hideModal () {
    this.setState({ modalVisible: false });
  }

  getRowData () {
    let habitId = this.props.habit._id;
    fetch(`${process.env.SERVER}/habits/${this.props.profile.email}/${habitId}`, {
      method: 'GET',
      headers: {
        'Authorization':`Bearer ${this.props.token.idToken}`,
      },
    })
    .then(api.handleErrors)
    .then( response => response.json() )
    .then( responseData => {
      let period = getPeriodArray();
      let days = getDaysArray(period);
      days.forEach( day => {
        responseData.forEach( instance => {
          if (moment(day.ISOString).isSame(instance.createdAt, 'day')) {
            day.instanceId = instance._id;
            day.note = { note: instance.note };
            day.done = true;
          }
        });
      });
      days = calendarLabel().concat(days);
      this.setState({
        instances: responseData,
        dataSource: this.state.dataSource.cloneWithRows(days),
      });
      _habitInstances = responseData;
      _habit = this.props.habit;
    })
    .catch( err => console.warn(err) );
  }

  componentDidMount () {
    this.getRowData();
  }

  handleInstancePress (rowData) {
    this.setState({
      rowData: rowData,
      note: rowData.note,
      modalVisible: true,
      date: rowData.ISOString,
      instanceId: rowData.instanceId,
    });
  }

  renderRow (rowData, sectionID, rowID) {
    // Renders DAYS OF WEEK in the calendar
    if (rowData.calendarHeading) {
      return (
        <TouchableOpacity underlayColor="transparent">
          <View style={styles.weekRow}>
            <Text style={styles.calendarHeading}>
              {rowData.calendarHeading}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
    // renders PRESENT DAY, DONE with NOTE box
    if (moment(rowData.ISOString).isSame(this.state.currentDate, 'day') && rowData.done && rowData.note.note) {
      return (
        <TouchableOpacity
          underlayColor="transparent"
          onPress={ () => this.handleInstancePress(rowData) }
        >
          <View style={styles.presentDoneRow}>
            <Text style={styles.rowText}>
              {rowData.date}
            </Text>
            <Icon name='sticky-note-o' size={10} color="#000000" />
          </View>
        </TouchableOpacity>
      );
    }
    // renders PRESENT DAY, DONE box
    if (moment(rowData.ISOString).isSame(this.state.currentDate, 'day') && rowData.done) {
      return (
        <TouchableOpacity
          underlayColor="transparent"
          onPress={ () => this.handleInstancePress(rowData) }
        >
          <View style={styles.presentDoneRow}>
            <Text style={styles.rowText}>
              {rowData.date}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
    // renders PRESENT DAY, NOT-DONE box
    if (moment(rowData.ISOString).isSame(this.state.currentDate, 'day')) {
      return (
        <TouchableOpacity underlayColor="transparent">
          <View style={styles.presentNotDoneRow}>
            <Text style={styles.rowText}>
              {rowData.date}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
    // renders DONE with NOTE boxes
    if (rowData.done && rowData.note.note) {
      return (
        <TouchableOpacity
          underlayColor="transparent"
          onPress={ () => this.handleInstancePress(rowData) }
        >
          <View style={styles.doneRow}>
            <Text style={styles.rowText}>
              {rowData.date}
            </Text>
            <Icon
              size={10}
              color="#000000"
              name='sticky-note-o'
            />
          </View>
        </TouchableOpacity>
      );
    }
    // renders DONE boxes
    if (rowData.done) {
      return (
        <TouchableOpacity
          underlayColor="transparent"
          onPress={ () => this.handleInstancePress(rowData) }
        >
          <View style={styles.doneRow}>
            <Text style={styles.rowText}>
              {rowData.date}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
    // renders FUTURE DAYS boxes
    if (this.state.currentDate.diff(rowData.ISOString) < 0) {
      return (
        <TouchableOpacity underlayColor="transparent">
          <View style={styles.futureRow}>
            <Text style={styles.rowText}>
              {rowData.date}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
    // renders NOT DONE & NA boxes
    return (
      <TouchableOpacity underlayColor="transparent">
        <View style={styles.unavailRow}>
          <Text style={styles.rowText}>
            {rowData.date}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  render () {
    return (
      <View style={{ flex: 1 }}>
        <Navigator
          renderScene={this.renderScene}
          navigator={this.props.navigator}
          navigationBar={
            <Navigator.NavigationBar style={{backgroundColor: '#6399DC', alignItems: 'center'}}
              routeMapper={NavigationBarRouteMapper}
            />
          }
        />
      </View>
    );
  }

  renderScene (route, navigator) {
    return (
      <View style={styles.container}>
        <Text
          style={styles.heading}
          onPress={this.onPress}
        >
          { this.props.habit.action }
        </Text>
        <ListView
          pageSize={7}
          initialListSize={28}
          scrollEnabled={false}
          renderRow={this.renderRow}
          dataSource={this.state.dataSource}
          contentContainerStyle={styles.list}
          automaticallyAdjustContentInsets={false}
        />
        <View style={styles.count}>
          <Text style={styles.text}>
            Current Streak: {moment(new Date(this.props.habit.lastDone)).isSame(Date.now(), 'week') ? this.props.habit.streak.current : 0 }
          </Text>
          <Text style={styles.text}>
            Longest Streak: {this.props.habit.streak.max}
          </Text>
          <Text style={styles.text}>
            Total Completed: {this.props.habit.instanceCount}
          </Text>
        </View>
        <Note
          note={this.state.note}
          date={this.state.date}
          token={this.props.token}
          habit={this.props.habit}
          hideModal={this.hideModal}
          profile={this.props.profile}
          rowData={this.state.rowData}
          getRowData={this.getRowData}
          visible={this.state.modalVisible}
          instanceId={this.state.instanceId}
        >
        </Note>
      </View>
    );
  }
}

HabitDetails.PropTypes = {
  habit: PropTypes.object,
  token: PropTypes.object,
  profile: PropTypes.object,
  navigator: PropTypes.object,
};

export const NavigationBarRouteMapper = {
  LeftButton (route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
          onPress={ () => navigator.parentNavigator.pop() }>
        <Text style={{color: 'white', margin: 10}}>
          Back
        </Text>
      </TouchableOpacity>
    );
  },

  RightButton (route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
        onPress={ () => navigator.parentNavigator.push({id: 'InstanceHistory', instances: _habitInstances, habit: _habit}) }
      >
        <Text style={{color: 'white', margin: 10}}>
          History
        </Text>
      </TouchableOpacity>
    );
  },

  Title(route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{color: 'white', margin: 10, fontSize: 18}}>
          Habit Details
        </Text>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 0.90,
    paddingHorizontal: 5,
    justifyContent: 'center',
  },
  heading: {
    top: 80,
    alignSelf: 'center',
    fontSize: 34,
    fontFamily: 'Avenir',
  },
  list: {
    top: 90,
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarHeading: {
    fontFamily: 'Avenir',
    fontSize: 18,
    fontWeight: 'bold',
  },
  weekRow: {
    top: 4,
    justifyContent: 'center',
    padding: 1,
    margin: 1,
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  doneRow: {
    justifyContent: 'center',
    padding: 1,
    margin: 1,
    width: 50,
    height: 50,
    backgroundColor: '#419648',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC',
  },
  futureRow: {
    justifyContent: 'center',
    padding: 1,
    margin: 1,
    width: 50,
    height: 50,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC',
  },
  presentDoneRow: {
    justifyContent: 'center',
    padding: 1,
    margin: 1,
    width: 50,
    height: 50,
    backgroundColor: '#419648',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#000000',
  },
  presentNotDoneRow: {
    justifyContent: 'center',
    padding: 1,
    margin: 1,
    width: 50,
    height: 50,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#000000',
  },
  unavailRow: {
    justifyContent: 'center',
    padding: 1,
    margin: 1,
    width: 50,
    height: 50,
    backgroundColor: '#D0D1D0',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC',
  },
  count: {
    alignItems: 'center',
    bottom: 120,
  },
  rowText: {
    fontFamily: 'Avenir',
    fontSize: 15,
  },
  text: {
    fontSize: 20,
    fontFamily: 'Avenir',
    padding: 3,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
