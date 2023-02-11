import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import * as S from "./GamePreview.styled";
import { Link } from 'react-router-dom';

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
  errorInFetching
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

  const weekNumber = event.week.$ref.substring(
    event.week.$ref.lastIndexOf("/") + 1,
    event.week.$ref.indexOf("?")
  );

  return (
    <>
      <S.GameContainer style={{ width: "70vw" }}>
        {awayTeamData.isLoading || homeTeamData.isLoading ? (
          <LinearProgress />
        ) : (
          <>

            <S.DateInfoRow>
              <p><span>Week {weekNumber}:</span>{" "}
                {formatDate(event.date)}{" "}
              </p>
              <S.LinkToEspn target="blank" href={`https://www.espn.com/nfl/game/_/gameId/${event.id}`}>ESPN</S.LinkToEspn>
            </S.DateInfoRow>

            <S.ScoreRowGamePreview>
              {teamId === awayTeamID ? (
                <S.ScoreRowCompetitorDetails>
                  <div>
                    <span>@</span>
                    <S.TeamLink to={`/teams/${homeTeamID}`}>
                      <img
                        src={homeTeamData.data.team.logos[0].href}
                        height="25"
                        alt="team logo"
                      />
                      <span>{homeTeamData.data.team.nickname}</span>
                    </S.TeamLink>
                  </div>

                  <span>
                    {scoreIsFinal ? (
                      <>
                        {scoreAwayTeam < scoreHomeTeam
                          ? <S.TextColorLost>LOST</S.TextColorLost>
                          : scoreAwayTeam === scoreHomeTeam
                            ? "TIE"
                            : <S.TextColorWon>WON</S.TextColorWon>}
                      </>
                    ) : (
                      ""
                    )}
                  </span>
                </S.ScoreRowCompetitorDetails>
              ) : (
                <S.ScoreRowCompetitorDetails>
                  <div>
                    <span>vs</span>
                    <S.TeamLink to={`/teams/${awayTeamID}`}>
                      <img
                        src={awayTeamData.data.team.logos[0].href}
                        height="25"
                        alt="team logo"
                      />
                      <span>{awayTeamData.data.team.nickname}</span>
                    </S.TeamLink>
                  </div>

                  <span>
                    {scoreIsFinal ? (
                      <>
                        {scoreAwayTeam > scoreHomeTeam
                          ? <S.TextColorLost>LOST</S.TextColorLost>
                          : scoreAwayTeam === scoreHomeTeam
                            ? "TIE"
                            : <S.TextColorWon>WON</S.TextColorWon>}
                      </>
                    ) : (
                      ""
                    )}
                  </span>
                </S.ScoreRowCompetitorDetails>
              )}
              {scoreIsFinal ? (
                <S.ScoreRowScores>
                  {scoreAwayTeam > scoreHomeTeam
                    ? ` ${scoreAwayTeam}-${scoreHomeTeam}`
                    : ` ${scoreHomeTeam}-${scoreAwayTeam}`}
                </S.ScoreRowScores>
              ) : (
                <span>{formatDateShort(event.date)}</span>
              )}
            </S.ScoreRowGamePreview>

            <Link to={`/games/${event.id}`} state={{ from: { awayTeamID, homeTeamID, awayTeamData, homeTeamData } }} >
              <Button>See Game Summary</Button>
            </Link>
          </>
        )}
      </S.GameContainer>
    </>
  );
}
