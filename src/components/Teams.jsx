import { ApiCalls } from "../utils/apiCalls";
import { Outlet } from "react-router-dom";
import * as S from "./Teams.styled.js";

export default function Teams() {

  const allTeamsByGroup = [
    // American Football Conference
    { id: 'group-afc-east', groupName: 'AFC East', teams: ApiCalls.getAfcEastTeams().data },
    { id: 'group-afc-north', groupName: 'AFC North', teams: ApiCalls.getAfcNorthTeams().data },
    { id: 'group-afc-south', groupName: 'AFC South', teams: ApiCalls.getAfcSouthTeams().data },
    { id: 'group-afc-west', groupName: 'AFC West', teams: ApiCalls.getAfcWestTeams().data },
    // National Football Conference
    { id: 'group-nfc-east', groupName: 'NFC East', teams: ApiCalls.getNfcEastTeams().data },
    { id: 'group-nfc-north', groupName: 'NFC North', teams: ApiCalls.getNfcNorthTeams().data },
    { id: 'group-nfc-south', groupName: 'NFC South', teams: ApiCalls.getNfcSouthTeams().data },
    { id: 'group-nfc-west', groupName: 'NFC West', teams: ApiCalls.getNfcWestTeams().data },
  ];

  return (
    <>
      <S.TeamsContainer>

        {allTeamsByGroup.map(group => {

          return (
            <div key={group.id} style={{ border: '1px solid black', display: "flex", flexDirection: "column" }}>

              <div>
                <S.HeadingH4>{group.groupName}</S.HeadingH4>
              </div>

              <div style={{ display: "flex", flexDirection: "row", flexWrap: 'wrap' }}>

                {group.teams.map(team => {

                  const { abbreviation, displayName, color, logos, id, alternateIds } =
                    team;

                  return (
                    <S.TeamCard key={alternateIds.sdr}>
                      <S.TeamLink to={`/teams/${id}`}>
                        <p style={{ backgroundColor: "#" + color, color: "white" }}>
                          {abbreviation}
                        </p>
                        <img src={logos[0].href} height="80" alt="team logo" />
                        <S.HeadingH4>{displayName}</S.HeadingH4>
                      </S.TeamLink>
                    </S.TeamCard>
                  )

                })}

              </div>

            </div>
          )
        })}
      </S.TeamsContainer>
      <Outlet />
    </>
  );
}
