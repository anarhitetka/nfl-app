import { Outlet } from "react-router-dom";
import styled from "styled-components";

import MUIScrollableTabBar from "./MUIScrollableTabBar";

const S = {};
S.TabBar = styled.div`
  display: flex;
  justify-content: center;
`;

export default function Weeks({ weekNo, allWeeksData }) {
  return (
    <div>
      <S.TabBar>
        <MUIScrollableTabBar weeksData={allWeeksData} currentWeek={weekNo} />
      </S.TabBar>
      <Outlet />
    </div>
  );
}
