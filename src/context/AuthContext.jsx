import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

//contexto: funcion global que exporta funciones a otras partes de la app
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("cheking");

  //use effect: maneja los ciclos de vida de los componentes, cuando se monta, cuando se modifica una dependencia, cuando se demonta
  useEffect(() => {
    const cargarEstadoAuth = async () => {
      const isAuthenticated = await AsyncStorage.getItem("isAuthenticated");
      const userData = await AsyncStorage.getItem("userData");

      if (isAuthenticated === "true" && userData) {
        setUser(JSON.parse(userData));
        setIsAuth(true);
        setStatus("authenticated");
      } else {
        setStatus("unauthenticated");
      }
    };
    cargarEstadoAuth();
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const logged = false;
      setIsAuth(logged);
    };
    checkAuth();
  }, []);

  //    const login= () => setIsAuth(true)
  const login = async (usuario, password) => {
    try {
      const response = await fetch(
        "https://683fa1935b39a8039a552628.mockapi.io/api/v1/users"
      );
      const data = await response.json();

      const user = data.find(
        (u) => u.username === usuario && u.password === password
      );
      if (user) {
        await AsyncStorage.setItem("isAuthenticated", "true");
        await AsyncStorage.setItem("userData", JSON.stringify(user));
        setUser(user);
        setIsAuth(true);
        setStatus("authenticated");
      } else {
        alert("Usuario o pasword incorrecto");
        setStatus("unauthenticated");
      }
    } catch (error) {
      console.error(error);
      alert("error en la autenticacion");
      setStatus("unauthenticated");
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("isAuthenticated");
    await AsyncStorage.removeItem("userData");
    setIsAuth(false);
    setUser(null);
    setStatus("unauthenticated");
  };

  const checkPassword = async (password, confirmPassword) => {
    try {
      if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden");
        return false;
      }
      if (password.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres");
        return false;
      }
      return true;
    } catch (error) {
      console.error(error);
      alert("Error al verificar la contraseña");
      return false;
    }
  };

  const checkDuplicate = async (username, email) => {
    try {
      const existingUser = await fetch(
        "https://683fa1935b39a8039a552628.mockapi.io/api/v1/users?username=" +
          username
      );
      const existingEmail = await fetch(
        "https://683fa1935b39a8039a552628.mockapi.io/api/v1/users?email=" +
          email
      );
      const [userRes, emailRes] = await Promise.all([
        existingUser,
        existingEmail,
      ]);
      let existingUsers = await userRes.json();
      let existingEmails = await emailRes.json();

      if (existingUsers === "Not found") {
        existingUsers = "";
      }
      if (existingEmails === "Not found") {
        existingEmails = "";
      }
      console.log(existingUsers, existingEmails);

      if (existingUsers.length > 0) {
        alert("Este nombre de usuario ya esta tomado");
        return;
      }
      if (existingEmails.length > 0) {
        alert("Este mail ya tiene una cuenta asociada");
        return;
      }
    } catch (error) {
      console.error(error);
      alert("Error al verificar duplicados");
    }
    return true;
  };

  const register = async (
    username,
    email,
    password,
    confirmPassword,
    onSuccess
  ) => {
    try {
      const isUnique = await checkDuplicate(username, email);
      if (!isUnique) return;

      const passOkay = await checkPassword(password, confirmPassword);
      if (!passOkay) return;

      const response = await fetch(
        "https://683fa1935b39a8039a552628.mockapi.io/api/v1/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
            region: "Indefinida",
          }),
        }
      );
      const newUser = await response.json();

      await AsyncStorage.setItem("isAuthenticated", "true");
      await AsyncStorage.setItem("userData", JSON.stringify(newUser));
      setUser(newUser);
      //setIsAuth(true);
      //setStatus('authenticated');

      if (onSuccess) {
        console.log("Registro exitoso, navegando a /region");
        onSuccess();
      }
    } catch (error) {
      console.error(error);
      alert("Error al registrar el usuario");
      setStatus("unauthenticated");
    }
    setIsAuth(true);
    setStatus("authenticated");
  };

  const updateUserRegion = async (userId, region) => {
    try {
      const response = await fetch(
        `https://683fa1935b39a8039a552628.mockapi.io/api/v1/users/${userId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ region }),
        }
      );

      const updatedUser = await response.json();
      await AsyncStorage.setItem("userData", JSON.stringify(updatedUser));
      setUser(updatedUser);
      return updatedUser;
    } catch (error) {
      console.error("Error al actualizar región:", error);
      alert("No se pudo actualizar la región");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setIsAuth,
        user,
        setUser,
        status,
        setStatus,
        login, 
        logout, 
      }}
    >
      {status === "checking" ? null : children}
    </AuthContext.Provider>
  );
};
