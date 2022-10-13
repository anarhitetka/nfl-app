import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LayoutPage from "./components/LayoutPage";
import Home from "./components/Home";
import Teams from "./components/Teams";
import Team from "./components/Team";
import Weeks from "./components/Weeks";
import WeekGames from "./components/WeekGames";
import WeekSelected from "./components/WeekSelected";
import ErrorPage from "./components/ErrorPage";

import { useFetchCombine } from "./utils/useFetchCombine";
import { setCurrentWeekNo } from "./utils/setCurrentWeek";

function App() {
  ////////////////////////////////////////////
  // fetch regular season and postseason weeks data (without preseason (type 1) or postseason (type 4))
  const allWeeksData = useFetchCombine([
    "http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2022/types/2/weeks/",
    "http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2022/types/3/weeks",
  ]);

  const weekNo = setCurrentWeekNo(allWeeksData);
  ////////////////////////////////////////////

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LayoutPage />}>
          <Route index path="/" element={<Home />} />
          <Route path="teams" element={<Teams />} />
          <Route path="teams/:teamId" element={<Team />} />
          <Route
            path="weeks"
            element={<Weeks weekNo={weekNo} allWeeksData={allWeeksData} />}
          >
            <Route index element={<WeekSelected weekNo={weekNo} />} />
            <Route path=":weekNo" element={<WeekGames />} />
          </Route>
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
