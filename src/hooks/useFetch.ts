import axios from "axios";
import { useEffect, useState } from "react";

interface IUrl {
  baseUrl: string;
  endpoint?: string;
  query?: string;
}

export default function useFetch({ baseUrl, endpoint = "", query = "" }: IUrl) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const url = `${baseUrl}${endpoint}${query ? query : ""}`;
        const { data } = await axios(url);
        setData(data);
        setError(null);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Unknown error occurred");
        }
        setData([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [baseUrl, endpoint, query]);

  return { data, isLoading, error };
}
