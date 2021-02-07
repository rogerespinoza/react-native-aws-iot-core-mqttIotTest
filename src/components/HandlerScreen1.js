import React from 'react'
import { View, Text } from 'react-native'
import Screen1 from '../screens/Screen1'
// import Amplify from 'aws-amplify'

export default () => {

  return (
    <Screen1 
      fun1 = {() => alert( 'helloFriend')}
    />
  )
}
