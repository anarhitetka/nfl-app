import LinearProgress from '@mui/material/LinearProgress';
import * as S from "./GameOnTeamSchedule.styled";
import { Link } from 'react-router-dom';
import { formatPlayoffsGamesNames } from '../../../utils/cleanUpDataHelpers';

export default function GameOnTeamSchedule({
  awayTeamData,
  homeTeamData,
  event,
  teamId,
  awayTeamID,
  homeTeamID,
  scoreIsFinal,
  scoreAwayTeam,
  scoreHomeTeam,
  postSeason,
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
              {postSeason && (
                <div>
                  <span>{formatPlayoffsGamesNames(Number(weekNumber))}: </span>{formatDate(event.date)}
                </div>
              )}
              {!postSeason && (
                <div>
                  <span>Week {weekNumber}:</span>{" "}
                  {formatDate(event.date)}{" "}
                </div>
              )}
              <Link to={`/games/${event.id}`} state={{ from: { awayTeamID, homeTeamID, awayTeamData, homeTeamData } }} style={{ textDecoration: "none" }}>
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
                          ? <S.TextWonTieLost>
                            <span className='lost'>LOST</span>
                          </S.TextWonTieLost>
                          : scoreAwayTeam === scoreHomeTeam
                            ? <S.TextWonTieLost>TIE</S.TextWonTieLost>
                            : <S.TextWonTieLost>
                              <span className='won'>WON</span>
                            </S.TextWonTieLost>}
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
                          ? <S.TextWonTieLost>
                            <span className='lost'>LOST</span>
                          </S.TextWonTieLost>
                          : scoreAwayTeam === scoreHomeTeam
                            ? <S.TextWonTieLost>TIE</S.TextWonTieLost>
                            : <S.TextWonTieLost>
                              <span className='won'>WON</span>
                            </S.TextWonTieLost>}
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
