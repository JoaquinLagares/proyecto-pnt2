import { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
} from "react-native";
import { ActivityIndicator } from "react-native";
// import { getMatches } from "../context/servicios";
import { useJugadores } from "../context/JugadoresContext";

export default function Home() {
  const { jugadores, loading } = useJugadores();
  const [query, setQuery] = useState("");

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#00f" />
      ) : (
        <FlatList
          data={jugadores.filter((j) =>
            j.username.toLowerCase().includes(query.toLowerCase())
          )}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>{item.username}</Text>
              <Text style={styles.text}>
                Perfil Riot: {item.perfilRiot}#{item.tagLineRiot}
              </Text>

              <Text
                style={[styles.text, { marginTop: 10, fontWeight: "bold" }]}
              >
                Última partida:
              </Text>

              {item.partidas?.length > 0 ? (
                <View style={styles.matchCard}>
                  <Image
                    source={require("../../assets/lol-icon.png")}
                    style={styles.icon}
                  />
                  <View>
                    <Text
                      style={[
                        styles.result,
                        item.partidas[0].win ? styles.victory : styles.defeat,
                      ]}
                    >
                      {item.partidas[0].win ? "VICTORY" : "DEFEAT"}
                    </Text>
                    <Text style={styles.modo}>{item.partidas[0].mode}</Text>
                    <Text style={styles.score}>
                      {item.partidas[0].kills}/{item.partidas[0].deaths}/
                      {item.partidas[0].assists} — {item.partidas[0].champion}
                    </Text>
                    <Text style={styles.tiempo}>
                      {item.partidas[0].duration} min
                    </Text>
                  </View>
                </View>
              ) : (
                <Text style={styles.text}>No se encontraron partidas.</Text>
              )}
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.text}>No se encontraron usuarios.</Text>
          }
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: "#121212" },
  input: {
    backgroundColor: "#1e1e1e",
    color: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    borderColor: "#333",
    borderWidth: 1,
  },
  card: {
    backgroundColor: "#1e1e1e",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: "#333",
    borderWidth: 1,
  },
  name: { fontSize: 18, fontWeight: "bold", color: "#fff" },
  text: { color: "#ccc" },
  matchCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1f2e",
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
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
});
