import axios from "axios";
import { useState, useEffect } from "react";

export function useFetchSingleEndpoint(endpoint) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios(endpoint);
        setData(data);
        setIsLoading(false);
      } catch (error) {
        // console.error(error);
      }
    };
    getData();
  }, [endpoint]);

  return { data, isLoading };
}
