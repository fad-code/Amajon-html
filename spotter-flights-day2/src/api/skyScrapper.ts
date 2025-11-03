import { rapid } from "./rapidapi";

export async function suggestAirports(q: string, locale="en-US") {
  const { data } = await rapid.get("/api/v1/flights/searchAirport", {
    params: { query: q, locale },
  });
  return data;
}

export type SearchParams = {
  fromId: string; toId: string; departDate: string;
  returnDate?: string; adults?: number;
  currency?: string; market?: string; locale?: string;
  cabinClass?: "economy"|"premium_economy"|"business"|"first";
};

export async function startSearch(p: SearchParams) {
  const { data } = await rapid.get("/api/v1/flights/searchFlights", {
    params: {
      originSkyId: p.fromId,
      destinationSkyId: p.toId,
      date: p.departDate,
      returnDate: p.returnDate ?? "",
      adults: p.adults ?? 1,
      currency: p.currency ?? "USD",
      market: p.market ?? "US",
      locale: p.locale ?? "en-US",
      cabinClass: p.cabinClass ?? "economy",
    },
  });
  return data;
}

export async function pollResults(token: string) {
  const { data } = await rapid.get("/api/v1/flights/poll", { params: { token } });
  return data;
}
