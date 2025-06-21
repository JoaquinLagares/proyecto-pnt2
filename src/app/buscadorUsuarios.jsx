import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useUser } from '../context/UserContext';

export default function buscadorUsuarios() {

  const [texto, setTexto] = useState('');
  const {buscarUsuarios} = useUser();

  const handleInput = (texto) =>{
    setTexto(texto);
    buscarUsuarios(texto)
  }
  return (
   <View>
      <TextInput
        placeholder='Escriba el usuario'
        onChangeText={setTexto}
      />

      <TouchableOpacity onPress={() => handleInput(texto)}>
        <Text>Buscar Usuarios</Text>
      </TouchableOpacity>


   </View>
  )
}
