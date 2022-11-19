import { useParams } from "react-router-dom";
import { ApiCalls } from "../utils/apiCalls";
import { CircularProgress } from "@mui/material";
import Game from "./Game";
import * as S from "./Team.styled";

export default function Team() {
  const { teamId } = useParams();

  const teamData = ApiCalls.getTeamData(teamId);
  const eventsData = ApiCalls.getTeamEvents(teamId);

  return (
    <div>
      {/* TEAM HEADER  */}
      {teamData.isLoading ? (
        <CircularProgress />
      ) : (

        <div
          style={{ backgroundColor: "#" + teamData.data.team.color, color: "white" }}
        >
          <S.TeamHeader>
            <h1>{teamData.data.team.displayName}</h1>
            <img
              src={teamData.data.team.logos[0].href}
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
            {teamData.isLoading ? (
              <CircularProgress />
            ) : (
              <S.VenueDetails>
                <p>
                  <strong>Venue: </strong>
                  {teamData.data.team.franchise.venue.fullName} <br />
                  {teamData.data.team.franchise.venue.capacity} seats (
                  {teamData.data.team.franchise.venue.indoor ? "indoor" : "outdoor"}
                  {teamData.data.team.franchise.venue.grass ? "  - grass" : ""})
                </p>
                <p>
                  <strong>Location:</strong> {teamData.data.team.location}
                </p>
                {teamData.data.team.franchise.venue.images.map((image) => {
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
