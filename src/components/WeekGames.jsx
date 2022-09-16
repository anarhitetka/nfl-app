import Game from "./Game";
import axios from "axios";
import { useState, useEffect } from "react";

export default function WeekGames({ events, number }) {
  //   console.log(events);

  const [weeksEndpoints, setWeeksEndpoints] = useState([]);
  const [weeksData, setWeeksData] = useState([]);

  const formatDate = function (dateStr) {
    return `${new Date(dateStr).toDateString()} (Time Zone: ${
      Intl.DateTimeFormat().resolvedOptions().timeZone
    })`;
  };

  const getWeeksEndpoints = async () => {
    const { data } = await axios(
      `http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2022/types/2/weeks/${number}/events`
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

  //   console.log(weeksData);
  return (
    <div>
      <p>all games for one week</p>
      {/* <Game event={events} /> */}
      {weeksData.map((event) => {
        return <Game event={event} key={event.id} />;
      })}
    </div>
  );
}
