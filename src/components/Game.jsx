import axios from "axios";
import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { useFetchSingleEndpoint } from "../utils/useFetchSingleEndpoint";

import * as S from "./Game.styled.js";

export default function Game({ event, weekNo }) {
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
    <S.GameContainer key={event.id}>
      {/* TODO: Refactor into separate components */}

      {awayTeamData.isLoading || homeTeamData.isLoading ? (
        <CircularProgress size={20} />
      ) : (
        <>
          <S.GameHeading>{event.name}</S.GameHeading>

          <div>
            <div>
              <p>{formatDate(event.date)}</p>
              <p>{scoreIsFinal ? `FINAL SCORE` : "Game pending"}</p>
            </div>

            <S.TeamContainer>
              {!awayTeamData.isLoading && weekNo <= 18 && (
                <>
                  <S.TeamLink to={`/teams/${awayTeamID}`}>
                    <img
                      src={awayTeamData.data.team.logos[0].href}
                      height="25"
                      alt="team logo"
                    />
                  </S.TeamLink>
                  <div>
                    <S.TeamLink to={`/teams/${awayTeamID}`}>
                      <span>{awayTeamData.data.team.abbreviation}</span>
                    </S.TeamLink>
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
            </S.TeamContainer>

            <S.TeamContainer>
              {!homeTeamData.isLoading && weekNo <= 18 && (
                <>
                  <S.TeamLink to={`/teams/${homeTeamID}`}>
                    <img
                      src={homeTeamData.data.team.logos[0].href}
                      height="25"
                      alt="team logo"
                    />
                  </S.TeamLink>
                  <div>
                    <S.TeamLink to={`/teams/${homeTeamID}`}>
                      <span>{homeTeamData.data.team.abbreviation}</span>
                    </S.TeamLink>
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
            </S.TeamContainer>
          </div>
        </>
      )}
    </S.GameContainer>
  );
}
