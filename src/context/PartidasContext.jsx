import React, { createContext, useContext, useState } from "react";

const PartidasContext = createContext();

export const usePartidas = () => useContext(PartidasContext);

export const PartidasProvider = ({ children }) => {
  const [partidasCache, setPartidasCache] = useState(null);

  const actualizarPartidas = async (perfil, tagLine, id) => {
    try {
      const { getMatches } = await import("./servicios");
      const nuevasPartidas = await getMatches(perfil, tagLine, id);
      setPartidasCache(nuevasPartidas);
    } catch (error) {
      console.error("Error actualizando partidas:", error);
    }
  };

  return (
    <PartidasContext.Provider value={{ partidasCache, actualizarPartidas }}>
      {children}
    </PartidasContext.Provider>
  );
};
