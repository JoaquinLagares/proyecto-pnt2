import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let icon;
          if (route.name === "index") {
            icon = require("../../../assets/home-button.png");
          } else if (route.name === "perfil") {
            icon = require("../../../assets/profile-icon.png");
          } else if (route.name === "buscadorUsuarios") {
            icon = require("../../../assets/search-button.png");
          }
          return (
            <Image
              source={icon}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? "#11BD93" : "gray",
              }}
            />
          );
        },
        tabBarStyle: {
          backgroundColor: "#11BD93",
        },
        headerShown: false,
      })}
    />
  );
}
