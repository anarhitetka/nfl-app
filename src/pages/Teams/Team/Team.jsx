import { useParams } from "react-router-dom";
import { ApiCalls } from "../../../utils/apiCalls";
import LinearProgress from '@mui/material/LinearProgress';
import * as S from "./Team.styled";
import Tabs from "./Tabs/Tabs";
import TeamHeader from "../../../components/TeamHeader/TeamHeader";

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

        <div
          style={{ backgroundColor: "#" + teamData.data.team.color, color: "white" }}
        >
          {/* <S.TeamHeader>
            <div>
              <S.TeamName>{teamData.data.team.displayName}</S.TeamName>
              <p>{teamData.data.team.standingSummary}</p>
            </div>

            <img
              src={teamData.data.team.logos[0].href}
              height="150"
              alt="team logo"
            />
          </S.TeamHeader> */}
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
