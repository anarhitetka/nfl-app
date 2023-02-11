import { useParams } from "react-router-dom";
import { ApiCalls } from "../../../utils/apiCalls";
import LinearProgress from '@mui/material/LinearProgress';
import * as S from "./Team.styled";
import Tabs from "./Tabs/Tabs";

export default function Team() {
  const { teamId } = useParams();

  const teamData = ApiCalls.getTeamData(teamId);
  const eventsData = ApiCalls.getTeamEvents(teamId);
  const teamRecords = ApiCalls.getTeamRecords(teamId);

  const eventsRegularSeason = eventsData.data.filter(event => {
    return event.week.$ref.includes('types/2');
  });

  const eventsPostSeason = eventsData.data.filter(event => {
    return event.week.$ref.includes('types/3');
  });

  return (
    <S.TeamPageContainer>
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

      {/* TABS  */}
      <Tabs
        teamId={teamId}
        eventsRegularSeason={eventsRegularSeason}
        eventsPostSeason={eventsPostSeason}
        teamRecords={teamRecords.data.items}
      />
    </S.TeamPageContainer>
  );
}
