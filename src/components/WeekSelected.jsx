import { useFetchMultipleEndpoints } from "../utils/useFetchMultipleEndpoints";
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
  const allGamesData = useFetchMultipleEndpoints(
    `http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2022/types/${
      weekNo <= 18 ? 2 : 3
    }/weeks/${weekNo <= 18 ? weekNo : weekNo - 18}/events`
  );

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
