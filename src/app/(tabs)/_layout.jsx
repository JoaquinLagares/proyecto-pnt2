import React from 'react'
import {Tabs} from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

export default function Tabslayout  () {
  return (
    <Tabs>
        <Tabs.Screen 
        name="index" 
        options={{
            
            title:"Home",
            tabBarIcon: ({color, size})=>(
                <Ionicons name='home-outline' color={color} size={size}></Ionicons>
            ),
                headerShown: false
        
            }}/>
            <Tabs.Screen 
        name="settings" 
        options={{
            title:"Settings",
            tabBarIcon: ({color, size})=>(
                <Ionicons name='settings-outline' color={color} size={size}></Ionicons>
            ),
                headerShown: false
        
            }}/>
      

    </Tabs>
  )
}
