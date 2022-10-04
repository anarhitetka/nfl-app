import Game from "./Game";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const GamesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export default function WeekGames() {
  const { weekNo } = useParams();
  const [weeksEndpoints, setWeeksEndpoints] = useState([]);
  const [weeksData, setWeeksData] = useState([]);

  // const formatDate = function (dateStr) {
  //   return `${new Date(dateStr).toDateString()} (Time Zone: ${
  //     Intl.DateTimeFormat().resolvedOptions().timeZone
  //   })`;
  // };
  useEffect(() => {
    const getWeeksEndpoints = async () => {
      const { data } = await axios(
        `http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2022/types/2/weeks/${weekNo}/events`
      );
      let linksAllWeeks = [];
      data.items.forEach((item) => linksAllWeeks.push(item.$ref));
      setWeeksEndpoints(linksAllWeeks);
    };

    getWeeksEndpoints();
  }, [weekNo]);

  useEffect(() => {
    Promise.all(
      weeksEndpoints.map((weeksEndpoint) => axios.get(weeksEndpoint))
    ).then((data) => {
      let weekArr = [];
      data.map((week) => {
        return weekArr.push(week.data);
        // return setWeeksData((prev) => {
        //   return [...prev, week.data];
        // });
      });
      setWeeksData(weekArr);
    });
  }, [weeksEndpoints, weekNo]);

  return (
    <GamesContainer>
      {weeksData &&
        weeksData.map((event) => {
          return (
            <Game
              event={event}
              key={`${event.id}-${Math.random().toString()}`}
            />
          );
        })}
    </GamesContainer>
  );
}
