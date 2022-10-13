import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LayoutPage from "./components/LayoutPage";
import Home from "./components/Home";
import Teams from "./components/Teams";
import Team from "./components/Team";
import Weeks from "./components/Weeks";
import WeekGames from "./components/WeekGames";
import WeekSelected from "./components/WeekSelected";
import ErrorPage from "./components/ErrorPage";

import { useFetchMultipleEndpoints } from "./utils/useFetchMultipleEndpoints";
import { setCurrentWeekNo } from "./utils/setCurrentWeek";

function App() {
  const weeksData = useFetchMultipleEndpoints(
    "http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2022/types/2/weeks/"
  );

  const weekNo = setCurrentWeekNo({ weeksData });

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LayoutPage />}>
          <Route index path="/" element={<Home />} />
          <Route path="teams" element={<Teams />} />
          <Route path="teams/:teamId" element={<Team />} />
          <Route path="weeks" element={<Weeks weekNo={weekNo} />}>
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
