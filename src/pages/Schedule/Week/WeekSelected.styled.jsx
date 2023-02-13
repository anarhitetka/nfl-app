import styled from "styled-components";

export const AllGamesContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
`;
export const DayHeading = styled.h4`
  padding-left: 9vw;
  margin: 25px 0 15px 0;
  color: #013369;
  @media (min-width: 901px) {
    padding-left: 0;
    text-align: center;
  }
`;
export const GamesByDayGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
