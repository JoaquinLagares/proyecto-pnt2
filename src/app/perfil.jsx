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
import { usePartidas } from "../context/PartidasContext";

export default function PerfilScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [partidas, setPartidas] = useState();
  // const [loading, setLoading] = useState(true);
  const { partidasCache, actualizarPartidas } = usePartidas();
  const [loading, setLoading] = useState(!partidasCache);

  useEffect(() => {
    if (!partidasCache && user?.perfilRiot && user?.tagLineRiot) {
      actualizarPartidas(user.perfilRiot, user.tagLineRiot, user.id).finally(
        () => setLoading(false)
      );
    } else {
      setLoading(false);
    }
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

  const partidasValidas = partidasCache?.filter((p) => !!p.matchId);

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
          <Image source={user.imagen} style={styles.avatar} />
          <Text style={styles.username}>{user.nombre}</Text>
          <Text style={styles.region}>
            Region: {user.region || "Sin región"}
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Steam Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Partidas */}
        {/* actualizar las partidas*/}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setLoading(true);
            actualizarPartidas(user.perfilRiot, user.tagLineRiot).finally(() =>
              setLoading(false)
            );
          }}
        >
          <Text style={styles.buttonText}>🔄 Actualizar</Text>
        </TouchableOpacity>

        <View style={styles.matchesContainer}>
          <Text style={styles.title}>Recent Matches</Text>
          {loading ? (
            <Text style={{ color: "#aaa" }}>Cargando partidas...</Text>
          ) : partidasCache && partidasCache.length > 0 ? (
            <FlatList
              data={partidasCache?.filter(
                (partida, index, self) =>
                  partida?.matchId &&
                  index === self.findIndex((p) => p.matchId === partida.matchId)
              )}
              keyExtractor={(item, index) => item.matchId || index.toString()}
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
                      {item.kills}/{item.deaths}/{item.assists} —{" "}
                      {item.champion}
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
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
  },
  editButton: {
    backgroundColor: "#11BD93",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  editButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "#0e0e11",
    padding: 20,
    // paddingBottom: 80,
  },
  profile: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: "#11BD93",
    borderWidth: 2,
  },
  username: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 10,
  },
  region: {
    color: "#aaa",
    marginVertical: 5,
  },
  button: {
    backgroundColor: "#11BD93",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#0e0e11",
    fontWeight: "bold",
  },
  matchesContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    color: "#11BD93",
    marginBottom: 10,
  },
  matchCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1f2e",
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
    fontWeight: "bold",
    fontSize: 16,
  },
  victory: {
    color: "#00FF88",
  },
  defeat: {
    color: "#FF4081",
  },
  modo: {
    color: "#aaa",
    fontSize: 14,
  },
  score: {
    color: "#fff",
    fontSize: 14,
  },
  tiempo: {
    color: "#666",
    fontSize: 12,
  },
  logoutButton: {
    backgroundColor: "#ff5555",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
});
