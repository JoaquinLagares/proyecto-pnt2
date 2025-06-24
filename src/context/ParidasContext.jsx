import React, { createContext, useContext, useState } from "react";

const PartidasContext = createContext();

export const usePartidas = () => useContext(PartidasContext);

export const PartidasProvider = ({ children }) => {
  const [partidasCache, setPartidasCache] = useState(null);

  const actualizarPartidas = async (perfil, tagLine) => {
    try {
      const { getMatches } = await import("./servicios"); // Lazy import
      const nuevasPartidas = await getMatches(perfil, tagLine);
      setPartidasCache(nuevasPartidas);
    } catch (error) {
      console.error("Error actualizando partidas:", error);
    }
  };

  return (
    <PartidasContext.Provider
      value={{ partidasCache, actualizarPartidas }}
    >
      {children}
    </PartidasContext.Provider>
  );
};
