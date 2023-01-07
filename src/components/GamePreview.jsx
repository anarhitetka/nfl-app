import { useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import MUIModalGameSummary from './MUIModalGameSummary.jsx';

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
  errorInFetching
}) {
  const [openSummaryModal, setOpenSummaryModal] = useState(false);
  const handleOpenSummaryModal = () => setOpenSummaryModal(true);
  const handleCloseSummaryModal = () => setOpenSummaryModal(false);


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
              {/* <button onClick={openGameDetailsModal}>Game Summary</button> */}

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

            {/* MODAL GAME SUMMARY */}
            <Button
              onClick={handleOpenSummaryModal}
            >
              See Game Summary
            </Button>
            <MUIModalGameSummary
              open={openSummaryModal}
              handleClose={handleCloseSummaryModal}
              eventId={event.id}
              gameName={event.name}
              awayTeamID={awayTeamID}
              homeTeamID={homeTeamID}
            />

          </>
        )}
      </S.GameContainer>
    </>
  );
}
