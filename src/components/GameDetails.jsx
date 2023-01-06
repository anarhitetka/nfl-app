import LinearProgress from '@mui/material/LinearProgress';

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
  const formatDateGetTimeOnly = function (dateStr) {
    return `${new Date(dateStr).toLocaleString(undefined, {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      // dateStyle: "medium",
      timeStyle: "short",
    })}`;
  };

  return (
    <>
      <S.GameHeading>
        {formatDateGetTimeOnly(event.date)}
        <span>, {
          event.shortName === "TBD @ TBD"
            ? event.shortName.toUpperCase()
            : event.name.toUpperCase()
        }</span>: {
          scoreIsFinal
            ? "FINAL"
            : <em>GAME PENDING</em>}
      </S.GameHeading>

      <S.GameContainerLong key={event.id}>
        {awayTeamData.isLoading || homeTeamData.isLoading ? (
          <div style={{ padding: "10px" }}>
            <LinearProgress />
          </div>
        ) : (
          <>
            <S.TeamsScoresRow>

              <S.TeamContainer>
                {!awayTeamData.isLoading && weekNo <= 18 && (
                  <>

                    {/* LINK TO TEAM / LOGO  */}
                    <S.TeamLink to={`/teams/${awayTeamID}`}>
                      <img
                        src={awayTeamData.data.team.logos[0].href}
                        height="25"
                        alt="team logo"
                      />
                    </S.TeamLink>

                    <div>

                      {/* LINK TO TEAM / ABBREVIATION + STATS  */}
                      <S.TeamLink to={`/teams/${awayTeamID}`}>
                        <span>{awayTeamData.data.team.abbreviation}&nbsp;&nbsp;</span>
                        {/* STATS  */}
                        <S.TeamStats>
                          {scoreIsFinal
                            && !awayTeamData.isLoading
                            && `(${awayTeamData.data.team.record.items[0].summary})`
                          }
                        </S.TeamStats>
                      </S.TeamLink>



                      {/* SCORE  */}
                      <span>
                        {scoreIsFinal
                          ? <span>{scoreAwayTeam}</span>
                          : awayTeamData.isLoading
                            ? "loading stats"
                            : awayTeamData.data.team.record.items[0].summary}
                      </span>

                    </div>

                  </>
                )}
              </S.TeamContainer>

              {
                event.shortName === "TBD @ TBD" || event.shortName === "AFC @ NFC" || event.shortName === "NFC @ AFC"
                  ? <em style={{ padding: "5px" }}>TBD</em>
                  : <S.AtSignGameScore>@</S.AtSignGameScore>
              }


              <S.TeamContainer>
                {!homeTeamData.isLoading && weekNo <= 18 && (
                  <>
                    <div>

                      {/* SCORE  */}
                      <span>
                        {scoreIsFinal
                          ? <span>{scoreHomeTeam}</span>
                          : homeTeamData.isLoading
                            ? "loading stats"
                            : homeTeamData.data.team.record.items[0].summary}
                      </span>



                      {/* LINK TO TEAM / STATS + ABBREVIATION  */}
                      <S.TeamLink to={`/teams/${homeTeamID}`}>
                        {/* STATS  */}
                        <S.TeamStats>
                          {scoreIsFinal
                            && !homeTeamData.isLoading
                            && `(${homeTeamData.data.team.record.items[0].summary})`
                          }
                        </S.TeamStats>

                        <span>&nbsp;&nbsp;{homeTeamData.data.team.abbreviation}</span>
                      </S.TeamLink>

                    </div>

                    {/* LINK TO TEAM / LOGO  */}
                    <S.TeamLink to={`/teams/${homeTeamID}`}>
                      <img
                        src={homeTeamData.data.team.logos[0].href}
                        height="25"
                        alt="team logo"
                      />
                    </S.TeamLink>

                  </>
                )}
              </S.TeamContainer>
            </S.TeamsScoresRow>
          </>
        )}
      </S.GameContainerLong>
    </>
  );
}
