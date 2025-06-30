import React, { createContext, useContext, useState } from "react";
import { getMatches } from "../context/servicios";

const PerfilAjenoContext = createContext();

export const PerfilAjenoProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [partidas, setPartidas] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPerfilAjeno = async (id) => {
    setLoading(true);
    try {
      const resUser = await fetch(
        `https://683fa1935b39a8039a552628.mockapi.io/api/v1/users/${id}`
      );
      const user = await resUser.json();
      console.log("Usuario cargado:", user);

      // Buscamos partidas ya almacenadas en MockAPI
      const resPartidas = await fetch(
        `https://683fa1935b39a8039a552628.mockapi.io/api/v1/Match?userId=${id}&sortBy=timestamp&order=desc`
      );

      let partidas = [];
      if (resPartidas.ok) {
        partidas = await resPartidas.json();
        console.log("Partidas cargadas desde MockAPI:", partidas);
      } else {
        console.warn("No se pudieron obtener partidas de MockAPI");
      }
      if (partidas.length === 0) {
        partidas = await getMatches(user.perfilRiot, user.tagLineRiot, user.id);
        console.log("Partidas obtenidas de la API de Riot:", partidas);
      }

      setUsuario(user);
      setPartidas(partidas);
    } catch (error) {
      console.error("Error cargando perfil ajeno:", error);
      setUsuario(null);
      setPartidas([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PerfilAjenoContext.Provider
      value={{ usuario, partidas, loading, fetchPerfilAjeno }}
    >
      {children}
    </PerfilAjenoContext.Provider>
  );
};

export const usePerfilAjeno = () => useContext(PerfilAjenoContext);
