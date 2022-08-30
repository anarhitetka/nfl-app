import styled from "styled-components";

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
  //   height: 150px;
  padding: 10px;
  margin: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  //   justify-content: flex-start;
  //   display: flex;
  //   flex-direction: row;
  //   flex-wrap: wrap;
`;

const Heading = styled.h4`
  //   text-align: center;
`;

export default function TeamCard({ teamInfo }) {
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
            {/* <div key={alternateIds.sdr}> */}
            <img src={logos[0].href} height="100" alt="team logo" />
            <Heading>
              {abbreviation}: {displayName}
            </Heading>
            {/* colors
            <p style={{ backgroundColor: "#" + color }}>.</p>
            <p style={{ backgroundColor: "#" + alternateColor }}>.</p> */}
            {/* <p>
                <strong>Venue:</strong>
                <br />
                {venue.fullName} <br />
                capacity: {venue.capacity} <br />
                indoor: {venue.indoor ? "yes" : "no"} <br />
                grass: {venue.grass ? "yes" : "no"}
              </p>
              <p>
                <strong>Location:</strong> {location}
              </p>
              {venue.images.map((image) => {
                return (
                  <img
                    src={image.href}
                    height="100"
                    alt="venue"
                    key={Math.random()}
                  />
                );
              })} */}
            {/* <hr /> */}
            {/* </div> */}
          </Card>
        );
      })}
    </CardsContainer>
  );
}
