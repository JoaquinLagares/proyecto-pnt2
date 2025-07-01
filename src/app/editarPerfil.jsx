import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import * as ImagePicker from 'expo-image-picker';
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
  ScrollView,
  Alert,
  Image
} from "react-native";

export default function EditarPerfil() {
  const router = useRouter();
  const { user, logout, setUser } = useAuth();
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const res = await fetch(
          `https://683fa1935b39a8039a552628.mockapi.io/api/v1/users/${user?.id}`
        );
        const data = await res.json();
        setUsuario(data);
      } catch (err) {
        console.error("Error al obtener usuario:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsuario();
  }, []);

  const tomarFoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Se necesita permiso para usar la cámara');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setUsuario({ ...usuario, avatar: result.assets[0].uri });
    }
  };

  const handleChange = (field, value) => {
    setUsuario({ ...usuario, [field]: value });
  };

  const handleGuardar = async () => {
    try {
      const res = await fetch(
        `https://683fa1935b39a8039a552628.mockapi.io/api/v1/users/${user?.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(usuario),
        }
      );

      if (!res.ok) throw new Error("Error al guardar los cambios");

      const dataActualizada = await res.json();
      setUsuario(dataActualizada);
      setUser(dataActualizada);

      alert("Cambios guardados con éxito");
      router.back();
    } catch (err) {
      console.error("Error al guardar:", err);
      alert("Hubo un error al guardar los cambios");
    }
  };

  const handleEliminar = () => {
    Alert.alert(
      "¿Eliminar cuenta?",
      "Esta acción no se puede deshacer. ¿Querés continuar?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sí, eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              const res = await fetch(
                `https://683fa1935b39a8039a552628.mockapi.io/api/v1/users/${user?.id}`,
                { method: "DELETE" }
              );
              if (!res.ok) throw new Error("Fallo al eliminar la cuenta");

              alert("Tu cuenta fue eliminada correctamente.");
              await logout();
              router.replace("/login");
            } catch (err) {
              console.error("Error al eliminar cuenta:", err);
              alert("No se pudo eliminar la cuenta. Intenta más tarde.");
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#11BD93" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar Perfil</Text>

      <TouchableOpacity onPress={tomarFoto} style={{ alignSelf: "center", marginBottom: 10 }}>
        {usuario.avatar ? (
          <Image
            source={{ uri: usuario.avatar }}
            style={{
              width: 150,
              height: 150,
              borderRadius: 75,
              borderWidth: 2,
              borderColor: "#11BD93"
            }}
          />
        ) : (
          <View style={{
            width: 150,
            height: 150,
            backgroundColor: "#444",
            borderRadius: 75,
            justifyContent: "center",
            alignItems: "center"
          }}>
            <Text style={{ color: "#fff" }}>Agregar Foto</Text>
          </View>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={tomarFoto} style={styles.editPhotoButton}>
        <Text style={styles.editPhotoText}>Editar Foto</Text>
      </TouchableOpacity>

      {Object.entries(usuario).map(([key, value]) => (
        <View key={key} style={styles.inputGroup}>
          <Text style={styles.label}>{key}</Text>

          {key === "id" ? (
            <Text style={styles.readOnlyText}>{value}</Text>
          ) : (
            <TextInput
              style={styles.input}
              value={String(value)}
              onChangeText={(text) => handleChange(key, text)}
              secureTextEntry={key === "password"}
              autoCapitalize="none"
            />
          )}
        </View>
      ))}

      <TouchableOpacity style={styles.button} onPress={handleGuardar}>
        <Text style={styles.buttonText}>Guardar cambios</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={handleEliminar}>
        <Text style={styles.deleteButtonText}>Eliminar cuenta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#0e0e11",
  },
  container: {
    backgroundColor: "#0e0e11",
    padding: 20,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    color: "#11BD93",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    color: "#ccc",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#1a1f2e",
    color: "#fff",
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: "#11BD93",
  },
  button: {
    backgroundColor: "#11BD93",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 30,
  },
  buttonText: {
    color: "#0e0e11",
    fontWeight: "bold",
    fontSize: 16,
  },
  readOnlyText: {
    color: "#888",
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: "#1a1f2e",
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: "#ff4444",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  editPhotoButton: {
    alignSelf: "center",
    marginBottom: 20,
  },
  editPhotoText: {
    color: "#11BD93",
    fontSize: 16,
    fontWeight: "bold",
  },
});
