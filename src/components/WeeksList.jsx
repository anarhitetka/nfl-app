import axios from "axios";
import { useState, useEffect } from "react";

import WeekGames from "./WeekGames";

export default function WeeksList() {
  const [weeksEndpoints, setWeeksEndpoints] = useState([]);
  const [weeksData, setWeeksData] = useState([]);

  const formatDate = function (dateStr) {
    return `${new Date(dateStr).toDateString()} (Time Zone: ${
      Intl.DateTimeFormat().resolvedOptions().timeZone
    })`;
  };

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
      {weeksData.map((week) => {
        return (
          <div key={week.text}>
            <h3>{week.text}</h3>
            <p>Start date: {formatDate(week.startDate)}</p>
            <p>End date: {formatDate(week.endDate)}</p>
            <WeekGames events={week.events} number={week.number} />
          </div>
        );
      })}
    </>
  );
}
