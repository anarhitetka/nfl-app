import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { CircularProgress } from "@mui/material";

import { useFetchSingleEndpoint } from "../utils/useFetchSingleEndpoint";

const GameContainer = styled.div`
  width: 200px;
  margin: 10px;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 5px;
`;

const StyledH4 = styled.h4`
  margin: 0;
`;

const StyledTeamDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 5px 10px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

export default function Game({ event }) {
  const [homeTeamScoreEndpoint, setHomeTeamScoreEndpoint] = useState();
  const [awayTeamScoreEndpoint, setAwayTeamScoreEndpoint] = useState();

  const [scoreHomeTeam, setScoreHomeTeam] = useState(0);
  const [scoreAwayTeam, setScoreAwayTeam] = useState(0);

  const [scoreIsFinal, setScoreIsFinal] = useState(false);

  const [homeTeamID, setHomeTeamID] = useState();
  const [awayTeamID, setAwayTeamID] = useState();

  // FORMAT DATE FN
  const formatDate = function (dateStr) {
    return `${new Date(dateStr).toLocaleString(undefined, {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      dateStyle: "medium",
      timeStyle: "short",
      // weekday: "short",
      // timeZoneName: "short",
      // day: "2-digit",
      // month: "short",
      // year: "numeric",
    })}`;
  };

  // FETCH ENDPOINTS FOR GAME
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

  // FETCH SCORES
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

  // FETCH TEAM DATA
  const awayTeamData = useFetchSingleEndpoint(
    `https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/`,
    awayTeamID
  );

  const homeTeamData = useFetchSingleEndpoint(
    `https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/`,
    homeTeamID
  );

  return (
    <GameContainer key={event.id}>
      {/* TODO: Refactor into separate components */}

      {awayTeamData.isLoading || homeTeamData.isLoading ? (
        <CircularProgress size={20} />
      ) : (
        <>
          <StyledH4>{event.name}</StyledH4>

          <div>
            <div>
              <p>{formatDate(event.date)}</p>
              <p>{scoreIsFinal ? `FINAL SCORE` : "Game pending"}</p>
            </div>

            <StyledTeamDiv>
              {!awayTeamData.isLoading && (
                <>
                  <StyledLink to={`/teams/${awayTeamID}`}>
                    <img
                      src={awayTeamData.data.team.logos[0].href}
                      height="25"
                      alt="team logo"
                    />
                  </StyledLink>
                  <div>
                    <StyledLink to={`/teams/${awayTeamID}`}>
                      <span>{awayTeamData.data.team.abbreviation}</span>
                    </StyledLink>
                    <span>
                      {scoreIsFinal
                        ? scoreAwayTeam
                        : awayTeamData.isLoading
                        ? "loading stats"
                        : awayTeamData.data.team.record.items[0].summary}
                    </span>
                  </div>
                </>
              )}
            </StyledTeamDiv>

            <StyledTeamDiv>
              {!homeTeamData.isLoading && (
                <>
                  <StyledLink to={`/teams/${homeTeamID}`}>
                    <img
                      src={homeTeamData.data.team.logos[0].href}
                      height="25"
                      alt="team logo"
                    />
                  </StyledLink>
                  <div>
                    <StyledLink to={`/teams/${homeTeamID}`}>
                      <span>{homeTeamData.data.team.abbreviation}</span>
                    </StyledLink>
                    <span>
                      {scoreIsFinal
                        ? scoreHomeTeam
                        : homeTeamData.isLoading
                        ? "loading stats"
                        : homeTeamData.data.team.record.items[0].summary}
                    </span>
                  </div>
                </>
              )}
            </StyledTeamDiv>
          </div>
        </>
      )}
    </GameContainer>
  );
}
