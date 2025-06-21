import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
  ScrollView,
} from "react-native";

export default function EditarPerfil() {
  const router = useRouter();

  const { user } = useAuth();
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

      alert("Cambios guardados con exito");
      router.back();
    } catch (err) {
      console.error("Error alguardar:", err);
      alert("Hubo un error al guardar los cambios");
    }
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

      {Object.entries(usuario).map(([key, value]) => (
        <View key={key} style={styles.inputGroup}>
          <Text style={styles.label}>{key}</Text>

          {key === "id" ? (
            <Text style={styles.readOnlyText}>{value}</Text> // Solo se muestra, no se puede editar
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
});
