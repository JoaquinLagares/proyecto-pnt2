import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function BottomNavBar() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push("/perfil")}>
        <Image
          source={require("../../assets/profile-icon.png")}
          style={styles.icon}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/home")}>
        <Image
          source={require("../../assets/home-button.png")}
          style={styles.icon}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/buscadorUsuarios")}>
        <Image
          source={require("../../assets/search-button.png")}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#11BD93",
    paddingVertical: 12,
    justifyContent: "space-around",
    alignItems: "center",
  },
  icon: {
    width: 28,
    height: 28,
  },
});
