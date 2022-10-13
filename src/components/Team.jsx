import { useParams } from "react-router-dom";
import { useFetchMultipleEndpoints } from "../utils/useFetchMultipleEndpoints";
import { useFetchSingleEndpoint } from "../utils/useFetchSingleEndpoint";
import Game from "./Game";

import styled from "styled-components";

import { CircularProgress } from "@mui/material";

const GamesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
`;

const StyledDivTeamHeader = styled.div`
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    margin-left: 30px;
  }
`;

const StyledHeadingH2 = styled.h2`
  text-align: center;
`;

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
          <StyledDivTeamHeader>
            <h1>{teamData.data.displayName}</h1>
            <img
              src={teamData.data.logos[0].href}
              height="150"
              alt="team logo"
            />
          </StyledDivTeamHeader>

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
        <StyledHeadingH2>Schedule</StyledHeadingH2>
        <GamesContainer>
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
        </GamesContainer>
      </div>
    </div>
  );
}
