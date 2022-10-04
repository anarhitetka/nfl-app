import axios from "axios";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LayoutPage from "./components/LayoutPage";
import Teams from "./components/Teams";
import Team from "./components/Team";
import Weeks from "./components/Weeks";
import WeekGames from "./components/WeekGames";

function App() {
  // TODO: extract fetching
  const [teamEndpoints, setTeamEndpoints] = useState([]);
  const [teamData, setTeamData] = useState([]);

  const getTeamEndpoints = async () => {
    const { data } = await axios(
      "http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2022/teams/"
    );
    // console.log(data.count);
    let linksTeams = [];
    for (let i = 0; i < data.count + 2; i++) {
      linksTeams.push(
        `http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2022/teams/${
          i + 1
        }`
      );
    }
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

  // console.log(teamData);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LayoutPage />}>
          <Route index element={<Teams teamInfo={teamData} />} />
          <Route path=":teamId" element={<Team teamInfo={teamData} />} />
          <Route path="weeks" element={<Weeks />}>
            <Route path=":weekNo" element={<WeekGames />} />
          </Route>
        </Route>
        <Route path="*" element={<p>Page not found</p>} />
      </Routes>
    </Router>
  );
}

export default App;
