import useSWR from "swr";
import { startSearch, pollResults } from "../api/skyScrapper";

export function useFlights(params: any) {
  const key = params?.fromId && params?.toId && params?.departDate ? ["search", params] : null;

  const { data, error, isLoading, mutate } = useSWR(key, async (_k, p) => {
    const start = await startSearch(p);

    if (start?.itineraries?.length) return start;

    const token = start?.token || start?.session_token || start?.sessionToken;
    if (!token) return start;

    for (let i = 0; i < 8; i++) {
      const res = await pollResults(token);
      if (res?.itineraries?.length || res?.complete) return res;
      await new Promise(r => setTimeout(r, 700 + i * 250));
    }
    return start;
  }, { revalidateOnFocus: false });

  return { data, error, isLoading, refresh: mutate };
}
