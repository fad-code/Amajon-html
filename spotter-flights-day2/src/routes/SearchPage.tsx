import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AirportCombobox from "../components/AirportCombobox";

export default function SearchPage(){
  const nav = useNavigate();
  const [from, setFrom] = useState<any>(null);
  const [to, setTo] = useState<any>(null);
  const [date, setDate] = useState<string>("");

  return (
    <div className="max-w-3xl mx-auto p-4 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Spotter Flights</h1>
      <AirportCombobox placeholder="From" onSelect={setFrom} />
      <AirportCombobox placeholder="To" onSelect={setTo} />
      <input className="border rounded-xl px-3 py-2" type="date" value={date} onChange={(e)=>setDate(e.target.value)} />
      <button className="px-4 py-3 rounded-xl bg-black text-white disabled:opacity-50"
        disabled={!from || !to || !date}
        onClick={()=> nav(`/results?from=${from.id}&to=${to.id}&date=${date}`)}>
        Search flights
      </button>
    </div>
  );
}
