import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);

  const buscarUsuarios = async (texto) => {
    if (texto.trim() === "") {
      setUsuarios([]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        "https://683fa1935b39a8039a552628.mockapi.io/api/v1/users"
      );
      const data = await res.json();
      const filtrados = data.filter((u) =>
        u.username.toLowerCase().includes(texto.toLowerCase())
      );
      setUsuarios(filtrados);
    } catch (err) {
      console.error("Error buscando usuarios:", err);
    }
    setLoading(false);
  };

  return (
    <UserContext.Provider value={{ usuarios, buscarUsuarios, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
