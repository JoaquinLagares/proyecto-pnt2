// Servicio para encontrar cuenta de LOL
const API_KEY = "RGAPI-d0b2308f-b199-414c-b0fa-b801f70903cc";

export const getMatches = async (summonerName, tagLine, userId) => {
  try {
    const resAccount = await fetch(
      `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}/${tagLine}?api_key=${API_KEY}`
    );
    const accountData = await resAccount.json();
    console.log("Se encontro PUUID", accountData);

    if (!accountData.puuid) {
      console.error("No se encontro PUUID", accountData);
      return [];
    }
    const puuid = accountData.puuid;

    const resMatchIds = await fetch(
      `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=5&api_key=${API_KEY}`
    );
    const matchIds = await resMatchIds.json();
    console.log("Se encontro MatchIds", matchIds);

    if (!Array.isArray(matchIds)) {
      console.error("matchIds no es un array", matchIds);
      return [];
    }

    const matches = await Promise.all(
      matchIds.map(async (id) => {
        // Verificamos si ya existe en MockAPI
        const existingMatch = await fetch(
          `https://683fa1935b39a8039a552628.mockapi.io/api/v1/matches?matchId=${id}`
        );
        const existing = await existingMatch.json();
        console.log("Se encontro match en mockAPI", existing);

        if (existing.length > 0) {
          return existing[0];
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

        // Se guarda en mockAPI
        const resSaved = await fetch(
          "https://683fa1935b39a8039a552628.mockapi.io/api/v1/matches",
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
