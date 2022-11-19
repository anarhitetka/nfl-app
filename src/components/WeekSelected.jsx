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

  // TODO: group games by day of the week

  return (
    <>
      {allGamesData.isLoading ? (
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
      )}
    </>
  );
}
