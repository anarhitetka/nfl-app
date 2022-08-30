import axios from "axios";
import { useState, useEffect } from "react";
import TeamCard from "./components/TeamCard";

function App() {
  const [teamEndpoints, setTeamEndpoints] = useState([]);
  const [teamData, setTeamData] = useState([]);

  const getTeamEndpoints = async () => {
    const { data } = await axios(
      "http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2022/teams/"
    );
    let linksTeams = [];
    data.items.forEach((item) => linksTeams.push(item.$ref));
    // array of strings (links for each team's endpoint)
    setTeamEndpoints(linksTeams);
  };

  useEffect(() => {
    getTeamEndpoints();
  }, []);

  useEffect(() => {
    Promise.all(
      teamEndpoints.map((teamEndpoint) => axios.get(teamEndpoint))
    ).then((data) => {
      data.map((team) => {
        return setTeamData((prev) => {
          return [...prev, team.data];
        });
      });
    });
  }, [teamEndpoints]);

  console.log(teamData);

  return (
    <>
      <div>
        <TeamCard teamInfo={teamData} />
      </div>
    </>
  );
}

export default App;
