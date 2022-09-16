import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Game from "./Game";

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
    events,
    //   id,
    // alternateIds,
    venue,
  } = team;
  const [eventsEndpoints, setEventsEndpoints] = useState([]);
  const [eventsData, setEventsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getEventsEndpoints = async () => {
      try {
        const { data } = await axios(events.$ref);
        let linksAll = [];
        data.items.forEach((eventLink) => linksAll.push(eventLink.$ref));
        setEventsEndpoints(linksAll);
      } catch (error) {
        // console.error(error);
      }
    };
    getEventsEndpoints();
  }, [events.$ref]);

  useEffect(() => {
    setIsLoading(true);
    Promise.all(
      eventsEndpoints.map((eventEndpoint) => axios.get(eventEndpoint))
    ).then((data) => {
      data.map((event) => {
        return setEventsData((prev) => {
          return [...prev, event.data];
        });
      });
      setIsLoading(false);
    });
  }, [eventsEndpoints]);

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
      <hr />
      <div>
        {isLoading && <p>Loading games...</p>}
        <h2>Games:</h2>
        <hr />
        {isLoading
          ? "loading games"
          : eventsData.map((event) => {
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
