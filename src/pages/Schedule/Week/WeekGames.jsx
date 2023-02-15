import { useParams } from "react-router-dom";

import WeekSelected from "./WeekSelected";

export default function WeekGames({ durationRegSeason }) {
  const { weekNo } = useParams();

  return <WeekSelected weekNo={weekNo} durationRegSeason={durationRegSeason} />;
}
