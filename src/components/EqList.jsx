import React, { useMemo } from "react";

export default function EqList({ earthquakes }) {
  const rows = useMemo(() => {
    return [...earthquakes].sort((a, b) => (b.properties.mag ?? 0) - (a.properties.mag ?? 0));
  }, [earthquakes]);

  return (
    <div className="list">
      <table>
        <thead>
          <tr>
            <th>Magnitude</th>
            <th>Place</th>
            <th>Depth (km)</th>
            <th>Time</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((f) => {
            const [lon, lat, depth] = f.geometry.coordinates;
            const mag = f.properties.mag ?? 0;
            const time = new Date(f.properties.time);
            return (
              <tr key={f.id}>
                <td>M {mag.toFixed(1)}</td>
                <td>{f.properties.place}</td>
                <td>{depth}</td>
                <td>{time.toLocaleString()}</td>
                <td>
                  <a href={f.properties.url} target="_blank" rel="noreferrer">USGS</a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
