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

          {/* VENUE INFO  */}
          {/* <p>
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
          })} */}
          {/* <hr /> */}
        </div>
      )}

      <div>
        {eventsData.isLoading && <CircularProgress />}
        <S.HeadingH2>Schedule</S.HeadingH2>
        <S.GamesContainer>
          {eventsData.isLoading ? (
            <CircularProgress />
          ) : (
            eventsData.data.map((event) => {
              return (
                <div key={event.id}>
                  <Game event={event} key={event.id} weekNo={true} />
                </div>
              );
            })
          )}
        </S.GamesContainer>
      </div>
    </div>
  );
}
