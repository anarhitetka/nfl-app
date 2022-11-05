import { useParams } from "react-router-dom";
import { useFetchMultipleEndpoints } from "../utils/useFetchMultipleEndpoints";
import { useFetchSingleEndpoint } from "../utils/useFetchSingleEndpoint";
import { CircularProgress } from "@mui/material";
import Game from "./Game";
import * as S from "./Team.styled";

export default function Team() {
  const { teamId } = useParams();

  const teamData = useFetchSingleEndpoint(
    `https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/teams/`,
    teamId
  );

  const eventsData = useFetchMultipleEndpoints(
    `http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2022/teams/${teamId}/events`
  );
  return (
    <div>
      {/* TEAM HEADER  */}
      {teamData.isLoading ? (
        <CircularProgress />
      ) : (
        <div
          style={{ backgroundColor: "#" + teamData.data.color, color: "white" }}
        >
          <S.TeamHeader>
            <h1>{teamData.data.displayName}</h1>
            <img
              src={teamData.data.logos[0].href}
              height="150"
              alt="team logo"
            />
          </S.TeamHeader>
        </div>
      )}

      {/* TEAM DETAILS  */}
      <div>
        {eventsData.isLoading && <CircularProgress />}
        <S.TeamDetails>
          {/* TEAM SCHEDULE  */}
          <S.GamesContainer>
            <S.HeadingH2>Schedule</S.HeadingH2>
            {eventsData.isLoading ? (
              <CircularProgress />
            ) : (
              eventsData.data.map((event) => {
                return (
                  <div key={event.id}>
                    <Game
                      event={event}
                      key={event.id}
                      weekNo={true}
                      teamId={teamId}
                      type="preview"
                    />
                  </div>
                );
              })
            )}
          </S.GamesContainer>
          <>
            {/* VENUE INFO  */}
            {teamData.isLoading ? (
              <CircularProgress />
            ) : (
              <S.VenueDetails>
                <p>
                  <strong>Venue: </strong>
                  {teamData.data.venue.fullName} <br />
                  {teamData.data.venue.capacity} seats (
                  {teamData.data.venue.indoor ? "indoor" : "outdoor"}
                  {teamData.data.venue.grass ? "  - grass" : ""})
                </p>
                <p>
                  <strong>Location:</strong> {teamData.data.location}
                </p>
                {teamData.data.venue.images.map((image) => {
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
    </div>
  );
}
