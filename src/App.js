import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LayoutPage from "./components/layout/LayoutPage";
import Home from "./pages/Home/Home";
import Teams from "./pages/Teams/Teams";
import Team from "./pages/Teams/Team/Team";
import Weeks from "./pages/Games/Weeks";
import WeekGames from "./pages/Games/Week/WeekGames";
import WeekSelected from "./pages/Games/Week/WeekSelected";
import GamePlayByPlay from "./pages/GamePlayByPlay/GamePlayByPlay";
import ErrorPage from "./pages/Error/ErrorPage";

import { setCurrentWeekNo } from "./utils/setCurrentWeek";
import { ApiCalls } from "./utils/apiCalls";

function App() {

  // NB: preseason = type 1, regular season = type 2, postseason = type 3, offseason type = 4
  const weeksRegularSeason = ApiCalls.getWeeksInfoForSeasonType('2');
  const weeksPostSeason = ApiCalls.getWeeksInfoForSeasonType('3');

  const allWeeksData = [...weeksRegularSeason.data, ...weeksPostSeason.data];
  // console.log(allWeeksData)
  const weekNo = setCurrentWeekNo(allWeeksData);
  // console.log(weekNo);

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
