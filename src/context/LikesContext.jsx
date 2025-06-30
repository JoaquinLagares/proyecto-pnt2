import React, { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "./UserContext";

const LikesContext = createContext();

export const LikesProvider = ({ children }) => {
  const { user: currentUser } = useUser();
  const [likesCache, setLikesCache] = useState({});

  const fetchLikesForMatch = async (matchId) => {
    try {
      const res = await fetch(
        `https://683fa1935b39a8039a552628.mockapi.io/api/v1/Match/${matchId}`
      );
      const data = await res.json();
      setLikesCache((prev) => ({ ...prev, [matchId]: data.likes || [] }));
    } catch (err) {
      console.error("Error obteniendo likes:", err);
    }
  };

  const toggleLike = async (matchId) => {
    const userId = currentUser?.id;
    console.log("Current user id:", userId);
    console.log("Current user matchId:", matchId);
    if (!userId) return;

    const currentLikes = likesCache[matchId] || [];
    const hasLiked = currentLikes.includes(userId);
    const updatedLikes = hasLiked
      ? currentLikes.filter((id) => id !== userId)
      : [...currentLikes, userId];

    // Actualizar en MockAPI
    try {
      await fetch(
        `https://683fa1935b39a8039a552628.mockapi.io/api/v1/Match/${matchId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ likes: updatedLikes }),
        }
      );
      setLikesCache((prev) => ({ ...prev, [matchId]: updatedLikes }));
    } catch (err) {
      console.error("Error actualizando likes:", err);
    }
  };

  const hasUserLiked = (matchId) => {
    const userId = currentUser?.id;
    return likesCache[matchId]?.includes(userId);
  };

  return (
    <LikesContext.Provider
      value={{ likesCache, fetchLikesForMatch, toggleLike, hasUserLiked }}
    >
      {children}
    </LikesContext.Provider>
  );
};

export const useLikes = () => useContext(LikesContext);
