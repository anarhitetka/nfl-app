import { useParams } from "react-router-dom";
import { ApiCalls } from "../utils/apiCalls";
import { CircularProgress } from "@mui/material";
import LinearProgress from '@mui/material/LinearProgress';
import Game from "./Game";
import * as S from "./Team.styled";

export default function Team() {
  const { teamId } = useParams();

  const teamData = ApiCalls.getTeamData(teamId);
  const eventsData = ApiCalls.getTeamEvents(teamId);

  const eventsRegularSeasonOnly = eventsData.data.filter(event => {
    return event.week.$ref.includes('types/2');
  });

  return (
    <div>
      {/* TEAM HEADER  */}
      {teamData.isLoading ? (
        <LinearProgress />
      ) : (

        <div
          style={{ backgroundColor: "#" + teamData.data.team.color, color: "white" }}
        >
          <S.TeamHeader>
            <div>
              <h1>{teamData.data.team.displayName}</h1>
              <p>{teamData.data.team.standingSummary}</p>
            </div>

            <img
              src={teamData.data.team.logos[0].href}
              height="150"
              alt="team logo"
            />


          </S.TeamHeader>
        </div>

      )}

      {/* TEAM DETAILS  */}
      <div style={{ backgroundColor: "white" }}>
        {eventsData.isLoading && <LinearProgress />}
        <S.TeamDetails>
          {/* TEAM SCHEDULE  */}
          <div>
            <S.HeadingH2>Schedule</S.HeadingH2>
            {eventsData.isLoading ? (
              <CircularProgress />
            ) : (
              <S.GamesContainer>
                {eventsRegularSeasonOnly.map((event) => {
                  return (
                    <Game
                      event={event}
                      key={`game-${event.id}-team-${teamId}`}
                      weekNo={true}
                      teamId={teamId}
                      type="preview"
                    />
                  );
                })}
              </S.GamesContainer>

            )}
          </div>
          <>
            {/* STATS SUMMARY VENUE INFO  */}
            {teamData.isLoading ? (
              <LinearProgress />
            ) : (

              <S.SummaryDetails>
                {/* <h3>{teamData.data.team.standingSummary}</h3> */}
                <h3>Summary</h3>
                {/* TOTAL  */}
                <p>Total: {teamData.data.team.record.items[0].summary}</p>
                {/* HOME RECORD  */}
                <p>{teamData.data.team.record.items[1].description}: {teamData.data.team.record.items[1].summary}</p>
                {/* AWAY RECORD  */}
                <p>{teamData.data.team.record.items[2].description}: {teamData.data.team.record.items[2].summary}</p>
                {/* NEXT EVENT  */}
                {/* <a target="blank" href={`https://www.espn.com/nfl/game/_/gameId/${teamData.data.team.nextEvent[0]?.id}`}>Link to next event on ESPN</a> */}

                {/* EXTERNAL LINKS  */}
                <p>External links (ESPN):</p>
                {teamData.data.team.links.map(link => {
                  return <p key={link.href}><a href={link.href} target="blank">{link.text}</a></p>
                })}

                {/* VENUE DETAILS  */}
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
              </S.SummaryDetails>
            )}
          </>
        </S.TeamDetails>
      </div>
    </div>
  );
}
