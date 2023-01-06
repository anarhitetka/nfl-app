import { Outlet } from "react-router-dom";
import styled from "styled-components";

import MUIScrollableTabBar from "./MUIScrollableTabBar";

const S = {};
S.TabBar = styled.div`
  display: flex;
  justify-content: center;
`;

S.MainContainer = styled.div`
  background-color: white;
`;

export default function Weeks({ weekNo, allWeeksData }) {
  return (
    <S.MainContainer>
      <S.TabBar>
        <MUIScrollableTabBar weeksData={allWeeksData} currentWeek={weekNo} />
      </S.TabBar>
      <Outlet />
    </S.MainContainer>
  );
}
