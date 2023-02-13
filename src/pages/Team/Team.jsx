import { useParams } from "react-router-dom";
import { ApiCalls } from "../../utils/apiCalls";
import Tabs from "./TeamTabs/Tabs";
import TeamHeader from "./TeamHeader/TeamHeader";
import LinearProgress from '@mui/material/LinearProgress';
import * as S from "./Team.styled";

export default function Team() {
  const { teamId } = useParams();

  const teamData = ApiCalls.getTeamData(teamId);
  const eventsData = ApiCalls.getTeamEvents(teamId);
  const teamRecords = ApiCalls.getTeamRecords(teamId);

  const eventsRegularSeason = eventsData.data.filter(event => {
    return event.week.$ref.replace("http://", "https://").includes('types/2');
  });

  const eventsPostSeason = eventsData.data.filter(event => {
    return event.week.$ref.replace("http://", "https://").includes('types/3');
  });

  return (
    <S.TeamPageContainer>
      {/* TEAM HEADER  */}
      {teamData.isLoading ? (
        <LinearProgress />
      ) : (

        <div style={{ backgroundColor: "#" + teamData.data.team.color, color: "white" }}>
          <TeamHeader teamData={teamData} />
        </div>

      )}

      {/* TABS  */}
      {eventsRegularSeason.isLoading || eventsPostSeason.isLoading || teamRecords.isLoading ? (
        <LinearProgress />
      ) : (
        <Tabs
          teamId={teamId}
          eventsRegularSeason={eventsRegularSeason}
          eventsPostSeason={eventsPostSeason}
          teamRecords={teamRecords.data.items}
        />
      )}
    </S.TeamPageContainer>
  );
}
