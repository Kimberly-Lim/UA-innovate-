# US Map Visualization with Location Coordinates

This project displays an interactive US map with location coordinates from a CSV file. The visualization includes:
- Interactive US state map
- Location markers for coordinates
- Zoom and pan functionality
- State highlighting on click
- Location information on hover

## Prerequisites

- Python 3.x
- Web browser (Chrome, Firefox, Safari, or Edge recommended)

## Files Included

- `index.html` - Main HTML file
- `index.js` - Module loader
- `runtime.js` - Observable runtime
- `aa1e5f87ad85f4f2@182.js` - Map visualization code
- `states-albers-10m.json` - US map data
- `Coordinates_CSV.csv` - Location coordinates data

## How to Run

1. Open a terminal/command prompt

2. Navigate to the CORRECTMAP directory:
   ```bash
   cd CORRECTMAP
   ```

3. Start the Python HTTP server:
   ```bash
   python3 -m http.server 8000
   ```

4. Open your web browser and go to:
   ```
   http://localhost:8000
   ```

## Using the Map

- **Pan**: Click and drag the map
- **Zoom**: Use mouse wheel or pinch gesture
- **State Selection**: Click on a state to zoom in
- **Location Info**: Hover over red dots to see location details
- **Reset View**: Click anywhere on the map to reset

## Troubleshooting

If you see a blank page:
1. Check the browser's console (F12) for errors
2. Ensure all files are in the correct directory
3. Verify the Python server is running
4. Try refreshing the page

If you get a "port in use" error:
1. Stop any existing Python servers (Ctrl+C)
2. Try a different port number (e.g., 8080)
3. Restart the server with the new port

## Dependencies

The visualization uses:
- D3.js (loaded from CDN)
- TopoJSON (loaded from CDN)
- Python's built-in HTTP server
