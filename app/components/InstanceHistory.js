'use strict';
// React Native components
import React, {
  Component,
  View,
  Text,
  StyleSheet,
  Navigator,
  TouchableOpacity,
  ListView,
  Image,
} from 'react-native';
// external libraries and components
import moment from 'moment';
import api from '../lib/api';
// custom components and methods
import { getInstancePeriod } from '../lib/calendar';

export default class InstanceHistory extends Component {
  constructor (props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: function (row1, row2) {
          return row1 !== row2;
        },
      }),
    };
    this.renderRow = this.renderRow.bind(this);
    this.renderScene = this.renderScene.bind(this);
  }

  componentDidMount () {
    var days = getInstancePeriod(this.props.habit.createdAt, moment().format());
    days.forEach(function(day) {
      this.props.instances.forEach(function (instance) {
        if (moment(day.ISOString).isSame(instance.createdAt, 'day')) {
          day.note = instance.note;
          day.done = true;
        }
      });
    }.bind(this));
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(days)
    })
  }

  renderRow (rowData, sectionID, rowID) {
    if (rowData.done) {
      return (
        <View style={styles.row} >
          <Text style={styles.date} >{ moment(rowData.ISOString).format('MMMM Do YYYY') }</Text>
          <Image
            source={{uri: 'http://better-habits.herokuapp.com/assets/done_green.png'}}
            style={styles.img}
          />
        </View>
      );
    }
    return (
      <View style={styles.row}>
        <Text style={styles.date}>
          {moment(rowData.ISOString).format('MMMM Do YYYY')}
        </Text>
          <Image
            source={ {uri: 'http://better-habits.herokuapp.com/assets/done_gray.png'} }
            style={ styles.img }
          />
      </View>
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
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          renderHeader={ function () { return (<View><Text style={styles.header}>{this.props.habit.action}</Text></View>)}.bind(this)}
        />
      </View>
    );
  }
}

const NavigationBarRouteMapper = {
  LeftButton (route, navigator, index, navState) {
    return (
      <TouchableOpacity
        style={{flex: 1, justifyContent: 'center'}}
        onPress={function () {navigator.parentNavigator.pop()}}
      >
        <Text style={{color: 'white', margin: 10}}>
          Back
        </Text>
      </TouchableOpacity>
    );
  },

  RightButton (route, navigator, index, navState) {
    return null;
  },

  Title (route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{color: 'white', margin: 10, fontSize: 18}}>
          History
        </Text>
      </TouchableOpacity>
    );
  }
};


const styles = StyleSheet.create({
  container: {
    flex: 0.90,
    justifyContent: 'center',
    marginTop: 54,
    paddingTop: 10,
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#CCCCCC',
    backgroundColor: '#F6F6F6',
  },
  header: {
    padding: 10,
    margin: 5,
    fontSize: 34,
    fontFamily: 'Avenir',
    textAlign: 'center',
  },
  date: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 18,
    fontFamily: 'Avenir',
  },
  img: {
    position: 'absolute',
    width: 26,
    height: 26,
    right: 20,
    top: 16,
  }
});
