import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Button,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { getMatches } from "../context/servicios";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuth } from "../context/AuthContext";
import BottomNavBar from "../components/BottomNavBar";

export default function PerfilScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [partidas, setPartidas] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarPartidas = async () => {
      if (user?.perfilRiot && user?.tagLineRiot) {
        const resultados = await getMatches(user.perfilRiot, user.tagLineRiot);
        setPartidas(resultados);
        console.log("Buscando partidas");
      }
      setLoading(false);
    };

    cargarPartidas();
  }, [user]);

  if (!user) {
    console.log("No cargo user", user);
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0e0e11",
        }}
      >
        <Text style={{ color: "white" }}>Cargando perfil...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Ionicons name="log-out-outline" size={20} color="white" />
          </TouchableOpacity>
          <View style={{ flex: 1 }} />
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => router.push("/editarPerfil")}
          >
            <Text style={styles.editButtonText}>Editar</Text>
          </TouchableOpacity>
        </View>

        {/* Perfil */}
        <View style={styles.profile}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <Text style={styles.username}>{user.nombre}</Text>
          <Text style={styles.region}>
            Region: {user.region || "Sin región"}
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Steam Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Partidas */}
        <View style={styles.matchesContainer}>
          <Text style={styles.title}>Recent Matches</Text>
          {loading ? (
            <Text style={{ color: "#aaa" }}>Cargando partidas...</Text>
          ) : partidas.length > 0 ? (
            <FlatList
              data={partidas}
              keyExtractor={(item) => item.matchId}
              renderItem={({ item }) => (
                <View style={styles.matchCard}>
                  <Image
                    source={require("../../assets/lol-icon.png")}
                    style={styles.icon}
                  />
                  <View>
                    <Text
                      style={[
                        styles.result,
                        item.win ? styles.victory : styles.defeat,
                      ]}
                    >
                      {item.win ? "VICTORY" : "DEFEAT"}
                    </Text>
                    <Text style={styles.modo}>{item.mode}</Text>
                    <Text style={styles.score}>
                      {item.kills}/{item.deaths}/{item.assists} — {item.champion}
                    </Text>
                    <Text style={styles.tiempo}>{item.duration} min</Text>
                  </View>
                </View>
              )}
            />
          ) : (
            <Text style={{ color: "#aaa" }}>No se encontraron partidas.</Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0e0e11",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  logoutButton: {
    padding: 10,
  },
  editButton: {
    padding: 10,
    backgroundColor: "#11BD93",
    borderRadius: 8,
  },
  editButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  profile: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    borderColor: "#11BD93",
    borderWidth: 2,
  },
  username: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  region: {
    fontSize: 14,
    color: "#aaa",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#11BD93",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "#0e0e11",
    fontWeight: "bold",
  },
  matchesContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    color: "white",
    marginBottom: 10,
  },
  matchCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1f2e",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  result: {
    fontSize: 16,
    fontWeight: "bold",
  },
  victory: {
    color: "#11BD93",
  },
  defeat: {
    color: "#ff4444",
  },
  modo: {
    color: "#ccc",
  },
  score: {
    color: "#fff",
  },
  tiempo: {
    color: "#aaa",
  },
});
