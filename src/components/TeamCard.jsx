export default function TeamCard({ teamInfo }) {
  return (
    <>
      <div>
        {teamInfo.map((team) => {
          return (
            <div key={team.alternateIds.sdr}>
              <p style={{ backgroundColor: "#" + team.color }}>.</p>
              <p style={{ backgroundColor: "#" + team.alternateColor }}>.</p>
              <h3>
                {team.abbreviation}: {team.displayName} ({team.nickname})
              </h3>
              <p>
                <strong>Location:</strong> {team.location}
              </p>
              <img src={team.logos[0].href} height="100" alt="team logo" />
              <p>
                <strong>Venue:</strong>
                <br />
                {team.venue.fullName} <br />
                capacity: {team.venue.capacity} <br />
                indoor: {team.venue.indoor ? "yes" : "no"} <br />
                grass: {team.venue.grass ? "yes" : "no"}
              </p>
              {team.venue.images.map((image) => {
                return <img src={image.href} height="200" alt="venue" />;
              })}

              <hr />
            </div>
          );
        })}
      </div>
    </>
  );
}
