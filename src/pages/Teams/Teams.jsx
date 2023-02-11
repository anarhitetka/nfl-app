import { ApiCalls } from "../../utils/apiCalls";
import * as S from "./Teams.styled.js";

export default function Teams() {

  const allTeamsByGroupAndConference = [
    {
      id: 'conf-afc', groups: [
        // American Football Conference
        { id: 'group-afc-east', groupName: 'AFC East', teams: ApiCalls.getAfcEastTeams().data },
        { id: 'group-afc-north', groupName: 'AFC North', teams: ApiCalls.getAfcNorthTeams().data },
        { id: 'group-afc-south', groupName: 'AFC South', teams: ApiCalls.getAfcSouthTeams().data },
        { id: 'group-afc-west', groupName: 'AFC West', teams: ApiCalls.getAfcWestTeams().data },
      ]
    },
    {
      id: 'conf-nfc', groups: [
        // National Football Conference
        { id: 'group-nfc-east', groupName: 'NFC East', teams: ApiCalls.getNfcEastTeams().data },
        { id: 'group-nfc-north', groupName: 'NFC North', teams: ApiCalls.getNfcNorthTeams().data },
        { id: 'group-nfc-south', groupName: 'NFC South', teams: ApiCalls.getNfcSouthTeams().data },
        { id: 'group-nfc-west', groupName: 'NFC West', teams: ApiCalls.getNfcWestTeams().data },
      ]
    },
  ];

  return (
    <>
      <S.AllTeamsContainer>
        {allTeamsByGroupAndConference.map(conf => {
          return (
            // CONFERENCES
            <S.Conference key={conf.id}>
              {conf.groups.map(group => {
                // GROUPS
                return (
                  <S.Division key={group.id}>
                    <S.DivisionName>{group.groupName}</S.DivisionName>
                    {/* TEAMS  */}
                    {group.teams.map(team => {
                      const { displayName, logos, alternateIds, venue, id } =
                        team;
                      return (
                        <S.TeamDiv key={alternateIds.sdr}>
                          <S.TeamNavLink to={`/teams/${id}`}>
                            <img src={logos[0].href} height="70" alt="team logo" className="logo-img" />
                            <div className="team-text">
                              <p className="team-display-name">{displayName}</p>
                              <div className="team-venue">
                                <p>{venue.fullName}</p>
                                <p>{venue.address.city}</p>
                              </div>
                            </div>
                          </S.TeamNavLink>
                        </S.TeamDiv>
                      )
                    })}
                  </S.Division>
                )
              })}
            </S.Conference>
          )
        })}
      </S.AllTeamsContainer>
    </>
  );
}
