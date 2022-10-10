import Game from "./Game";
import styled from "styled-components";

import { useFetchMultipleEndpoints } from "../utils/useFetchMultipleEndpoints";

const GamesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export default function WeekSelected({ weekNo }) {
  const gamesData = useFetchMultipleEndpoints(
    `http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2022/types/2/weeks/${weekNo}/events`
  );
  return (
    <>
      <h3>Week {weekNo}</h3>
      <GamesContainer>
        {gamesData.data &&
          gamesData.data.map((event) => {
            return (
              <Game
                event={event}
                key={`${event.id}-${Math.random().toString()}`}
              />
            );
          })}
      </GamesContainer>
    </>
  );
}
