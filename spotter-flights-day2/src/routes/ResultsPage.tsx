import { useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useFlights } from "../hooks/useFlights";
import FlightCard from "../components/FlightCard";

export default function ResultsPage(){
  const [sp] = useSearchParams();
  const params = useMemo(()=>({
    fromId: sp.get("from")!,
    toId: sp.get("to")!,
    departDate: sp.get("date")!,
    adults: 1, currency: "USD", market: "US", locale: "en-US"
  }), [sp]);

  const { data, error, isLoading } = useFlights(params);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  const items = useMemo(()=>{
    const list = data?.itineraries ?? data?.data ?? data?.results ?? [];
    return list.filter((it:any)=>{
      const amt = it?.price?.amount ?? it?.pricing_options?.[0]?.price?.amount ?? Number.MAX_SAFE_INTEGER;
      return maxPrice ? amt <= maxPrice : true;
    });
  }, [data, maxPrice]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center justify-between mb-4 gap-4">
        <div>
          <div className="font-semibold">Results</div>
          <div className="text-gray-600 text-sm">{params.fromId} → {params.toId} on {params.departDate}</div>
        </div>
        <div className="flex items-center gap-2">
          <input type="number" placeholder="Max Price" className="border rounded-xl px-3 py-2 w-36"
            onChange={(e)=>setMaxPrice(e.target.value ? Number(e.target.value) : null)} />
          <Link to="/" className="text-sm underline">Change search</Link>
        </div>
      </div>

      {error && <div className="text-red-600">Error: {String(error)}</div>}
      {isLoading ? (
        <div className="space-y-3">
          {Array.from({length:5}).map((_,i)=>(<div key={i} className="h-24 rounded-2xl animate-pulse bg-gray-100" />))}
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((it:any, idx:number)=> <FlightCard key={idx} item={it} />)}
          {!items?.length && <div className="text-gray-500">No flights found.</div>}
        </div>
      )}
    </div>
  );
}
