// Servicio para encontrar cuenta de LOL
const API_KEY = "RGAPI-d0b2308f-b199-414c-b0fa-b801f70903cc";

export const getMatches = async (summonerName, tagLine) => {
  try {
    const resAccount = await fetch(
      `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}/${tagLine}?api_key=${API_KEY}`
    );
    const accountData = await resAccount.json();

    if (!accountData.puuid) {
      console.error("No se encontro PUUID", accountData);
      return [];
    }
    const puuid = accountData.puuid;

    const resMatchIds = await fetch(
      `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10&api_key=${API_KEY}`
    );
    const matchIds = await resMatchIds.json();
    if (!Array.isArray(matchIds)) {
      console.error("matchIds no es un array", matchIds);
      return [];
    }

    const matches = await Promise.all(
      matchIds.map(async (id) => {
        const resMatch = await fetch(
          `https://americas.api.riotgames.com/lol/match/v5/matches/${id}?api_key=${API_KEY}`
        );
        const data = await resMatch.json();
        const player = data.info.participants.find((p) => p.puuid === puuid);

        return {
          matchId: id,
          champion: player.championName,
          kills: player.kills,
          deaths: player.deaths,
          assists: player.assists,
          win: player.win,
          mode: data.info.gameMode,
          duration: Math.floor(data.info.gameDuration / 60),
          timestamp: data.info.gameStartTimestamp,
        };
      })
    );
    return matches;
  } catch (error) {
    console.error("Error en getMatches", error);
    return [];
  }
};
