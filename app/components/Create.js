'use strict';
import React, {
  Text,
  View,
  TextInput,
  PropTypes,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import Button from 'react-native-button';

function Create (props) {
  return (
    <View style={styles.container}>
      <TextField
        title='What do you want to do?'
        onChange={ (text) => props.fields.action = text }
        defaultValue={props.fields.action}
      />
      <SubmitButton onClick={props.handleClick} />
      <View style={styles.tips}>
        <Text style={styles.tipheader}>Try to start small:</Text>
        <Text style={styles.tiptext}>* Floss one tooth</Text>
        <Text style={styles.tiptext}>* Walk for five minutes</Text>
        <Text style={styles.tiptext}>* Do one pushup</Text>
      </View>
    </View>
  );
}

// Sub-component of Create
function TextField (props) {
  return (
    <View>
      <Text style={styles.welcome}>
        {props.title}
      </Text>
      <TextInput
        style={styles.textInput}
        onChangeText={props.onChange}
        defaultValue={props.defaultValue}
        placeholder={'Create your new habit!'}
        autoFocus={true}
      />
    </View>
  );
}

// Sub-component of Create
function SubmitButton (props) {
  return (
    <Button
      containerStyle={styles.buttonContainer}
      style={styles.buttonText}
      styleDisabled={{color: 'red'}}
      onPress={props.onClick}
    >
      Create Habit
    </Button>
  );
}

Create.PropTypes = {
  fields: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired
};

TextField.PropTypes = {
  title: PropTypes.string.isRequired,
  onChangeInputText: PropTypes.func.isRequired
};

SubmitButton.PropTypes = {
  onClick: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 0.90,
    justifyContent: 'center',
    backgroundColor: '#EDBE40',
    paddingHorizontal: 20,
  },
  radio: {
    width: 325,
    marginTop: 18,
    marginBottom: 15,
    alignSelf: 'center',
  },
  welcome: {
    fontSize: 27,
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    color: '#FFFFFF',
  },
  textInput: {
    padding:10,
    height:45,
    overflow:'hidden',
    borderRadius:4,
    backgroundColor: 'white',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    fontFamily: 'Avenir',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Avenir',
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
  tips: {
    alignSelf: 'center',
    width: 250,
    marginTop: 40,
  },
  tipheader: {
    color: '#ffffff',
    fontSize: 27,
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  tiptext: {
    color: '#ffffff',
    fontFamily: 'Avenir',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'left',
  }
});

module.exports = { Create };
