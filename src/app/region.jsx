
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'expo-router';

const regions = ['Indefinida' ,'América', 'Europa', 'Asia', 'Oceanía'];

export default function RegionSelectScreen() {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const { user, updateUserRegion } = useAuth();
  const router = useRouter();

  const handleSelect = async () => {
    if (!selectedRegion || !user) return;

    await updateUserRegion(user.id, selectedRegion);
    router.push(`/`); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona tu región</Text>
      {regions.map((region) => (
        <TouchableOpacity
          key={region}
          style={[
            styles.regionButton,
            selectedRegion === region && styles.selectedRegion,
          ]}
          onPress={() => setSelectedRegion(region)}
        >
          <Text style={styles.regionText}>{region}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={[styles.confirmButton, !selectedRegion && styles.disabled]}
        onPress={handleSelect }
        disabled={!selectedRegion}   

      > 
        <Text style={styles.confirmText}>Confirmar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e0e11',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    color: '#11BD93',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 30,
  },
  regionButton: {
    padding: 15,
    backgroundColor: '#1a1f2e',
    borderColor: '#11BD93',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
  },
  selectedRegion: {
    backgroundColor: '#11BD93',
  },
  regionText: {
    color: '#0ff',
    textAlign: 'center',
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: '#11BD93',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  disabled: {
    opacity: 0.5,
  },
  confirmText: {
    color: '#0e0e11',
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
