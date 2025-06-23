// import React from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { Image, StyleSheet } from "react-native";
// import PerfilScreen from "../perfil";
// import HomeScreen from "../home";
// import BuscarUsuario from "../buscadorUsuarios";

// import { Ionicons } from "@expo/vector-icons";

// const Tabs = createBottomTabNavigator();

// export default function TabNavigator() {
//   return (
//     <Tabs.Navigator
//       screenOptions={({ route }) => ({
//         headerShown: false,
//         tabBarStyle: styles.tabBar,
//         tabBarIcon: ({ focused }) => {
//           let iconSource;

//           //   if (route.name === "Home") {
//           //     iconSource = require("../assets/home-button.png");
//           //   } else if (route.name === "Perfil") {
//           //     iconSource = require("../assets/profile-icon.png");
//           //   } else if (route.name === "Buscar") {
//           //     iconSource = require("../assets/search-button.png");
//           //   }

//           return (
//             <Image
//               source={iconSource}
//               style={[styles.icon, focused && styles.iconFocused]}
//               resizeMode="contain"
//             />
//           );
//         },
//         tabBarShowLabel: false,
//       })}
//     >
//       <Tabs.Screen name="Perfil" component={PerfilScreen} />
//       <Tabs.Screen name="Home" component={HomeScreen} />
//       <Tabs.Screen name="Buscar" component={BuscarUsuario} />
//     </Tabs.Navigator>
//   );
// }

// const styles = StyleSheet.create({
//   tabBar: {
//     backgroundColor: "#00c2a8",
//     borderTopColor: "transparent",
//     height: 60,
//     paddingBottom: 5,
//     paddingTop: 5,
//   },
//   icon: {
//     width: 26,
//     height: 26,
//     opacity: 0.6,
//   },
//   iconFocused: {
//     opacity: 1,
//   },
// });
