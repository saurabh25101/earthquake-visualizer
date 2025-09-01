const FEED = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

export async function fetchUSGS() {
  const res = await fetch(FEED);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  return json.features || [];
}
