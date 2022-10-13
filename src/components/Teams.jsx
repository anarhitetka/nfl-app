import styled from "styled-components";
import { Link, Outlet } from "react-router-dom";

import { useFetchMultipleEndpoints } from "../utils/useFetchMultipleEndpoints";

const StyledDivContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const StyledDiv = styled.div`
  box-sizing: border-box;
  border: 1px solid grey;
  width: 120px;
  margin: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const StyledH4 = styled.h4`
  padding: 5px;
  height: 50px;
  display: flex;
  align-items: center;
`;

const StyledLink = styled(Link)`
  box-sizing: border-box;
  border: 3px solid transparent;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;

  height: 100%;
  text-decoration: none;
  color: black;
  &:hover,
  &:focus {
    border: 3px solid #013369;
  }
  &:active {
    color: grey;
  }
  // &:hover {
  //   img {
  //     height: 77px;
  //   }
  // }

  p {
    width: 100%;
  }
`;

export default function Teams() {
  const teamInfo = useFetchMultipleEndpoints(
    "https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/teams?limit=32"
  );
  return (
    <>
      {/* TODO: divide teams into groups AFC and NFC  */}
      <StyledDivContainer>
        {teamInfo.data.map((team) => {
          const {
            abbreviation,
            displayName,
            color,
            // alternateColor,
            //   location,
            logos,
            id,
            alternateIds,
            //   venue,
          } = team;
          return (
            <StyledDiv key={alternateIds.sdr}>
              <StyledLink to={`/teams/${id}`}>
                <p style={{ backgroundColor: "#" + color, color: "white" }}>
                  {abbreviation}
                </p>
                <img src={logos[0].href} height="80" alt="team logo" />
                <StyledH4>{displayName}</StyledH4>
              </StyledLink>
            </StyledDiv>
          );
        })}
      </StyledDivContainer>
      <Outlet />
    </>
  );
}
