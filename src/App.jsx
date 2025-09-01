import React, { useEffect, useMemo, useState } from "react";
import { fetchUSGS } from "./utils/api";
import EqMap from "./components/EqMap";
import EqList from "./components/EqList";

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [minMag, setMinMag] = useState(0);
  const [view, setView] = useState("map"); // "map" | "list"
  const [updatedAt, setUpdatedAt] = useState(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchUSGS();
      setData(res);
      setUpdatedAt(new Date());
    } catch (e) {
      setError(e.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    const id = setInterval(load, 5 * 60 * 1000); // auto-refresh every 5 min
    return () => clearInterval(id);
  }, []);

  const filtered = useMemo(
    () => data.filter((d) => (d.properties.mag ?? 0) >= minMag),
    [data, minMag]
  );

  return (
    <div className="app">
      <header className="header">
        <h1>🌎 Earthquake Visualizer</h1>
        <div className="sub">
          USGS feed · last 24 hours
          {updatedAt && (
            <span className="pill" title={updatedAt.toString()}>
              Updated: {updatedAt.toLocaleString()}
            </span>
          )}
        </div>
      </header>

      <section className="toolbar">
        <label className="slider">
          <span>Min Magnitude: {minMag.toFixed(1)}</span>
          <input
            type="range"
            min="0"
            max="8"
            step="0.1"
            value={minMag}
            onChange={(e) => setMinMag(parseFloat(e.target.value))}
          />
        </label>

        <div className="buttons">
          <button onClick={() => setView("map")} className={view === "map" ? "active" : ""}>
            Map View
          </button>
          <button onClick={() => setView("list")} className={view === "list" ? "active" : ""}>
            List View
          </button>
          <button onClick={load} title="Refresh now">↻ Refresh</button>
        </div>
      </section>

      {loading && <div className="status">Loading earthquakes…</div>}
      {error && <div className="status error">Error: {error}</div>}

      {!loading && !error && (
        <div className="content">
          {view === "map" ? (
            <EqMap earthquakes={filtered} />
          ) : (
            <EqList earthquakes={filtered} />
          )}
        </div>
      )}

      <footer className="footer">
        <span>
          Data: <a href="https://earthquake.usgs.gov/" target="_blank" rel="noreferrer">USGS</a>. Tiles: © OpenStreetMap contributors.
        </span>
        <span>{filtered.length} events shown</span>
      </footer>
    </div>
  );
}
