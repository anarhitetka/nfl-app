import { useEffect, useState } from "react";
import { ApiCalls } from "../utils/apiCalls";

import { Outlet } from "react-router-dom";
import { useFetchMultipleEndpoints } from "../utils/useFetchMultipleEndpoints";

import * as S from "./Teams.styled.js";

export default function Teams() {
  // const teamInfo = useFetchMultipleEndpoints(
  //   "https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/teams?limit=32"
  // );

  const [allTeamsEndpoints, setAllTeamsEndpoints] = useState([]);

  useEffect(() => {
    ApiCalls.getAllTeamsEndpoints().then(data =>
      setAllTeamsEndpoints(data.items));
  }, []);

  const [allTeamsData, setAllTeamsData] = useState([]);

  useEffect(() => {
    setAllTeamsData([]);
    allTeamsEndpoints.forEach(endpoint => {
      ApiCalls.getDataFromEndpoint(endpoint.$ref).then(data =>
        setAllTeamsData(prev => [...prev, data]))
    });
  }, [allTeamsEndpoints]);

  //////////////////////////////////////
  const afc = useFetchMultipleEndpoints(
    "http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2022/types/2/groups/8/children"
  );
  const nfc = useFetchMultipleEndpoints(
    "http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2022/types/2/groups/7/children"
  );
  // console.log(afc.data);
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    afc.data.forEach((group) => {
      setGroups((prev) => {
        return { ...prev, [group.name]: group.teams.$ref };
        // return [...prev, { [group.name]: group.teams.$ref }];
        // return [...prev, { name: group.name, endpoint: group.teams.$ref }];
      });
    });
    nfc.data.forEach((group) => {
      setGroups((prev) => {
        return { ...prev, [group.name]: group.teams.$ref };
        // return [...prev, { [group.name]: group.teams.$ref }];
        // return [...prev, { name: group.name, endpoint: group.teams.$ref }];
      });
    });
  }, [afc.data, nfc.data]);
  // console.log(groups);
  ///////////////////////////
  return (
    <>
      {/* TODO: divide teams into groups AFC and NFC  */}
      <S.TeamsContainer>
        {allTeamsData.map((team) => {
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
