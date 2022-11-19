import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiCalls } from "../utils/apiCalls";
import { CircularProgress } from "@mui/material";
import Game from "./Game";
import * as S from "./Team.styled";

export default function Team() {
  const { teamId } = useParams();

  // GET DATA ABOUT THE TEAM:
  const [teamData, setTeamData] = useState();

  useEffect(() => {
    ApiCalls.getTeamData(teamId).then((data) =>
      setTeamData(data)
    );
  }, [teamId]);

  // GET ENDPOINTS FOR THE EVENTS OF THE TEAM:
  const [eventsEndpoints, setEventsEndpoints] = useState([]);

  useEffect(() => {
    setEventsEndpoints([]);
    ApiCalls.getTeamEvents(teamId).then((data) =>
      setEventsEndpoints(data.items)
    );
  }, [teamId]);

  // // GET DATA FOR ALL EVENTS FOR THE TEAM FROM EVENTS ENDPOINTS:
  const [eventsData, setEventsData] = useState([]);

  useEffect(() => {
    setEventsData([]);
    eventsEndpoints.forEach(endpoint => {
      ApiCalls.getDataFromEndpoint(endpoint.$ref).then(data => setEventsData((prev) => [...prev, data]))
    });
  }, [eventsEndpoints]);

  return (
    <div>
      {/* TEAM HEADER  */}
      {!teamData ? (
        <CircularProgress />
      ) : (
        <div
          style={{ backgroundColor: "#" + teamData.color, color: "white" }}
        >
          <S.TeamHeader>
            <h1>{teamData.displayName}</h1>
            <img
              src={teamData.logos[0].href}
              height="150"
              alt="team logo"
            />
          </S.TeamHeader>
        </div>
      )}

      {/* TEAM DETAILS  */}
      <div>
        {!eventsData && <CircularProgress />}
        <S.TeamDetails>
          {/* TEAM SCHEDULE  */}
          <S.GamesContainer>
            <S.HeadingH2>Schedule</S.HeadingH2>
            {!eventsData ? (
              <CircularProgress />
            ) : (
              eventsData.map((event) => {
                return (
                  <Game
                    event={event}
                    key={`game-${event.id}-team-${teamId}`}
                    weekNo={true}
                    teamId={teamId}
                    type="preview" />
                );
              })
            )}
          </S.GamesContainer>
          <>
            {/* VENUE INFO  */}
            {!teamData ? (
              <CircularProgress />
            ) : (
              <S.VenueDetails>
                <p>
                  <strong>Venue: </strong>
                  {teamData.venue.fullName} <br />
                  {teamData.venue.capacity} seats (
                  {teamData.venue.indoor ? "indoor" : "outdoor"}
                  {teamData.venue.grass ? "  - grass" : ""})
                </p>
                <p>
                  <strong>Location:</strong> {teamData.location}
                </p>
                {teamData.venue.images.map((image) => {
                  return (
                    <div key={Math.random()}>
                      <img src={image.href} height="200" alt="venue" />
                      <br />
                    </div>
                  );
                })}
              </S.VenueDetails>
            )}
          </>
        </S.TeamDetails>
      </div>
    </div >
  );
}
