import React from 'react'
import { Text,View,Button} from 'react-native'
import { Link } from 'expo-router'; 

export default function Home() {
  return (
    <View>
        <Text> Pagina principal</Text>
        <Link href={'/(tabs)'} asChild> 
          <Button title= 'Ir a tabs'>a
          </Button> 
        </Link>
    </View>
  )
}

