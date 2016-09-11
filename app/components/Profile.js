'use strict';
// React Native components
import React, {
  Component,
  View,
  Text,
  Image,
  ListView,
  Navigator,
  PropTypes,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
// Custom components and methods
import api from '../lib/api';
// External libraries and components
import Button from 'react-native-button';
import ProgressBar from 'react-native-progress-bar';

export default class Profile extends Component {
  constructor (props) {
    super(props);
    this.state = {
      habits: null,
      badgeURIs: [],
      progress: null,
      nextGoalName: null,
      nextGoalCount: null,
      user: this.props.user,
      currentStreakHabit: null,
      currentStreakCount: null,
      photo: this.props.profile.picture,
      userName: this.props.user.userName,
      dataSource: new ListView.DataSource({
        rowHasChanged (row1, row2) {
          return row1 !== row2;
        }
      }),
    };
    this.renderRow = this.renderRow.bind(this);
    this.goToBadges = this.goToBadges.bind(this);
    this.renderScene = this.renderScene.bind(this);
    this.parseUserData = this.parseUserData.bind(this);
    this.refreshUserData = this.refreshUserData.bind(this);
    this.calculateProgress = this.calculateProgress.bind(this);
  }
  // invoking refreshUserData in both componentDidMount
  // and componentWillReceiveProps ensures user data is
  // current each time the profile page is accessed
  componentDidMount () {
    this.refreshUserData();
  }

  componentWillReceiveProps () {
    this.refreshUserData();
  }

  refreshUserData () {
    fetch(`${process.env.SERVER}/user/${this.props.user.email}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.props.token.idToken}`
      }
    })
    .then(api.handleErrors)
    .then( (response) => response.json() )
    .then(this.parseUserData)
    .catch( (err) => console.warn(err) );
  }

  parseUserData (newData) {
    // user will be set as state in order to
    // populate the avatar portion of the view
    let user = newData.user;

    // User's habits are required to determine the best current
    // streak which is used in the progress bar portion of the view
    let habits = newData.habits;

    // user.badges contains all badges the user has earned and
    // will be iterated through to extract each badge's URI for
    // rendering in the 'Recently Earned Badges' section
    let badges = user.badges;
    let badgeURIs = [];

    // earned will determine how many 'streak' badges the user
    // has earned which will help determine what the next badge is
    let earned = 0;

    // At the moment, only three non-streak badges exist
    const nonStreakBadges = {
      'First Step': true,
      'Better Already': true,
      'Top of the World': true,
    };

    badges.forEach((badge, i) => {
      // Since each object in the badges array consists of a single
      // key-value pair, we can extract the badge name this way
      let badgeTitle = Object.keys(badge)[0];

      // Conditional to ensure only the three most recent
      // badges are collected and rendered. The way earned badges
      // are stored in an array in the back-end ensures chronological order
      if (i >= badges.length - 3) {
        badgeURIs.push({ name: badgeTitle, uri: badge[badgeTitle] });
      }
      if (!nonStreakBadges.hasOwnProperty(badgeTitle)) {
        earned++;
      }
    });

    // calculateProgress returns an object including the user's
    // best current streak, the streak's habit name and the next
    // attainable streak badge
    let current = this.calculateProgress(earned, habits);

    this.setState({
      user: user,
      habits: habits,
      badgeURIs: badgeURIs,
      nextGoalCount: current.goal,
      nextGoalName: current.goalName,
      currentStreakCount: current.progress.count,
      currentStreakHabit: current.progress.habit,
      progress: current.progress.count/current.goal,
      dataSource: this.state.dataSource.cloneWithRows(badgeURIs),
    });
  }

  calculateProgress (earnedStreaks, userHabits) {
    let goal;
    let goalName;

    // Reduces array of userHabits to an object containing
    // the habit with the longest current streak
    let progress = userHabits.reduce((acc, cur) => {
      if (cur.streak.current > acc.count) {
        acc.count = cur.streak.current;
        acc.habit = cur.action;
      }
      return acc;
    }, {count: 0});

    // At the moment, the conditionals below are hard coding
    // the next badge name based on the user's current streak count
    switch (earnedStreaks) {
      case 3:
        goal = 20;
        goalName = 'Soaring';
        break;
      case 2:
        goal = 15;
        goalName = 'On Point';
        break;
      case 1:
        goal = 10;
        goalName = 'On a Roll';
        break;
      case 0:
        goal = 5;
        goalName = 'Gone Streaking';
        break;
    }

    return {
      goal: goal,
      progress: progress,
      goalName: goalName,
    };
  }

  goToBadges () {
    // earnedBadges is passed to the BadgeView component so
    // earned and unearned badges can be differentiated
    this.props.navigator.push({
      id: 'Badges',
      earnedBadges: this.state.user.badges,
    });
  }

  renderRow (badges) {
    return (
      <View>
        <Image
          style={styles.badges}
          source={{uri: badges.uri}}
        />
        <Text style={styles.badgeTitle}>
          {badges.name}
        </Text>
      </View>
    );
  }

  render () {
    return (
      <Navigator
        renderScene={this.renderScene}
        navigator={this.props.navigator}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={NavigationBarRouteMapper}
            style={{backgroundColor: '#6399DC', alignItems: 'center'}}
          />
        }
      />
    );
  }

  renderScene () {
    return (
      <View>
        <View style={styles.avatar}>
          <Image
            style={styles.avatarPhoto}
            source={{uri: this.state.photo}}
          />
          <Text style={styles.userName}>
            {this.state.userName}
          </Text>
        </View>
        <View style={styles.recentContainer}>
          <Text style={styles.recentBadgesHeader}>
            Recently Earned Badges
          </Text>
          <ListView
            scrollEnabled={false}
            renderRow={this.renderRow}
            dataSource={this.state.dataSource}
            automaticallyAdjustContentInsets={false}
            contentContainerStyle={styles.recentBadges}
          />
        </View>
        <View style={styles.streaks}>
          <Text style={styles.progressHeader}>
            {this.state.currentStreakHabit || 'Don\'t forget your habits!'}
          </Text>
          <Text style={{fontFamily: 'Avenir'}}>
            Current streak: {this.state.currentStreakCount}
          </Text>
          <ProgressBar
            progress={this.state.progress}
            fillStyle={styles.progressFill}
            backgroundStyle={styles.progress}
            style={{marginVertical: 10, width: 300, height: 15}}
          />
        <Text style={{fontFamily: 'Avenir'}}>
          <Text style={{fontWeight: 'bold'}}>{this.state.nextGoalName} </Text>
          <Text>badge in {this.state.nextGoalCount - this.state.currentStreakCount} more completions</Text>
        </Text>
        </View>
        <View style={styles.container}>
          <Button
            onPress={this.goToBadges}
            style={styles.badgeViewText}
            containerStyle={styles.badgeViewContainer}
          >
            View All Badges
          </Button>
          <Button
            style={styles.logoutText}
            onPress={this.props.handleLogout}
            containerStyle={styles.logoutContainer}
          >
            Logout
          </Button>
        </View>
      </View>
    );
  }
}

