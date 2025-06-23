import { Stack, useRouter, useSegments } from "expo-router";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { UserProvider } from "../context/UserContext";
import { View } from "react-native";
import BottomNavBar from "../components/BottomNavBar";
import { useEffect } from "react";

function ProtectedLayout() {
  const { isAuth } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isAuth === null) return;

    const inAuthGroup = ["login", "registrar"].includes(segments[0]);

    if (!isAuth && !inAuthGroup) {
      router.replace("/login");
    } else if (isAuth && inAuthGroup) {
      router.replace("/perfil");
    }
  }, [isAuth, segments]);

  return (
    <View style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }} />
      {isAuth && <BottomNavBar />}
    </View>
  );
}

export default function LayoutPrincipal() {
  return (
    <AuthProvider>
      <UserProvider>
        <ProtectedLayout />
      </UserProvider>
    </AuthProvider>
  );
}

// import { Stack } from "expo-router";
// import { AuthProvider, useAuth } from "../context/AuthContext";
// import { UserProvider } from "../context/UserContext";
// import { useEffect } from "react";
// import { useSegments, useRouter } from "expo-router";

// function ProtectedLayout() {
//   const { isAuth } = useAuth();
//   const segments = useSegments();
//   const router = useRouter();

//   useEffect(() => {
//     if (isAuth === null) return;

//     const inAuthGroup = ["login", "registrar"].includes(segments[0]);

//     if (!isAuth && !inAuthGroup) {
//       router.replace("/login");
//     } else if (isAuth && inAuthGroup) {
//       router.replace("/perfil");
//     }
//   }, [isAuth, segments]);

//   return <Stack screenOptions={{ headerShown: false }} />;
// }

// export default function LayoutPrincipal() {
//   return (
//     <AuthProvider>
//       <UserProvider>
//         <ProtectedLayout />
//       </UserProvider>
//     </AuthProvider>
//   );
// }
