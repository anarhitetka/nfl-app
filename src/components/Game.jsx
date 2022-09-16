import axios from "axios";
import { useState, useEffect } from "react";

export default function Game({ event }) {
  const formatDate = function (dateStr) {
    return `${new Date(dateStr).toDateString()} (Time Zone: ${
      Intl.DateTimeFormat().resolvedOptions().timeZone
    })`;
  };

  const [homeTeamEndpoint, setHomeTeamEndpoint] = useState();
  const [awayTeamEndpoint, setAwayTeamEndpoint] = useState();

  const [scoreHomeTeam, setScoreHomeTeam] = useState(0);
  const [scoreAwayTeam, setScoreAwayTeam] = useState(0);

  const [scoreIsFinal, setScoreIsFinal] = useState(false);

  useEffect(() => {
    const getGameEndpoints = async () => {
      const { data } = await axios(event.$ref);

      data.competitions[0].competitors.forEach((competitor) => {
        competitor.homeAway === "home"
          ? setHomeTeamEndpoint(competitor.score.$ref)
          : setAwayTeamEndpoint(competitor.score.$ref);
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
        const { data } = await axios(homeTeamEndpoint);
        setScoreHomeTeam(data.value);
      } catch (error) {
        // console.error(error);
        // console.log("Still fetching...");
      }
    };

    const getAwayTeamScore = async () => {
      try {
        const { data } = await axios(awayTeamEndpoint);
        setScoreAwayTeam(data.value);
      } catch (error) {
        // console.error(error);
        // console.log("Still fetching...");
      }
    };

    getHomeTeamScore();
    getAwayTeamScore();
  }, [homeTeamEndpoint, awayTeamEndpoint]);

  return (
    <div key={event.id}>
      <h4>{event.shortName}</h4>
      {scoreIsFinal
        ? `Away team score: ${scoreAwayTeam}, Home team score: ${scoreHomeTeam}`
        : "Game pending"}
      <p>{event.name}</p>
      <p>date: {formatDate(event.date)}</p>
      <hr />
    </div>
  );
}
