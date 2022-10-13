import { Outlet } from "react-router-dom";
import styled from "styled-components";

import { useFetchMultipleEndpoints } from "../utils/useFetchMultipleEndpoints";

import MUIScrollableTabBar from "./MUIScrollableTabBar";

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
`;

export default function Weeks({ weekNo }) {
  const weeksData = useFetchMultipleEndpoints(
    "http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2022/types/2/weeks/"
  );

  return (
    <div>
      <StyledDiv>
        <MUIScrollableTabBar weeksData={weeksData} currentWeek={weekNo} />
      </StyledDiv>
      <Outlet />
    </div>
  );
}
