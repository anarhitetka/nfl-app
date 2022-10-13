import axios from "axios";
import { useState, useEffect } from "react";

export function useFetchMultipleEndpoints(endpoint) {
  const [endpoints, setEndpoints] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getEndpoints = async () => {
      try {
        const { data } = await axios(endpoint);
        let endpointsArr = [];
        data.items.forEach((item) => {
          endpointsArr.push(item.$ref);
        });
        setEndpoints(endpointsArr);
      } catch (error) {
        // console.error(error);
      }
    };
    getEndpoints();
  }, [endpoint]);

  useEffect(() => {
    setIsLoading(true);
    Promise.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
      (data) => {
        let dataArr = [];
        data.map((dataItem) => {
          return dataArr.push(dataItem.data);
        });
        setData(dataArr);
        if (dataArr.length > 0) setIsLoading(false);
      }
    );
  }, [endpoints]);

  return { data, isLoading };
}
