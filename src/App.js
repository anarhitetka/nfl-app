import { Routes, Route } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import LayoutPage from "./components/layout/LayoutPage";
import Home from "./pages/Home/Home";
import Teams from "./pages/Teams/Teams";
import Team from "./pages/Team/Team";
import Weeks from "./pages/Schedule/Weeks";
import WeekGames from "./pages/Schedule/Week/WeekGames";
import WeekSelected from "./pages/Schedule/Week/WeekSelected";
import GamePage from "./pages/Game/GamePage";
import ErrorPage from "./pages/Error/ErrorPage";

import { setCurrentWeekNo } from "./utils/setCurrentWeek";
import { ApiCalls } from "./utils/apiCalls";

function App() {

  // const weeksPreSeason = ApiCalls.getWeeksInfoForSeasonType('1');
  const weeksRegularSeason = ApiCalls.getWeeksInfoForSeasonType('2');
  const weeksPostSeason = ApiCalls.getWeeksInfoForSeasonType('3');
  // const weeksOffSeason = ApiCalls.getWeeksInfoForSeasonType('4');

  const allWeeksData = [...weeksRegularSeason.data, ...weeksPostSeason.data];

  const weekNo = setCurrentWeekNo(allWeeksData);
  const durationRegSeason = weeksRegularSeason.data.length;

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LayoutPage />}>
          <Route index path="/" element={<Home />} />
          <Route path="teams" element={<Teams />} />
          <Route path="teams/:teamId" element={<Team />} />
          <Route path="games/:eventId" element={<GamePage />} />
          <Route
            path="weeks"
            element={<Weeks weekNo={weekNo} allWeeksData={allWeeksData} durationRegSeason={durationRegSeason} />}
          >
            <Route index element={<WeekSelected weekNo={weekNo} />} />
            <Route path=":weekNo" element={<WeekGames durationRegSeason={durationRegSeason} />} />
          </Route>
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
