import axios from "axios";
import { useState, useEffect } from "react";

export function useFetchCombine(endpoints) {
  const [allEndpoints, setAllEndpoints] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    Promise.all(
      [
        "http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2022/types/2/weeks/",
        "http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2022/types/3/weeks",
      ].map((endpoint) => axios.get(endpoint))
    ).then((data) => {
      let dataArr = [];
      data.map((item) => {
        return item.data.items.map((ref) => {
          return dataArr.push(ref.$ref);
        });
      });
      setAllEndpoints(dataArr);
      if (dataArr.length > 0) setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    Promise.all(allEndpoints.map((endpoint) => axios.get(endpoint))).then(
      (data) => {
        let dataArr = [];
        data.map((dataItem) => {
          return dataArr.push(dataItem.data);
        });
        setData(dataArr);
      }
    );
  }, [allEndpoints]);

  return { data, isLoading };
}
