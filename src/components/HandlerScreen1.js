import React, {useState, useEffect} from 'react'
import { View, Text } from 'react-native'
import Screen1 from '../screens/Screen1'
// import Amplify from 'aws-amplify'
import Amplify from 'aws-amplify';
import { AWSIoTProvider } from '@aws-amplify/pubsub/lib/Providers';
import awsmobile from '../../aws-export'

Amplify.configure(awsmobile);
// Amplify.configure({
//   Auth: {
//     identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
//     region: process.env.REACT_APP_REGION,
//     userPoolId: process.env.REACT_APP_USER_POOL_ID,
//     userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID
//   }
// });

Amplify.addPluggable(new AWSIoTProvider({
  aws_pubsub_region: '< region >',
  aws_pubsub_endpoint: `< endpoint >`,
}));


// Amplify.PubSub.subscribe('amplifyTest/').subscribe({
//   next: data => 
//     {
//       console.log('Message received:')
//       console.log(data.value);
//     },
//   error: error => console.error(error),
//   close: () => console.log('Done'),
// });



export default () => {
  const [color1, setColor1] = useState('#DDD');


  Amplify.PubSub.subscribe('$aws/things/testIot1/shadow/get/accepted').subscribe({
    next: data => 
      {
        console.log('Message received:')
        console.log(data.value.state.reported.color1);
        setColor1(data.value.state.reported.color1);
      },
    error: error => console.error(error),
    close: () => console.log('Done'),
  });

  Amplify.PubSub.subscribe('$aws/things/testIot1/shadow/update/documents').subscribe({
    next: data => 
      {
        console.log('Message received:')
        console.log(data.value.current.state.reported.color1);
        setColor1(data.value.current.state.reported.color1);
      },
    error: error => console.error(error),
    close: () => console.log('Done'),
  });
  
  // Amplify.PubSub.subscribe('$aws/things/testIot1/shadow/get/rejected').subscribe({
  //   next: data => 
  //     {
  //       console.log('Message received:')
  //       console.log(data.value);
  //     },
  //   error: error => console.error(error),
  //   close: () => console.log('Done'),
  // });
  
  useEffect(() => {
    funSend();
    console.log('Change')
  }, [])

  const funSend = async () => {
    await Amplify.PubSub.publish('$aws/things/testIot1/shadow/get','{}');
    // await Amplify.PubSub.publish('inTopic', { msg: 'Hello to all subscribers!' });
  }
  const funColor1 = async () => {
    await Amplify.PubSub.publish('$aws/things/testIot1/shadow/update', {
      "state":{
        "desired": {
          "welcome": "aws-io"
        },
        "reported": {
          "welcome": "aws-iot",
          "color1": "#0F0"
        }
      }
    });
  }
  const funColor2 = async () => {
    await Amplify.PubSub.publish('$aws/things/testIot1/shadow/update', {
      "state":{
        "desired": {
          "welcome": "aws-io"
        },
        "reported": {
          "welcome": "aws-iot",
          "color1": "#50F"
        }
      }
    });
  }


  return (
    <Screen1 
      // fun1 = {() => alert( 'helloFriend')}

      fun1 = {() => funColor1()}
      fun2 = {() => funColor2()}
      backgroundColor={color1}
    />
  )
}
