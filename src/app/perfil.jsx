import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { getMatches } from '../context/servicios';

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
      {}
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

      {}
      <FlatList
        data={matches}
        keyExtractor={(item) => item.matchId}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={[styles.result, { color: item.win ? '#11BD93' : '#ff4d6d' }]}>
              {item.win ? 'VICTORIA' : 'DERROTA'}
            </Text>
            <Text style={styles.detail}>{item.champion}</Text>
            <Text style={styles.detail}>{item.kills}/{item.deaths}/{item.assists}</Text>
            <Text style={styles.detail}>{item.mode} : {item.duration} min</Text>
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
});
