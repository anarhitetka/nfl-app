import { ApiCalls } from "../utils/apiCalls";
import Game from "./Game";
import styled from "styled-components";

import { CircularProgress } from "@mui/material";

const S = {};
S.GamesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
`;

export default function WeekSelected({ weekNo }) {

  const allGamesData = ApiCalls.getEventsForWeek(weekNo);
  const teamsOnBye = ApiCalls.getTeamsOnByeForWeekNo(weekNo);
  console.log(teamsOnBye);

  // TODO: group games by day of the week

  return (
    <>
      <div>
        {/* Each team has one bye week between Weeks 6 and 14 (regular season) */}
        {weekNo >= 6 && weekNo <= 14 ? (
          teamsOnBye.isLoading ? (
            <CircularProgress />
          ) : (
            <div style={{ textAlign: "center" }} >
              <span>TEAMS ON BYE (week {weekNo}): </span>
              {teamsOnBye.data.map((team, i, arr) => {
                return (
                  <span key={`team-on-bye-${team.id}`} >{team.displayName}{i !== arr.length - 1 ? ', ' : ''} </span>
                )
              })}
            </div>
          )
        ) : "no teams are on bye for the selected week"}
      </div>

      {
        allGamesData.isLoading ? (
          <CircularProgress />
        ) : (
          <S.GamesContainer>
            {allGamesData.data &&
              allGamesData.data.map((event) => {
                return (
                  <Game
                    event={event}
                    key={`${event.id}-${Math.random().toString()}`}
                    weekNo={weekNo}
                    type="details"
                  />
                );
              })}
          </S.GamesContainer>
        )
      }
    </>
  );
}
