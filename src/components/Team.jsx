import { useParams } from "react-router-dom";
import { useFetchMultipleEndpoints } from "../utils/useFetchMultipleEndpoints";
import { useFetchSingleEndpoint } from "../utils/useFetchSingleEndpoint";
import Game from "./Game";

export default function Team() {
  const { teamId } = useParams();

  const teamData = useFetchSingleEndpoint(
    `https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/teams/${teamId}`
  );

  const eventsData = useFetchMultipleEndpoints(
    `http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2022/teams/${teamId}/events`
  );

  return (
    <div>
      {teamData.isLoading ? (
        "loading team info"
      ) : (
        <div>
          <img src={teamData.data.logos[0].href} height="100" alt="team logo" />
          <h1>
            {teamData.data.abbreviation}: {teamData.data.displayName}
          </h1>
          colors:
          <p style={{ backgroundColor: "#" + teamData.data.color }}>.</p>
          <p style={{ backgroundColor: "#" + teamData.data.alternateColor }}>
            .
          </p>
          <p>
            <strong>Venue:</strong>
            <br />
            {teamData.data.venue.fullName} <br />
            capacity: {teamData.data.venue.capacity} <br />
            indoor: {teamData.data.venue.indoor ? "yes" : "no"} <br />
            grass: {teamData.data.venue.grass ? "yes" : "no"}
          </p>
          <p>
            <strong>Location:</strong> {teamData.data.location}
          </p>
          {teamData.data.venue.images.map((image) => {
            return (
              <img
                src={image.href}
                height="100"
                alt="venue"
                key={Math.random()}
              />
            );
          })}
          <hr />
        </div>
      )}

      <div>
        {eventsData.isLoading && <p>Loading games...</p>}
        <h2>Games:</h2>
        <hr />
        {eventsData.isLoading
          ? "loading games"
          : eventsData.data.map((event) => {
              return (
                <div key={event.id}>
                  <Game event={event} />
                </div>
              );
            })}
      </div>
    </div>
  );
}
