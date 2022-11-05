import axios from "axios";
import { useState, useEffect } from "react";
import { useFetchSingleEndpoint } from "../utils/useFetchSingleEndpoint";

import GamePreview from "./GamePreview";
import GameDetails from "./GameDetails";

export default function Game({ event, weekNo, teamId, type }) {
  const [homeTeamScoreEndpoint, setHomeTeamScoreEndpoint] = useState();
  const [awayTeamScoreEndpoint, setAwayTeamScoreEndpoint] = useState();

  const [scoreHomeTeam, setScoreHomeTeam] = useState(null);
  const [scoreAwayTeam, setScoreAwayTeam] = useState(null);

  const [scoreIsFinal, setScoreIsFinal] = useState(false);

  const [homeTeamID, setHomeTeamID] = useState();
  const [awayTeamID, setAwayTeamID] = useState();

  useEffect(() => {
    const getGameEndpoints = async () => {
      const { data } = await axios(event.$ref);

      data.competitions[0].competitors.forEach((competitor) => {
        competitor.homeAway === "home"
          ? setHomeTeamScoreEndpoint(competitor.score.$ref)
          : setAwayTeamScoreEndpoint(competitor.score.$ref);
        competitor.homeAway === "home"
          ? setHomeTeamID(competitor.id)
          : setAwayTeamID(competitor.id);
      });
      data.competitions[0].boxscoreAvailable
        ? setScoreIsFinal(true)
        : setScoreIsFinal(false);
    };

    getGameEndpoints();
  }, [event.$ref]);

  useEffect(() => {
    const getHomeTeamScore = async () => {
      try {
        const { data } = await axios(homeTeamScoreEndpoint);
        setScoreHomeTeam(data.value);
      } catch (error) {
        // console.error(error);
      }
    };

    const getAwayTeamScore = async () => {
      try {
        const { data } = await axios(awayTeamScoreEndpoint);
        setScoreAwayTeam(data.value);
      } catch (error) {
        // console.error(error);
      }
    };

    getHomeTeamScore();
    getAwayTeamScore();
  }, [homeTeamScoreEndpoint, awayTeamScoreEndpoint]);

  const awayTeamData = useFetchSingleEndpoint(
    `https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/`,
    awayTeamID
  );

  const homeTeamData = useFetchSingleEndpoint(
    `https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/`,
    homeTeamID
  );

  return (
    <>
      {type === "preview" ? (
        <GamePreview
          awayTeamData={awayTeamData}
          homeTeamData={homeTeamData}
          event={event}
          teamId={teamId}
          awayTeamID={awayTeamID}
          homeTeamID={homeTeamID}
          scoreIsFinal={scoreIsFinal}
          scoreAwayTeam={scoreAwayTeam}
          scoreHomeTeam={scoreHomeTeam}
        />
      ) : (
        <GameDetails
          awayTeamData={awayTeamData}
          homeTeamData={homeTeamData}
          event={event}
          awayTeamID={awayTeamID}
          homeTeamID={homeTeamID}
          scoreIsFinal={scoreIsFinal}
          scoreAwayTeam={scoreAwayTeam}
          scoreHomeTeam={scoreHomeTeam}
          weekNo={weekNo}
        />
      )}
    </>
  );
}
