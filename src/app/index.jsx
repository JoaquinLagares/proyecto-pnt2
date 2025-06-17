
import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity,Button } from 'react-native';
import { Link } from 'expo-router';
import lolIcon from '../assets/lol.png';




export default function PerfilGamer() {


  return (
    <View>
        <Text> Pagina principal</Text>

        
        <Link href={'/perfil'} asChild> 
          <Button title= 'Ir a tabs'>
          </Button> 
        </Link>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e0e11',
    padding: 20,
  },
  profile: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#11BD93',
    borderWidth: 2,
  },
  username: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 10,
  },
  region: {
    color: '#aaa',
    marginVertical: 5,
  },
  button: {
    backgroundColor: '#11BD93',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#0e0e11',
    fontWeight: 'bold',
  },
  matchesContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    color: '#11BD93',
    marginBottom: 10,
  },
  matchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1f2e',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  result: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  victory: {
    color: '#00FF88',
  },
  defeat: {
    color: '#FF4081',
  },
  modo: {
    color: '#aaa',
    fontSize: 14,
  },
  score: {
    color: '#fff',
    fontSize: 14,
  },
  tiempo: {
    color: '#666',
    fontSize: 12,
  },
});
