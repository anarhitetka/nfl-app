import styled from "styled-components";
import { Link } from "react-router-dom";

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

export default function Teams({ teamInfo }) {
  return (
    <CardsContainer>
      {teamInfo
        .filter((t) => t.displayName !== "AFC" && t.displayName !== "NFC")
        .map((team) => {
          const {
            abbreviation,
            displayName,
            color,
            // alternateColor,
            //   location,
            logos,
            //   id,
            alternateIds,
            //   venue,
          } = team;
          return (
            <Card key={alternateIds.sdr}>
              <LinkStyledComponent to={`/${alternateIds.sdr}`}>
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
  );
}
