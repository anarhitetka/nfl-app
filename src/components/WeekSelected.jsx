import { ApiCalls } from "../utils/apiCalls";
import Game from "./Game";
import styled from "styled-components";

import { CircularProgress } from "@mui/material";
import { groupByDayOfTheWeek } from "../utils/groupByDayOfTheWeek";

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
  const groupGamesByDayOfTheWeek = groupByDayOfTheWeek(allGamesData.data);

  return (
    <>
      <div>
        {!teamsOnBye.isLoading && teamsOnBye.data.length !== 0 ? (
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
            {Object.keys(groupGamesByDayOfTheWeek).map((key) => {
              return (
                <div key={key}>
                  <p>
                    {key}:
                  </p>
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

                </div>
              )
            })}
          </S.GamesContainer>
        )
      }
    </>
  );
}
