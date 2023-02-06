import LinearProgress from "@mui/material/LinearProgress";

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
  errorInFetching,
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
        <div>
          {formatDateGetTimeOnly(event.date)}
          <span>
            ,{" "}
            {event.shortName === "TBD @ TBD"
              ? event.shortName.toUpperCase()
              : event.name.toUpperCase()}
          </span>
          : {(event.shortName === 'AFC @ NFC' || event.shortName === "NFC @ AFC") ? "PROBOWL" :
            !scoreIsFinal
              ? <em>GAME PENDING </em>
              : event.competitions[0].liveAvailable
                ? <strong>LIVE GAME </strong>
                : <strong>FINAL </strong>
          }
        </div>

        {scoreIsFinal ? (
          <S.PlayByPlayLink
            to={`/games/${event.id}`}
            state={{
              from: {
                gameName: event.name,
                awayTeamID,
                homeTeamID,
                awayTeamData,
                homeTeamData,
              },
            }}
          >
            SEE PLAY BY PLAY &gt;
          </S.PlayByPlayLink>
        ) : ""}

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
                {!awayTeamData.isLoading &&
                  weekNo <= 23 && (
                    <>

                      {awayTeamData.data.team.logos ? (
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
                              <span>
                                {awayTeamData.data.team.abbreviation}&nbsp;&nbsp;
                              </span>
                              {/* STATS  */}
                              <S.TeamStats>
                                {scoreIsFinal &&
                                  !awayTeamData.isLoading &&
                                  `(${awayTeamData.data.team.record.items[0].summary})`}
                              </S.TeamStats>
                            </S.TeamLink>

                            {/* SCORE  */}
                            <span>
                              {(event.shortName === 'AFC @ NFC' || event.shortName === 'NFC @ AFC')
                                ? <span>{scoreAwayTeam}</span>
                                : scoreIsFinal ? (
                                  <span>{scoreAwayTeam}</span>
                                ) : awayTeamData.isLoading ? (
                                  "loading stats"
                                ) : awayTeamData.data.team.record.items ? (
                                  <S.StatsForPendingGame>
                                    {awayTeamData.data.team.record.items[0].summary}
                                  </S.StatsForPendingGame>
                                ) : (
                                  ""
                                )}
                            </span>
                          </div>
                        </>

                      ) : (
                        <span>
                          {awayTeamData.data.team.abbreviation}
                        </span>
                      )}

                    </>
                  )}
              </S.TeamContainer>

              <S.AtSignGameScore>@</S.AtSignGameScore>

              <S.TeamContainer>
                {!homeTeamData.isLoading &&
                  weekNo <= 23 && (
                    <>
                      {homeTeamData.data.team.logos ? (
                        <>
                          <div>
                            {/* SCORE  */}
                            <span>
                              {(event.shortName === 'AFC @ NFC' || event.shortName === 'NFC @ AFC')
                                ? <span>{scoreHomeTeam}</span>
                                : scoreIsFinal ? (
                                  <span>{scoreHomeTeam}</span>
                                ) : homeTeamData.isLoading ? (
                                  "loading stats"
                                ) : homeTeamData.data.team.record.items ? (
                                  <S.StatsForPendingGame>
                                    {homeTeamData.data.team.record.items[0].summary}
                                  </S.StatsForPendingGame>
                                ) : (
                                  ""
                                )}
                            </span>

                            {/* LINK TO TEAM / STATS + ABBREVIATION  */}
                            <S.TeamLink to={`/teams/${homeTeamID}`}>
                              {/* STATS  */}
                              <S.TeamStats>
                                {scoreIsFinal &&
                                  !homeTeamData.isLoading &&
                                  `(${homeTeamData.data.team.record.items[0].summary})`}
                              </S.TeamStats>

                              <span>
                                &nbsp;&nbsp;{homeTeamData.data.team.abbreviation}
                              </span>
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
                      ) : (
                        <span className="right-tbd">{homeTeamData.data.team.abbreviation}</span>
                      )}


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
