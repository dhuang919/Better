'use strict';
// React Native component
import React, {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
// external libraries and components
import moment from 'moment';
import Swipeout from 'react-native-swipeout';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Inbox (props) {
  let swipeButtons = [
    {
      text: 'Settings',
      color: '#000000',
      backgroundColor: "#eee",
      onPress () { props.editHabit(props.habit) },
    },
  ];
  let done = props.habit.lastDone && moment().isSame(props.habit.lastDone, 'day');
  return (
    <View style={styles.swipeContainer}>
      <Swipeout
        autoClose={true}
        right={swipeButtons}
        backgroundColor='transparent'
        scroll={event => props.allowScroll(event)}
      >
        <View style={styles.swipeContent}>
          <TouchableOpacity onPress={() => props.gotoDetails(props.habit)}>
            <View>
              <Text style={styles.habitText}>
                {props.habit.action}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={{flex: 1}}></View>
          <TouchableOpacity onPress={() => props.toggleInstance(props.habit._id)}>
            <Image
              source={done ? {uri: 'http://better-habits.herokuapp.com/assets/done_green.png'} : {uri: 'http://better-habits.herokuapp.com/assets/done_gray.png'}}
              style={styles.img}
            />
          </TouchableOpacity>
        </View>
      </Swipeout>
    </View>
  );
}

const styles = StyleSheet.create({
  habitText: {
    fontFamily: 'Avenir',
    fontSize: 20,
  },
  swipeContainer: {
    height: 60,
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    borderWidth: 0,
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOpacity: 0.6,
    shadowRadius: 4,
    shadowOffset: {
      height: 3.5,
      width: 2,
    },
  },
  swipeContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  img: {
    width: 30,
    height: 30,
  },
});
