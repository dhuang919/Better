'use strict';
import React, {
  Text,
  View,
  StyleSheet,
  Image,
} from 'react-native';
import Button from 'react-native-button';

const Welcome = React.createClass({
  onPressButton () {
    this.props.navigator.push({
      id: 'AddHabit',
      onboard: true
    });
  },

  render () {
    return (
      <View style={styles.wContainer}>
        <Text style={styles.welcome}>
          Ready to be Better?
        </Text>
        <Text style={styles.wInstructions}>
          Create your first habit!
        </Text>
        <Button
          containerStyle={styles.buttonContainer}
          style={styles.buttonText}
          styleDisabled={{color: 'red'}}
          onPress={this.onPressButton}
        >
          Get Started
        </Button>
      </View>
    );
  }
});

function PageOne (props) {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Welcome to Better.
      </Text>
      <Image style={styles.img1} source={{uri: 'http://better-habits.herokuapp.com/assets/odometer.png'}}/>
      <Text style={styles.instructions}>
        Our mission is to help you achieve your goals by building positive daily habits.
      </Text>
    </View>
  );
}

function PageTwo (props) {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Start Small
      </Text>
      <Image style={styles.img2} source={{uri: 'http://better-habits.herokuapp.com/assets/bars.png'}}/>
      <Text style={styles.instructions}>
        Pick a habit that will get you closer to your goal, but will be easy to accomplish every day. We will move up together from there.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EDBE40',
  },
  wContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: '#EDBE40',
  },
  welcome: {
    fontFamily: 'Avenir',
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    color: '#FFF',
  },
  instructions: {
    fontFamily: 'Avenir',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    color: '#FFF',
    padding: 25,
  },
  wInstructions: {
    fontFamily: 'Avenir',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    color: '#FFF',
  },
  img1: {
    width: 83,
    height: 50,
    marginTop: 20,
  },
  img2: {
    width: 64,
    height: 64,
    marginTop: 20,
  },
  buttonText: {
    fontFamily: 'Avenir',
    fontSize: 20,
    color: 'white',
  },
  buttonContainer: {
    padding: 10,
    height: 45,
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: '#6399DC',
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
  },
});

module.exports = { Welcome, PageOne, PageTwo };
