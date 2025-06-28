import { Stack, useRouter, useSegments } from "expo-router";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { UserProvider } from "../context/UserContext";
import { View } from "react-native";
import BottomNavBar from "../components/BottomNavBar";
import { useEffect } from "react";
import { PartidasProvider } from "../context/PartidasContext";
import { JugadoresProvider } from "../context/JugadoresContext";
import { PerfilAjenoProvider } from "../context/PerfilAjenoContext";

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
      router.replace("/home");
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
        <PartidasProvider>
          <JugadoresProvider>
            <PerfilAjenoProvider>
              <ProtectedLayout />
            </PerfilAjenoProvider>
          </JugadoresProvider>
        </PartidasProvider>
      </UserProvider>
    </AuthProvider>
  );
}
