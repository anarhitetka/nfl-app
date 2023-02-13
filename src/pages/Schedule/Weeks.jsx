import { Outlet } from "react-router-dom";
import styled from "styled-components";

import MUIScrollableTabBar from "./MUIScrollableTabBar/MUIScrollableTabBar";

const S = {};
S.TabBar = styled.div`
  display: flex;
  justify-content: center;
`;

S.MainContainer = styled.div`
  background: #B5BFCA;
  background: -webkit-linear-gradient(bottom right, #B5BFCA, #EEEEEE);
  background: -moz-linear-gradient(bottom right, #B5BFCA, #EEEEEE);
  background: linear-gradient(to top left, #B5BFCA, #EEEEEE);
`;

export default function Weeks({ weekNo, allWeeksData }) {
  return (
    <S.MainContainer>
      <S.TabBar>
        {/* {allWeeksData.length === 23 && */}
        <MUIScrollableTabBar weeksData={allWeeksData} currentWeek={weekNo} />
        {/* } */}
      </S.TabBar>
      <Outlet />
    </S.MainContainer>
  );
}
