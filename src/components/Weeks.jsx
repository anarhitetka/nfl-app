import { Link, Outlet } from "react-router-dom";
import { useFetchMultipleEndpoints } from "../utils/useFetchMultipleEndpoints";

export default function Weeks() {
  const weeksData = useFetchMultipleEndpoints(
    "http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2022/types/2/weeks/"
  );

  return (
    <>
      <div>
        <div>
          <ul>
            {weeksData.data.map((week) => {
              return (
                <Link
                  key={`${week.text}`}
                  style={{ padding: "5px" }}
                  to={`/weeks/${week.number}`}
                >
                  {week.text}
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
      <Outlet />
    </>
  );
}
