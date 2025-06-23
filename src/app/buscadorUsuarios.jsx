import React, { useEffect, useState } from 'react';
import { TextInput, FlatList, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useUser } from '../context/UserContext';

export default function BuscarUsuario() {
  const { usuarios, buscarUsuarios, loading } = useUser();
  const [query, setQuery] = useState('');
  const [debounceTimer, setDebounceTimer] = useState(null);

  useEffect(() => {
    if (debounceTimer) clearTimeout(debounceTimer);

    const timer = setTimeout(() => {
      buscarUsuarios(query);
    }, 1000);

    setDebounceTimer(timer);
  }, [query]);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Buscar jugador..."
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        placeholderTextColor="#aaa"
      />

      {loading ? (
        <ActivityIndicator size="large" color="#00f" />
      ) : (
        <FlatList
          data={usuarios}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>{item.username}</Text>
              <Text style={styles.text}>Región: {item.region}</Text>
              <Text style={styles.text}>
                Perfil Riot: {item.perfilRiot}#{item.tagLineRiot}
              </Text>
              <Text style={styles.text}>Steam: {item.steam}</Text>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.text}>No se encontraron usuarios.</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: '#121212' },
  input: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    borderColor: '#333',
    borderWidth: 1,
  },
  card: {
    backgroundColor: '#1e1e1e',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: '#333',
    borderWidth: 1,
  },
  name: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  text: { color: '#ccc' },
});

