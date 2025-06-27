// Servicio para encontrar cuenta de LOL
const API_KEY = "RGAPI-ca5fde1e-c8d4-449f-b95b-86369e9926fd";

export const getMatches = async (summonerName, tagLine, userId) => {
  try {
    const resAccount = await fetch(
      `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}/${tagLine}?api_key=${API_KEY}`
    );
    const accountData = await resAccount.json();
    // console.log("Se encontro PUUID", accountData);

    if (!accountData.puuid) {
      console.error("No se encontro PUUID", accountData);
      return [];
    }
    const puuid = accountData.puuid;

    const resMatchIds = await fetch(
      `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=5&api_key=${API_KEY}`
    );
    const matchIds = await resMatchIds.json();
    // console.log("Se encontro MatchIds", matchIds);

    if (!Array.isArray(matchIds)) {
      console.error("matchIds no es un array", matchIds);
      return [];
    }

    const matches = await Promise.all(
      matchIds.map(async (id) => {
        // Verificamos si ya existe en MockAPI
        const allMatchesRes = await fetch(
          "https://683fa1935b39a8039a552628.mockapi.io/api/v1/Match"
        );
        const allMatches = await allMatchesRes.json();
        const existing = allMatches.find((m) => m.matchId === id);

        if (existing) {
          console.log("Hay partidas");
          return existing;
        }

        // Si no existe, se llama a la API
        const resMatch = await fetch(
          `https://americas.api.riotgames.com/lol/match/v5/matches/${id}?api_key=${API_KEY}`
        );
        const data = await resMatch.json();

        const player = data.info.participants.find((p) => p.puuid === puuid);

        const match = {
          matchId: id,
          userId: userId,
          champion: player.championName,
          kills: player.kills,
          deaths: player.deaths,
          assists: player.assists,
          win: player.win,
          mode: data.info.gameMode,
          duration: Math.floor(data.info.gameDuration / 60),
          timestamp: data.info.gameStartTimestamp,
          likes: [],
        };
        // console.log(match);

        // Se guarda en mockAPI
        const resSaved = await fetch(
          "https://683fa1935b39a8039a552628.mockapi.io/api/v1/Match",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(match),
          }
        );

        const saved = await resSaved.json();
        return saved;
      })
    );

    return matches;
  } catch (error) {
    console.error("Error en getMatches", error);
    return [];
  }
};
