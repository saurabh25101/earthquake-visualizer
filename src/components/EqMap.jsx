import React from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function colorForMag(mag = 0) {
  if (mag >= 6) return "#b30000";
  if (mag >= 5) return "#e34a33";
  if (mag >= 4) return "#fc8d59";
  if (mag >= 3) return "#fdcc8a";
  if (mag >= 2) return "#fef0d9";
  return "#d9f0a3";
}

export default function EqMap({ earthquakes }) {
  const center = [20, 0]; // near global center

  return (
    <div className="map-wrap">
      <MapContainer center={center} zoom={2} minZoom={2} className="map">
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {earthquakes.map((f) => {
          const [lon, lat, depth] = f.geometry.coordinates;
          const mag = f.properties.mag ?? 0;
          const radius = 2 + mag * 2.2;
          const color = colorForMag(mag);
          const time = new Date(f.properties.time);
          return (
            <CircleMarker
              key={f.id}
              center={[lat, lon]}
              radius={radius}
              pathOptions={{ color, fillColor: color, fillOpacity: 0.6 }}
            >
              <Popup>
                <div className="popup">
                  <div className="popup-title">
                    M {mag?.toFixed(1)} — {f.properties.place}
                  </div>
                  <div>Depth: {depth} km</div>
                  <div>Time: {time.toLocaleString()}</div>
                  <a href={f.properties.url} target="_blank" rel="noreferrer">
                    USGS details
                  </a>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
