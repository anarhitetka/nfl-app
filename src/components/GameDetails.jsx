import { CircularProgress } from "@mui/material";

import * as S from "./Game.styled.js";

export default function GameDetails({
  event,
  awayTeamData,
  homeTeamData,
  scoreIsFinal,
  awayTeamID,
  homeTeamID,
  scoreAwayTeam,
  scoreHomeTeam,
  weekNo,
  errorInFetching
}) {
  const formatDate = function (dateStr) {
    return `${new Date(dateStr).toLocaleString(undefined, {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      dateStyle: "medium",
      timeStyle: "short",
    })}`;
  };

  return (
    <S.GameContainer key={event.id}>
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
