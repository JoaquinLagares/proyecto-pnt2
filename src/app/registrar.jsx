import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { Link, useRouter } from 'expo-router'
import ImagePickerComponent from '../components/ImagePickerComponent';


export default function RegisterScreen() {
    const { register } = useAuth();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [imagenUri, setImagenUri] = useState(null);
    //const [confirmRegion, setConfirmRegion] = useState('')
    const router = useRouter();

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS ==='ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.card}>
                <Text style={styles.title}>Registrar Cuenta</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Ingresa tu usuario"
                    placeholderTextColor="#999"
                    value={username}
                    onChangeText={setUsername}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Ingresa tu email"
                    placeholderTextColor="#999"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Ingresa tu contraseña"
                    placeholderTextColor="#999"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirma tu contraseña"
                    placeholderTextColor="#999"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
            
                <View style={styles.buttonGroup}>
                    <TouchableOpacity style={styles.button} onPress={() => register(username, email, password, confirmPassword,() => router.push('/region'))}>
                        <Text style={styles.buttonText}>Registrar</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonGroup}>
                    <TouchableOpacity style={styles.button} onPress={() => router.push('/login')}>
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1f2e', 
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#1a1f2e',
    borderRadius: 20,
    padding: 30,
    shadowColor: '#0ff',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 20,
    elevation: 12,
    borderWidth: 1,
    borderColor: '#11BD93',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#11BD93',
    marginBottom: 30,
    textAlign: 'center',
    textShadowColor: '#11BD93',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
    letterSpacing: 1.2,
  },
  input: {
    backgroundColor: '#11BD93',
    padding: 14,
    borderRadius: 10,
    color: '#0ff',
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#0ff',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#11BD93',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginHorizontal: 5, // espaciado entre botones
    shadowColor: '#11BD93',
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 10,
},
  buttonText: {
    color: '#0e0e11',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
});