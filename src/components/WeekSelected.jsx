import { ApiCalls } from "../utils/apiCalls";
import Game from "./Game";
import styled from "styled-components";

import { CircularProgress } from "@mui/material";
import { groupByDayOfTheWeek } from "../utils/groupByDayOfTheWeek";

const S = {};
S.TeamsOnByeContainer = styled.div`
  text-align: left;
  padding: 15px 0 0 0;
  margin: auto 10%;
  font-size: 12px;
  color: #4c8bcf;
`;
S.AllGamesContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
`;
S.DayHeading = styled.h4`
  padding-left: 9vw;
  margin: 25px 0 15px 0;
  color: #013369;
`;
S.GamesByDayGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;


export default function WeekSelected({ weekNo }) {

  const allGamesData = ApiCalls.getEventsForWeek(weekNo);
  const teamsOnBye = ApiCalls.getTeamsOnByeForWeekNo(weekNo);
  const groupGamesByDayOfTheWeek = groupByDayOfTheWeek(allGamesData.data);

  const formatDate = function (dateStr) {
    return `${new Date(dateStr).toLocaleString(undefined, {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      dateStyle: "medium",
    })}`;
  };

  return (
    <div style={{ minHeight: "90vh" }}>
      <S.TeamsOnByeContainer>
        {!teamsOnBye.isLoading && teamsOnBye.data.length !== 0 ? (
          teamsOnBye.isLoading ? (
            <CircularProgress />
          ) : (
            <div>
              <span>TEAMS ON BYE (WEEK {weekNo}): </span>
              {teamsOnBye.data.map((team, i, arr) => {
                return (
                  <span key={`team-on-bye-${team.id}`} >{team.displayName.toUpperCase()}{i !== arr.length - 1 ? ', ' : ''} </span>
                )
              })}
            </div>
          )
        ) : <em>NO TEAMS ON BYE FOR SELECTED WEEK</em>}
      </S.TeamsOnByeContainer>

      {
        allGamesData.isLoading ? (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <CircularProgress />
          </div>
        ) : (
          <S.AllGamesContainer>
            {Object.keys(groupGamesByDayOfTheWeek).map((key) => {
              return (
                <div key={key}>
                  <S.DayHeading>
                    {key.toUpperCase()}, {formatDate(groupGamesByDayOfTheWeek[key][0].date).toUpperCase()}
                  </S.DayHeading>
                  <S.GamesByDayGroup>
                    {groupGamesByDayOfTheWeek[key].map(game => {
                      return (
                        <Game
                          event={game}
                          key={`${game.id}-${Math.random().toString()}`}
                          weekNo={weekNo}
                          type="details"
                        />
                      )
                    })}
                  </S.GamesByDayGroup>
                </div>
              )
            })}
          </S.AllGamesContainer>
        )
      }
    </div>
  );
}
