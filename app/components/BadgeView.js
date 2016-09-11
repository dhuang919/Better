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
  ScrollView,
} from 'react-native';
// Custom components and methods
import api from '../lib/api';
import badges from '../lib/badges';

export default class BadgeView extends Component {
  constructor (props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged (row1, row2) {
          return row1 !== row2;
        },
      }),
    };
    this.renderRow = this.renderRow.bind(this);
    this.renderScene = this.renderScene.bind(this);
  }

  componentDidMount () {
    let allBadges = [];
    for(let key in badges) {
      allBadges.push({name: key, uri: badges[key].uri, earned: false});
    }

    allBadges.forEach(badge => {
      this.props.earnedBadges.forEach(userBadge => {
        if (userBadge.hasOwnProperty(badge.name)) {
          badge.earned = true;
        }
      });
    });

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(allBadges)
    });
  }

  renderRow (rowData, sectionID, rowID) {
    if (rowData.earned) {
      return (
        <View>
          <TouchableOpacity underlayColor="transparent">
            <View style={styles.row}>
              <Image
                style={styles.badges}
                source={{uri: rowData.uri}}
              />
              <Text style={styles.names}>
                {rowData.name}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View>
        <TouchableOpacity underlayColor="transparent">
        <View style={styles.row}>
        <Image
          style={styles.unearnedBadges}
          source={{uri: rowData.uri}}
        />
        <Text style={styles.names}>
        {rowData.name}
        </Text>
        </View>
        </TouchableOpacity>
        </View>
      );
    }
  }

  render () {
    return (
      <Navigator
        renderScene={this.renderScene}
        navigator={this.props.navigator}
        navigationBar={
          <Navigator.NavigationBar style={{backgroundColor: '#6399DC', alignItems: 'center'}}
            routeMapper={NavigationBarRouteMapper}
          />
        }
      />
    );
  }

  renderScene (route, navigator) {
    return (
      <View style={styles.container}>
        <ListView
          pageSize={3}
          initialListSize={21}
          renderRow={this.renderRow}
          dataSource={this.state.dataSource}
          contentContainerStyle={styles.list}
        />
      </View>
    );
  }
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
    return null;
  },

  Title (route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{color: 'white', margin: 10, fontSize: 18}}>
          All Badges
        </Text>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 0.90,
    justifyContent: 'center',
    marginBottom: 50,
  },
  list: {
    top: 90,
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  row: {
    top: 4,
    justifyContent: 'center',
    padding: 1,
    margin: 1,
    width: 100,
    height: 125,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  badges: {
    height: 75,
    width: 75,
  },
  unearnedBadges: {
    height: 75,
    width: 75,
    opacity: 0.3,
  },
  names: {
    width: 120,
    textAlign: 'center',
  },
});
