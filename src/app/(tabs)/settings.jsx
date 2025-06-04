import React from 'react'
import { Text,View,Button} from 'react-native'
import { useAuth } from '../../context/AuthContext';

export default function settings() {
  
  const {logout} = useAuth();

  return (
    <View style= {{flex:1, justifyContent: 'center', alignItems:'center'}}>
      <Text>Settings</Text>
      <Button title = 'Log out' onPress={logout}/>
    </View>
  )
}

