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
        const { data } = await axios.get(homeTeamEndpoint);
        setScoreHomeTeam(data.value);
      } catch (error) {
        console.error(error);
      }
    };

    const getAwayTeamScore = async () => {
      try {
        const { data } = await axios.get(awayTeamEndpoint);
        setScoreAwayTeam(data.value);
      } catch (error) {
        console.error(error);
      }
    };

    getHomeTeamScore();
    getAwayTeamScore();
  }, [homeTeamEndpoint, awayTeamEndpoint]);

  return (
    <div key={event.id}>
      <p>
        {event.shortName}: {event.name}
      </p>
      <p>date: {formatDate(event.date)}</p>
      {scoreIsFinal
        ? `Away team score: ${scoreAwayTeam}, Home team score: ${scoreHomeTeam}`
        : "Game pending"}
      <hr />
    </div>
  );
}
