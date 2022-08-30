import styled from "styled-components";

const Card = styled.div`
  border: 1px solid red;
`;

export default function TeamCard({ teamInfo }) {
  return (
    <>
      <div>
        {teamInfo.map((team) => {
          const {
            abbreviation,
            displayName,
            color,
            alternateColor,
            location,
            logos,
            // id,
            alternateIds,
            venue,
          } = team;
          return (
            <Card>
              <div key={alternateIds.sdr}>
                <p style={{ backgroundColor: "#" + color }}>.</p>
                <p style={{ backgroundColor: "#" + alternateColor }}>.</p>
                <h3>
                  {abbreviation}: {displayName} ({team.nickname})
                </h3>
                <p>
                  <strong>Location:</strong> {location}
                </p>
                <img src={logos[0].href} height="100" alt="team logo" />
                <p>
                  <strong>Venue:</strong>
                  <br />
                  {venue.fullName} <br />
                  capacity: {venue.capacity} <br />
                  indoor: {venue.indoor ? "yes" : "no"} <br />
                  grass: {venue.grass ? "yes" : "no"}
                </p>
                {venue.images.map((image) => {
                  return <img src={image.href} height="200" alt="venue" />;
                })}

                <hr />
              </div>
            </Card>
          );
        })}
      </div>
    </>
  );
}
