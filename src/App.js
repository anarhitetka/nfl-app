import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LayoutPage from "./components/LayoutPage";
import Home from "./components/Home";
import Teams from "./components/Teams";
import Team from "./components/Team";
import Weeks from "./components/Weeks";
import WeekGames from "./components/WeekGames";
import WeekSelected from "./components/WeekSelected";
import GamePlayByPlay from "./components/GamePlayByPlay";
import ErrorPage from "./components/ErrorPage";

import { setCurrentWeekNo } from "./utils/setCurrentWeek";
import { ApiCalls } from "./utils/apiCalls";

function App() {

  // NB: preseason = type 1, regular season = type 2, postseason = type 3, offseason type = 4
  const weeksRegularSeason = ApiCalls.getWeeksInfoForSeasonType('2');
  const weeksPostSeason = ApiCalls.getWeeksInfoForSeasonType('3');

  const allWeeksData = [...weeksRegularSeason.data, ...weeksPostSeason.data];

  const weekNo = setCurrentWeekNo(allWeeksData);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LayoutPage />}>
          <Route index path="/" element={<Home />} />
          <Route path="teams" element={<Teams />} />
          <Route path="teams/:teamId" element={<Team />} />
          <Route path="games/:eventId" element={<GamePlayByPlay />} />
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
