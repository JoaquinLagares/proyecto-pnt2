
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useAuth } from '../context/AuthContext';  

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Iniciar sesión</Text>

        <TextInput
          style={styles.input}
          placeholder="Ingresa tu usuario"
          placeholderTextColor="#999"
          value={username}
          onChangeText={setUsername}
        />
        {/* <TextInput
          style={styles.input}
          placeholder="Ingresa tu email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
        /> */}

        <TextInput
          style={styles.input}
          placeholder="Ingresa tu contraseña"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={() => login(username,password)}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121417', // un poco más claro que el original, oscuro pero no negro total
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#252a38', // azul oscuro apagado, estilo panel gamer
    borderRadius: 20,
    padding: 30,
    shadowColor: '#0ff', // sombra neón cyan
    shadowOpacity: 0.7,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 15,
    elevation: 15,
    borderWidth: 1,
    borderColor: '#0ff', // borde neón cyan para el estilo gamer
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#0ff', // texto neón cyan
    marginBottom: 30,
    textAlign: 'center',
    textShadowColor: '#00f', // sombra azul para dar brillo
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  input: {
    backgroundColor: '#1c2233', // fondo input azul oscuro
    padding: 14,
    borderRadius: 12,
    color: '#0ff', // texto neón cyan
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#0ff', // borde neón cyan para input
  },
  button: {
    backgroundColor: '#00f0ff', // botón neón cyan vibrante
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#00f0ff',
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 12,
  },
  buttonText: {
    color: '#121417', // texto oscuro para contraste en botón claro
    fontSize: 16,
    fontWeight: '700',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
