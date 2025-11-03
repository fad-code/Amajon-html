export function formatCurrency(amount:number, currency="USD"){
  try { return new Intl.NumberFormat("en-US",{ style:"currency", currency }).format(amount); }
  catch { return `${currency} ${amount?.toLocaleString?.() ?? amount}`; }
}
export function formatDuration(mins?:number){
  if (!mins && mins !== 0) return "";
  const h = Math.floor(mins/60), m = mins%60;
  return `${h}h ${m}m`;
}
