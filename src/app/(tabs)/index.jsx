import React from "react";
import { Link } from "expo-router";
import { Text, View, StyleSheet, Pressable } from "react-native";

const links = [
  { label: "Ir al perfil", href: "/perfil" },
  { label: "Buscar usuario", href: "/buscarUsuario" },
];

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏠 Home Screen</Text>
      {links.map((link) => (
        <Link key={link.href} href={link.href} asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>{link.label}</Text>
          </Pressable>
        </Link>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#0e0e11",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#11BD93",
  },
  button: {
    backgroundColor: "#11BD93",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonText: {
    color: "#0e0e11",
    fontSize: 18,
  },
});
