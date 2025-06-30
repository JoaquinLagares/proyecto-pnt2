import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { usePerfilAjeno } from "../../context/PerfilAjenoContext";
import { useLikes } from "../../context/LikesContext";
import { useUser } from "../../context/UserContext";
import { Ionicons } from "@expo/vector-icons";

export default function PerfilAjeno() {
  const { id } = useLocalSearchParams();
  const { usuario, partidas, loading, fetchPerfilAjeno } = usePerfilAjeno();
  const { user } = useUser();
  const { toggleLike, hasUserLiked } = useLikes();

  useEffect(() => {
    if (id) {
      fetchPerfilAjeno(id);
    }
  }, [id]);

  if (loading || !usuario) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#11BD93" />
        <Text style={{ color: "#fff", marginTop: 10 }}>Cargando perfil...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profile}>
        {/* <Image source={perfil.imagen} style={styles.avatar} /> */}
        <Text style={styles.username}>{usuario.username}</Text>
        <Text style={styles.text}>Región: {usuario.region}</Text>
        <Text style={styles.text}>
          Perfil Riot: {usuario.perfilRiot}#{usuario.tagLineRiot}
        </Text>
        <Text style={styles.text}>Steam: {usuario.steam}</Text>
      </View>

      <Text style={styles.title}>Últimas partidas</Text>
      <FlatList
        data={partidas}
        keyExtractor={(item, index) => item.matchId || index.toString()}
        renderItem={({ item }) => (
          <View style={styles.matchCard}>
            <Image
              source={require("../../../assets/lol-icon.png")}
              style={styles.icon}
            />
            <View style={{ flex: 1 }}>
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

            <View style={styles.likeContainer}>
              <TouchableOpacity onPress={() => toggleLike(item, user.id)}>
                <Ionicons
                  name={hasUserLiked(item, user.id) ? "heart" : "heart-outline"}
                  size={20}
                  color={hasUserLiked(item, user.id) ? "red" : "#aaa"}
                />
              </TouchableOpacity>
              <Text style={styles.likesCount}>{item.likes?.length || 0}</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.text}>No se encontraron partidas.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0e0e11",
    flex: 1,
    padding: 20,
  },
  centered: {
    flex: 1,
    backgroundColor: "#0e0e11",
    justifyContent: "center",
    alignItems: "center",
  },
  profile: {
    alignItems: "center",
    marginBottom: 20,
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
  text: {
    color: "#ccc",
    marginTop: 5,
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
  likeContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  likesCount: {
    color: "#ccc",
    fontSize: 12,
    marginTop: 2,
  },
});
