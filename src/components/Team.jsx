import { useParams } from "react-router-dom";

export default function Team({ teamInfo }) {
  const { teamId } = useParams();
  const team = teamInfo.find((team) => team.alternateIds.sdr === teamId);
  const {
    abbreviation,
    displayName,
    color,
    alternateColor,
    location,
    logos,
    //   id,
    // alternateIds,
    venue,
  } = team;
  return (
    <div>
      <img src={logos[0].href} height="100" alt="team logo" />
      <h1>
        {abbreviation}: {displayName}
      </h1>
      colors:
      <p style={{ backgroundColor: "#" + color }}>.</p>
      <p style={{ backgroundColor: "#" + alternateColor }}>.</p>
      <p>
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
          <img src={image.href} height="100" alt="venue" key={Math.random()} />
        );
      })}
    </div>
  );
}
