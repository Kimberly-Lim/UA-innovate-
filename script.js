// Set the dimensions and margins of the map
const width = 960;
const height = 600;

// Append SVG map container in the body of the page
const svg = d3.select("#map");

// Define map projection
const projection = d3.geoMercator()
    .scale(100)
    .translate([width / 2, height / 2]);

// Define path generator
const path = d3.geoPath().projection(projection);

// Load and display the world or specific country map
// For this example, we'll assume you have a GeoJSON file named "map.geojson"
d3.json("map.geojson").then(function(geojson) {
    svg.selectAll("path")
        .data(geojson.features)
        .enter().append("path")
        .attr("d", path)
        .attr("fill", "lightgray")
        .attr("stroke", "white");

    // Example bounding box [minX, minY, maxX, maxY]
    const bbox = [/* Define your bounding box here */];

    // Zoom to bounding box function
    function zoomToBoundingBox(bbox) {
        const [[x0, y0], [x1, y1]] = [projection([bbox[0], bbox[3]]), projection([bbox[2], bbox[1]])];
        const scale = 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height);
        const translate = [(width - scale * (x0 + x1)) / 2, (height - scale * (y0 + y1)) / 2];

        svg.transition().duration(750).attr("transform", `translate(${translate})scale(${scale})`);
    }

    // Call the zoom function (you can replace this with an event listener or a specific condition)
    zoomToBoundingBox(bbox);
});
