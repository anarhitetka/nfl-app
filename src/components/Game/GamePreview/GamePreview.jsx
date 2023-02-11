import LinearProgress from '@mui/material/LinearProgress';
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
      <S.GameContainer>
        {awayTeamData.isLoading || homeTeamData.isLoading ? (
          <LinearProgress />
        ) : (
          <>

            <S.DateInfoRow>
              <p><span>Week {weekNumber}:</span>{" "}
                {formatDate(event.date)}{" "}
              </p>
              <Link to={`/games/${event.id}`} state={{ from: { awayTeamID, homeTeamID, awayTeamData, homeTeamData } }} >
                <p className="play-by-play">PLAY BY PLAY</p>
              </Link>
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
                      <span className="team-nickname">{homeTeamData.data.team.nickname}</span>
                    </S.TeamLink>
                  </div>
                  <div className="score-won-lost">
                    {scoreIsFinal ? (
                      <S.ScoreRowScores>
                        {scoreAwayTeam > scoreHomeTeam
                          ? ` ${scoreAwayTeam}-${scoreHomeTeam}`
                          : ` ${scoreHomeTeam}-${scoreAwayTeam}`}
                      </S.ScoreRowScores>
                    ) : (
                      <span>{formatDateShort(event.date)}</span>
                    )}

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
                  </div>
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
                      <span className="team-nickname">{awayTeamData.data.team.nickname}</span>
                    </S.TeamLink>
                  </div>

                  <div className="score-won-lost">
                    {scoreIsFinal ? (
                      <S.ScoreRowScores>
                        {scoreAwayTeam > scoreHomeTeam
                          ? ` ${scoreAwayTeam}-${scoreHomeTeam}`
                          : ` ${scoreHomeTeam}-${scoreAwayTeam}`}
                      </S.ScoreRowScores>
                    ) : (
                      <span>{formatDateShort(event.date)}</span>
                    )}


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
                  </div>
                </S.ScoreRowCompetitorDetails>
              )}
            </S.ScoreRowGamePreview>
          </>
        )}
      </S.GameContainer>
    </>
  );
}
