import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LayoutPage from "./components/LayoutPage";
import Teams from "./components/Teams";
import Team from "./components/Team";
import Weeks from "./components/Weeks";
import WeekGames from "./components/WeekGames";
import WeekSelected from "./components/WeekSelected";

import { useFetchMultipleEndpoints } from "./utils/useFetchMultipleEndpoints";

function App() {
  const weeksData = useFetchMultipleEndpoints(
    "http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2022/types/2/weeks/"
  );

  const getCurrentWeekNo = () => {
    let current = weeksData.data.find((week) => {
      return new Date() < new Date(week.endDate);
    });
    let weekNo = 1;
    if (current) weekNo = current.number;
    return weekNo;
  };

  const weekNo = getCurrentWeekNo();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LayoutPage />}>
          <Route index path="/" element={<div>hi</div>} />
          <Route path="teams" element={<Teams />} />
          <Route path="teams/:teamId" element={<Team />} />
          <Route path="weeks" element={<Weeks />}>
            <Route index element={<WeekSelected weekNo={weekNo} />} />
            <Route path=":weekNo" element={<WeekGames />} />
          </Route>
        </Route>
        <Route path="*" element={<p>Page not found</p>} />
      </Routes>
    </Router>
  );
}

export default App;
