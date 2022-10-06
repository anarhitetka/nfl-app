import styled from "styled-components";
import { Link, Outlet } from "react-router-dom";

import { useFetchMultipleEndpoints } from "../utils/useFetchMultipleEndpoints";

const CardsContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const Card = styled.div`
  box-sizing: border-box;
  border: 1px solid grey;
  width: 120px;
  // padding: 10px;
  margin: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const Heading = styled.h4`
  //   text-align: center;
`;

const LinkStyledComponent = styled(Link)`
  text-decoration: none;
  color: black;
  &:hover,
  &:focus {
    color: rgb(213, 10, 10);
  }
  &:active {
    color: grey;
  }
`;

export default function Teams() {
  const teamInfo = useFetchMultipleEndpoints(
    "https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/teams?limit=32"
  );
  return (
    <>
      <CardsContainer>
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
            <Card key={alternateIds.sdr}>
              <LinkStyledComponent to={`/teams/${id}`}>
                <p style={{ backgroundColor: "#" + color, color: "white" }}>
                  {abbreviation}
                </p>
                <img src={logos[0].href} height="100" alt="team logo" />
                <Heading>{displayName}</Heading>
              </LinkStyledComponent>
            </Card>
          );
        })}
      </CardsContainer>
      <Outlet />
    </>
  );
}
