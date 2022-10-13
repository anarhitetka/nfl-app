import { Outlet } from "react-router-dom";
import styled from "styled-components";

import MUIScrollableTabBar from "./MUIScrollableTabBar";

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
`;

export default function Weeks({ weekNo, allWeeksData }) {
  return (
    <div>
      <StyledDiv>
        <MUIScrollableTabBar weeksData={allWeeksData} currentWeek={weekNo} />
      </StyledDiv>
      <Outlet />
    </div>
  );
}
