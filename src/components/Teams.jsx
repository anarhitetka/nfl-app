import styled from "styled-components";
import { Link, Outlet } from "react-router-dom";

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

export default function Teams({ teamInfo }) {
  return (
    <CardsContainer>
      {teamInfo.map((team) => {
        const {
          abbreviation,
          displayName,
          //   color,
          //   alternateColor,
          //   location,
          logos,
          //   id,
          alternateIds,
          //   venue,
        } = team;
        return (
          <Card key={alternateIds.sdr}>
            <Link to={`/${alternateIds.sdr}`}>
              <img src={logos[0].href} height="100" alt="team logo" />
              <Heading>
                {abbreviation}: {displayName}
              </Heading>
            </Link>
          </Card>
        );
      })}
    </CardsContainer>
  );
}
