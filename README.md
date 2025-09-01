# 🌎 Earthquake Visualizer

A simple React + React-Leaflet app that visualizes earthquakes from the **USGS last 24 hours** feed.

## ✨ Features
- Interactive world map with circle markers sized & colored by magnitude
- Click a marker to see details (magnitude, place, depth, time, USGS link)
- Min magnitude filter (slider)
- Map/List views
- Auto-refresh every 5 minutes + manual refresh
- Clean, responsive UI with plain CSS (no Tailwind needed)

## 🛠 Tech
- React 18, Vite
- react-leaflet + leaflet
- OpenStreetMap tiles
- USGS GeoJSON feed

## 🚀 Run locally

```bash
# 1) Install deps
npm install

# 2) Start dev server
npm run dev
# Open the shown local URL (e.g., http://localhost:5173)
```

## 📦 Build
```bash
npm run build
npm run preview
```

## 🔗 Data Source
USGS Earthquake API (last 24 hours):
https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson

## 📝 Notes
- The Leaflet CSS is loaded from a CDN in `index.html`.
- If your markers appear under the tiles, ensure the Leaflet CSS loads correctly.
- You can deploy to Netlify/Vercel/Surge/Render or share via CodeSandbox by importing this repo.

— Generated on 2025-08-31
