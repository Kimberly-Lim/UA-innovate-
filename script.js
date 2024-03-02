// Pseudo-code for loading and displaying map and facilities
d3.json("path/to/us-map.json").then(function(usMapData) {
    // Initialize map using D3
    // This would involve creating an SVG element inside the #map div and drawing the map
});

// Pseudo-code to load facilities data
d3.csv("path/to/facilities.csv").then(function(facilitiesData) {
    // Process and display facilities on the map
    // Each facility could be represented by an SVG shape with event listeners for hover and click
    // On hover, display basic info (name, division, state)
    // On click, display detailed info in the #facility-details div
});

// Implement zoom and filter functionality
// Zoom could be achieved using d3.zoom()
// Filtering could involve redrawing the map with a subset of the facilities based on the selected criteria