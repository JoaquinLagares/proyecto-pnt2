import React, { createContext, useContext, useState, useEffect } from "react";

const JugadoresContext = createContext();

export const JugadoresProvider = ({ children }) => {
  const [jugadores, setJugadores] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJugadores = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://683fa1935b39a8039a552628.mockapi.io/api/v1/users"
      );
      const users = await res.json();

      const enriched = await Promise.all(
        users.map(async (user) => {
          try {
            const resPartidas = await fetch(
              `https://683fa1935b39a8039a552628.mockapi.io/api/v1/Match?userId=${user.id}&sortBy=timestamp&order=desc`
            );
            const partidas = await resPartidas.json();
            return { ...user, partidas };
          } catch (e) {
            console.warn(`Error trayendo partidas de ${user.username}`);
            return { ...user, partidas: [] };
          }
        })
      );

      setJugadores(enriched);
    } catch (error) {
      console.error("Error al cargar jugadores:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJugadores();
  }, []);

  return (
    <JugadoresContext.Provider
      value={{ jugadores, loading, refreshJugadores: fetchJugadores }}
    >
      {children}
    </JugadoresContext.Provider>
  );
};

export const useJugadores = () => useContext(JugadoresContext);
