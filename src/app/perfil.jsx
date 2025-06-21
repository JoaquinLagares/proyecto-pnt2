import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Button } from 'react-native';
import { getMatches } from '../context/servicios';
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router';

const router = useRouter();


export default function PerfilScreen() {
  const [summonerName, setSummonerName] = useState('');
  const [tagLine, setTagLine] = useState('');
  const [matches, setMatches] = useState([]);

  const handleBuscar = async () => {
    const data = await getMatches(summonerName, tagLine);
    setMatches(data);
  };

  return (
    <View style={styles.container}>
      {/* Ícono para ir a la vista de región */}
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.regionIcon} onPress={() => router.push('/region')}>
        <Ionicons  size={30} color="#11BD93" />
      </TouchableOpacity>
      </View>


      <TouchableOpacity message="buscar jugador" style={styles.regionIcon} onPress={() => router.push('/buscadorUsuarios')}>
        <Ionicons size={30} color="#11BD93" />
      </TouchableOpacity>

      {/* Buscador */}
      <TextInput
        style={styles.input}
        placeholder="Nombre de invocador"
        placeholderTextColor="#888"
        value={summonerName}
        onChangeText={setSummonerName}
      />
      <TextInput
        style={styles.input}
        placeholder="Tag (ej: LAS)"
        placeholderTextColor="#888"
        value={tagLine}
        onChangeText={setTagLine}
      />
      <TouchableOpacity style={styles.button} onPress={handleBuscar}>
        <Text style={styles.buttonText}>Buscar partidas</Text>
      </TouchableOpacity>

      {/* Lista de partidas */}
      <FlatList
        data={matches}
        keyExtractor={(item) => item.matchId}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={[styles.result, { color: item.win ? '#11BD93' : '#ff4d6d' }]}>
              {item.win ? 'VICTORIA' : 'DERROTA'}
            </Text>
            <Text style={styles.detail}>{item.champion}</Text>
            <Text style={styles.detail}>
              {item.kills}/{item.deaths}/{item.assists}
            </Text>
            <Text style={styles.detail}>
              {item.mode} : {item.duration} min
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0e0e11', padding: 16 },
  input: {
    backgroundColor: '#1a1f2e',
    color: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#11BD93',
  },
  button: {
    backgroundColor: '#11BD93',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: { color: '#0e0e11', fontWeight: 'bold' },
  card: {
    backgroundColor: '#1a1f2e',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  result: { fontWeight: 'bold', fontSize: 16 },
  detail: { color: '#ccc' },
 regionIcon: {
  position: 'absolute',
  bottom: 24,
  right: 24,
  backgroundColor: '#1a1f2e',
  padding: 12,
  borderRadius: 30,
  zIndex: 100, // Se asegura de estar por encima
  elevation: 5, // Android shadow
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 4,
},regionIcon: {
  position: 'absolute',
  bottom: 24,
  right: 24,
  backgroundColor: '#1a1f2e',
  padding: 12,
  borderRadius: 30,
  zIndex: 100, // Se asegura de estar por encima
  elevation: 5, // Android shadow
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 4,
},
buttonContainer: {
  flex: 1,
  backgroundColor: '#0e0e11',
  padding: 16,
  position: 'relative',
},



});
