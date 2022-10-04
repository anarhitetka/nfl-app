import axios from "axios";
import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

export default function Weeks() {
  const [weeksEndpoints, setWeeksEndpoints] = useState([]);
  const [weeksData, setWeeksData] = useState([]);

  // const formatDate = function (dateStr) {
  //   return `${new Date(dateStr).toLocaleString(undefined, {
  //     timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  //     dateStyle: "full",
  //     timeStyle: "full",
  //   })}`;
  // };

  const getWeeksEndpoints = async () => {
    const { data } = await axios(
      "http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2022/types/2/weeks/"
    );
    let linksAllWeeks = [];
    data.items.forEach((item) => linksAllWeeks.push(item.$ref));
    setWeeksEndpoints(linksAllWeeks);
  };

  useEffect(() => {
    getWeeksEndpoints();
  }, []);

  useEffect(() => {
    Promise.all(
      weeksEndpoints.map((weeksEndpoint) => axios.get(weeksEndpoint))
    ).then((data) => {
      data.map((week) => {
        return setWeeksData((prev) => {
          return [...prev, week.data];
        });
      });
    });
  }, [weeksEndpoints]);

  // console.log(weeksData);

  return (
    <>
      <div>
        <div>
          <ul>
            {weeksData.map((week) => {
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
