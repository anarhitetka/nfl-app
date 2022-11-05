import { Outlet } from "react-router-dom";
import { useFetchMultipleEndpoints } from "../utils/useFetchMultipleEndpoints";

import * as S from "./Teams.styled.js";

export default function Teams() {
  const teamInfo = useFetchMultipleEndpoints(
    "https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/teams?limit=32"
  );

  return (
    <>
      {/* TODO: divide teams into groups AFC and NFC  */}
      <S.TeamsContainer>
        {teamInfo.data.map((team) => {
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
          );
        })}
      </S.TeamsContainer>
      <Outlet />
    </>
  );
}