Profile.PropTypes = {
  user: PropTypes.object,
  token: PropTypes.object,
  profile: PropTypes.object,
  navigator: PropTypes.object,
  handleLogout: PropTypes.func,
};

export const NavigationBarRouteMapper = {
  LeftButton (route, navigator, index, navState) {
    return null;
  },

  RightButton (route, navigator, index, navState) {
    return null;
  },

  Title (route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{color: 'white', margin: 10, fontSize: 18}}>
          Profile
        </Text>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  avatar: {
    top: 65,
    paddingTop: 25,
    paddingBottom: 15,
    marginBottom: 20,
    backgroundColor: '#eee',
  },
  avatarPhoto: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    backgroundColor: '#EEE',
    borderRadius: 20,
    borderColor: '#FFF',
    borderWidth: 1,
    marginBottom: 10,
  },
  recentContainer: {
    marginBottom: 10,
  },
  recentBadgesHeader: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Avenir',
    marginTop: 55,
    marginBottom: 10,
  },
  recentBadges: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 90,
  },
  progressHeader: {
    textAlign: 'center',
    fontSize: 22,
    fontFamily: 'Avenir',
  },
  userName: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'Avenir',
  },
  progressFill: {
    backgroundColor: '#6399DC',
    height: 15,
  },
  progress: {
    backgroundColor: '#aaa',
    borderRadius: 7,
  },
  badges: {
    height: 70,
    width: 70,
    marginHorizontal: 14,
  },
  streaks: {
    alignItems: 'center',
  },
  badgeViewContainer: {
    height: 45,
    padding: 10,
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: '#6399DC',
    marginTop: 15,
  },
  badgeViewText: {
    fontSize: 20,
    fontFamily: 'Avenir',
    color: '#fff',
  },
  badgeTitle: {
    fontSize: 12,
    fontFamily: 'Avenir',
    alignSelf: 'center',
  },
  logoutContainer: {
    height: 45,
    padding: 10,
    overflow: 'hidden',
    marginTop: 12,
  },
  logoutText: {
    fontSize: 20,
    fontFamily: 'Avenir',
    color: '#e14f3f',
  },
});
