// src/app/index.jsx
import { useEffect, useState } from "react";
import { getMatches } from "../context/servicios";
import { FlatList, Text, TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
import { ActivityIndicator } from "react-native";



export default function Home() {
  const [jugadores, setJugadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  const handleLike = async (id) => {
    try {
      await fetch(`https://683fa1935b39a8039a552628.mockapi.io/api/v1/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          likes: ["like"],
        }),
      });
      alert("¡Le diste like!");
    } catch (error) {
      console.error("Error al dar like:", error);
    }
  };

  useEffect(() => {
    const fetchJugadores = async () => {
      try {
        const res = await fetch("https://683fa1935b39a8039a552628.mockapi.io/api/v1/users");
        const data = await res.json();

        const jugadoresConPartidas = await Promise.all(
          data.slice(0, 5).map(async (jugador) => {
            try {
              const partidas = await getMatches(jugador.perfilRiot, jugador.tagLineRiot);
              return { ...jugador, partidas };
            } catch (e) {
              console.error(`Error en jugador ${jugador.username}`, e);
              return { ...jugador, partidas: [] };
            }
          })
        );

        setJugadores(jugadoresConPartidas);
      } catch (error) {
        console.error("Error al cargar jugadores:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJugadores();
  }, []);

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
              <Text style={styles.text}>Región: {item.region}</Text>
              <Text style={styles.text}>
                Perfil Riot: {item.perfilRiot}#{item.tagLineRiot}
              </Text>
              <Text style={styles.text}>Steam: {item.steam}</Text>

              <Text style={[styles.text, { marginTop: 10, fontWeight: "bold" }]}>
                Últimas partidas:
              </Text>
              {item.partidas?.length > 0 ? (
                item.partidas.slice(0, 3).map((partida, index) => (
                  <View key={index} style={{ marginVertical: 4 }}>
                    <Text style={styles.text}>
                      🛡️ Campeón: {partida.champion}
                    </Text>
                    <Text style={styles.text}>
                      🔪 K/D/A: {partida.kills}/{partida.deaths}/{partida.assists}
                    </Text>
                    <Text style={styles.text}>🎮 Modo: {partida.mode}</Text>
                    <Text style={styles.text}>
                      🕒 Duración: {partida.duration} min
                    </Text>
                    <Text style={styles.text}>
                      🏆 Resultado: {partida.win ? "Victoria" : "Derrota"}
                    </Text>
                  </View>
                ))
              ) : (
                <Text style={styles.text}>No se encontraron partidas.</Text>
              )}

              <TouchableOpacity
                style={{
                  alignSelf: "flex-end",
                  marginTop: 10,
                  backgroundColor: "#333",
                  padding: 8,
                  borderRadius: 8,
                }}
                onPress={() => handleLike(item.id)}
              >
                <Text style={{ color: "#00ff88", fontWeight: "bold" }}>💚 Me gusta</Text>
              </TouchableOpacity>
              <Text style={{ color: "#888", marginTop: 5 }}>
                Likes: {item.likes?.length || 0}
              </Text>
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
