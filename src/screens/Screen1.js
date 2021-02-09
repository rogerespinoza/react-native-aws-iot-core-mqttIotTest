import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'

export default (props) => {
  return (
    <View style={{...styles.container, backgroundColor: props.backgroundColor}}>
      <Text style={styles.text}>helloFriend</Text>
      <TouchableOpacity
        style={{...styles.button1, backgroundColor: '#a0d'}}
        onPress={() => props.fun1()}
      >
        <Text style={styles.textButton}>Send Ping</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{...styles.button1, backgroundColor: '#0df'}}
        onPress={() => props.fun2()}
      >
        <Text style={styles.textButton}>Send Ping</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#DDD'
  },
  text: {
    fontSize: 10
  },
  button1: {
    height: 60,
    width: '60%',
    borderRadius: 30,
    backgroundColor: '#a0d',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textButton: {
    fontSize: 15,
    color: '#eee'
  }
})