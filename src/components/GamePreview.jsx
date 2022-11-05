import { CircularProgress } from "@mui/material";

import * as S from "./Game.styled.js";

export default function GamePreview({
  awayTeamData,
  homeTeamData,
  event,
  teamId,
  awayTeamID,
  homeTeamID,
  scoreIsFinal,
  scoreAwayTeam,
  scoreHomeTeam,
}) {
  const formatDateShort = function (dateStr) {
    return `${new Date(dateStr).toLocaleString(undefined, {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timeStyle: "short",
    })}`;
  };
  const formatDate = function (dateStr) {
    return `${new Date(dateStr).toLocaleString(undefined, {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      dateStyle: "medium",
    })}`;
  };

  return (
    <>
      <S.GameContainer>
        {awayTeamData.isLoading || homeTeamData.isLoading ? (
          <CircularProgress size={20} />
        ) : (
          <>
            <p style={{ textAlign: "end", margin: 0, paddingBottom: "5px" }}>
              {formatDate(event.date)}
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {teamId === awayTeamID ? (
                <>
                  <span>@</span>
                  <S.TeamLink to={`/teams/${homeTeamID}`}>
                    <img
                      src={homeTeamData.data.team.logos[0].href}
                      height="25"
                      alt="team logo"
                    />
                  </S.TeamLink>
                  <span>
                    {scoreIsFinal ? (
                      <>
                        {scoreAwayTeam < scoreHomeTeam
                          ? "LOST"
                          : scoreAwayTeam === scoreHomeTeam
                          ? "TIE"
                          : "WON"}
                      </>
                    ) : (
                      ""
                    )}
                  </span>
                </>
              ) : (
                <>
                  <span>vs</span>
                  <S.TeamLink to={`/teams/${awayTeamID}`}>
                    <img
                      src={awayTeamData.data.team.logos[0].href}
                      height="25"
                      alt="team logo"
                    />
                  </S.TeamLink>
                  <span>
                    {scoreIsFinal ? (
                      <>
                        {scoreAwayTeam > scoreHomeTeam
                          ? "LOST"
                          : scoreAwayTeam === scoreHomeTeam
                          ? "TIE"
                          : "WON"}
                      </>
                    ) : (
                      ""
                    )}
                  </span>
                </>
              )}
              {scoreIsFinal ? (
                <span>
                  {scoreAwayTeam > scoreHomeTeam
                    ? ` ${scoreAwayTeam}-${scoreHomeTeam}`
                    : ` ${scoreHomeTeam}-${scoreAwayTeam}`}
                </span>
              ) : (
                <span>{formatDateShort(event.date)}</span>
              )}
            </div>
          </>
        )}
      </S.GameContainer>
    </>
  );
}
