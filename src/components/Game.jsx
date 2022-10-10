import axios from "axios";
import { useState, useEffect } from "react";
import styled from "styled-components";

import { useFetchSingleEndpoint } from "../utils/useFetchSingleEndpoint";

const GameContainer = styled.div`
  width: 400px;
  margin: 10px;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 5px;
`;

export default function Game({ event }) {
  const formatDate = function (dateStr) {
    return `${new Date(dateStr).toLocaleString(undefined, {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      dateStyle: "full",
      timeStyle: "full",
    })}`;
  };

  const [homeTeamEndpoint, setHomeTeamEndpoint] = useState();
  const [awayTeamEndpoint, setAwayTeamEndpoint] = useState();

  const [scoreHomeTeam, setScoreHomeTeam] = useState(0);
  const [scoreAwayTeam, setScoreAwayTeam] = useState(0);

  const [scoreIsFinal, setScoreIsFinal] = useState(false);

  const [homeTeamID, setHomeTeamID] = useState();
  const [awayTeamID, setAwayTeamID] = useState();

  useEffect(() => {
    const getGameEndpoints = async () => {
      const { data } = await axios(event.$ref);

      data.competitions[0].competitors.forEach((competitor) => {
        competitor.homeAway === "home"
          ? setHomeTeamEndpoint(competitor.score.$ref)
          : setAwayTeamEndpoint(competitor.score.$ref);
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
        const { data } = await axios(homeTeamEndpoint);
        setScoreHomeTeam(data.value);
      } catch (error) {
        // console.error(error);
      }
    };

    const getAwayTeamScore = async () => {
      try {
        const { data } = await axios(awayTeamEndpoint);
        setScoreAwayTeam(data.value);
      } catch (error) {
        // console.error(error);
      }
    };

    getHomeTeamScore();
    getAwayTeamScore();
  }, [homeTeamEndpoint, awayTeamEndpoint]);

  const awayTeamData = useFetchSingleEndpoint(
    `https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/`,
    awayTeamID
  );

  const homeTeamData = useFetchSingleEndpoint(
    `https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/`,
    homeTeamID
  );

  const [awayTeam, homeTeam] = event.name.split(" at ");

  return (
    <GameContainer key={event.id}>
      <h4>{event.shortName}</h4>
      {scoreIsFinal
        ? `Away team score: ${scoreAwayTeam}, Home team score: ${scoreHomeTeam}`
        : "Game pending"}
      <p>
        {awayTeam} at {homeTeam}
      </p>

      {!awayTeamData.isLoading && (
        <img
          src={awayTeamData.data.team.logos[0].href}
          height="100"
          alt="team logo"
        />
      )}

      {!homeTeamData.isLoading && (
        <img
          src={homeTeamData.data.team.logos[0].href}
          height="100"
          alt="team logo"
        />
      )}

      <p>date: {formatDate(event.date)}</p>
    </GameContainer>
  );
}
