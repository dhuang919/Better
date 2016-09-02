'use strict';
// React Native components
import React, {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default function Loading (props) {
  return(
    <View style={styles.container}>
      <Text style={styles.text}>BETTER.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EDBE40',
  },
  text: {
    fontSize: 60,
    fontWeight: '800',
    alignItems: 'center',
    color: '#FFFFFF',
  }
});
