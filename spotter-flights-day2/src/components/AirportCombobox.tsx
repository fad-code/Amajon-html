import { useEffect, useState } from "react";
import { rapid } from "../api/rapidapi";

type Opt = { id: string; name: string };

export default function AirportCombobox({ placeholder, onSelect }:{ placeholder:string; onSelect:(v:Opt)=>void }) {
  const [q, setQ] = useState("");
  const [items, setItems] = useState<Opt[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (q.length < 2) { setItems([]); return; }
    const t = setTimeout(async () => {
      setLoading(true);
      try {
        const { data } = await rapid.get("/api/v1/flights/searchAirport", { params: { query: q, locale: "en-US" } });
        const list: Opt[] = (data?.data ?? data?.places ?? data ?? []).map((p:any)=>({
          id: p.skyId ?? p.entityId ?? p.iata ?? p.id ?? "",
          name: p.presentation?.title ?? p.name ?? p.highlightedName ?? "",
        })).filter((x:Opt)=>x.id && x.name);
        setItems(list);
      } catch(e){ console.error(e); }
      finally{ setLoading(false); }
    }, 400);
    return () => clearTimeout(t);
  }, [q]);

  return (
    <div className="w-full">
      <input
        className="w-full border rounded-xl px-3 py-2"
        placeholder={placeholder}
        value={q}
        onChange={(e)=>setQ(e.target.value)}
      />
      {loading && <div className="text-sm mt-2">Searching…</div>}
      {!!items.length && (
        <div className="mt-2 max-h-60 overflow-auto border rounded-xl bg-white divide-y">
          {items.map((it) => (
            <button key={it.id}
              onClick={()=>{ onSelect(it); setQ(it.name); setItems([]); }}
              className="w-full text-left px-3 py-2 hover:bg-gray-50"
            >
              {it.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
