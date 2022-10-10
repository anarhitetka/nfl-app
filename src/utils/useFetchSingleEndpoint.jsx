import axios from "axios";
import { useState, useEffect } from "react";

export function useFetchSingleEndpoint(endpoint, id) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      const getData = async () => {
        try {
          const { data } = await axios(endpoint + id);
          setData(data);
          setIsLoading(false);
          // }
        } catch (error) {
          // console.error(error);
          setError(error);
        }
      };
      getData();
    }
  }, [endpoint, id]);

  return { data, isLoading, error };
}
