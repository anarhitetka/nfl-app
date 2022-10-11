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
  const [homeTeamEndpoint, setHomeTeamEndpoint] = useState();
  const [awayTeamEndpoint, setAwayTeamEndpoint] = useState();

  const [scoreHomeTeam, setScoreHomeTeam] = useState(0);
  const [scoreAwayTeam, setScoreAwayTeam] = useState(0);

  const [scoreIsFinal, setScoreIsFinal] = useState(false);

  const [homeTeamID, setHomeTeamID] = useState();
  const [awayTeamID, setAwayTeamID] = useState();

  // const [awayTeam, homeTeam] = event.name.split(" at ");

  // FORMAT DATE FN
  const formatDate = function (dateStr) {
    return `${new Date(dateStr).toLocaleString(undefined, {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      // dateStyle: "medium",
      // timeStyle: "short",
      weekday: "short",
      timeZoneName: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    })}`;
  };

  // FETCH ENDPOINTS FOR GAME
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

  // FETCH SCORES
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

  // FETCH TEAM DATA
  const awayTeamData = useFetchSingleEndpoint(
    `https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/`,
    awayTeamID
  );
  // console.log(awayTeamData.data.team.record.items[0].summary);

  const homeTeamData = useFetchSingleEndpoint(
    `https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/`,
    homeTeamID
  );
  // console.log(event);
  return (
    <GameContainer key={event.id}>
      <h4>{event.name}</h4>
      <p>{formatDate(event.date)}</p>
      <p>{scoreIsFinal ? `FINAL SCORE` : "Game pending"}</p>

      <div>
        {!awayTeamData.isLoading && (
          <>
            <img
              src={awayTeamData.data.team.logos[0].href}
              height="30"
              alt="team logo"
            />
            <span>{awayTeamData.data.team.abbreviation}</span>
          </>
        )}
        <span>
          {" "}
          :{" "}
          {scoreIsFinal
            ? scoreAwayTeam
            : awayTeamData.isLoading
            ? "loading stats"
            : awayTeamData.data.team.record.items[0].summary}
        </span>
      </div>

      <div>
        {!homeTeamData.isLoading && (
          <>
            <img
              src={homeTeamData.data.team.logos[0].href}
              height="30"
              alt="team logo"
            />
            <span>{homeTeamData.data.team.abbreviation}</span>
          </>
        )}
        <span>
          {" "}
          :{" "}
          {scoreIsFinal
            ? scoreHomeTeam
            : homeTeamData.isLoading
            ? "loading stats"
            : homeTeamData.data.team.record.items[0].summary}
        </span>
      </div>
    </GameContainer>
  );
}
