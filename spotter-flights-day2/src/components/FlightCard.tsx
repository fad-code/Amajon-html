import { formatCurrency, formatDuration } from "../lib/format";

export default function FlightCard({ item }:{ item:any }){
  const price = item?.price?.amount ?? item?.pricing_options?.[0]?.price?.amount;
  const currency = item?.price?.currency ?? item?.pricing_options?.[0]?.price?.currency ?? "USD";
  const legs = item?.legs ?? item?.segments ?? [];
  const first = legs[0]; const last = legs[legs.length - 1];

  return (
    <div className="rounded-2xl border p-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div>
        <div className="text-lg font-semibold">
          {first?.departure?.airport?.code} → {last?.arrival?.airport?.code}
        </div>
        <div className="text-sm text-gray-600">
          {first?.departure?.time} – {last?.arrival?.time} · {formatDuration(item?.duration || item?.totalDuration || 0)}
        </div>
        <div className="text-sm text-gray-500">{(item?.stops ?? (legs.length - 1))} stop(s)</div>
      </div>
      <div className="text-right">
        <div className="text-xl font-bold">{price ? formatCurrency(price, currency) : "—"}</div>
        <button className="mt-2 px-4 py-2 rounded-xl border hover:bg-gray-50">Select</button>
      </div>
    </div>
  );
}
