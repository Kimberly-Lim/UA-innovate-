function _1(md){return(
md

// Pan and zoom, or click to zoom into a particular state using [*zoom*.transform](https://d3js.org/d3-zoom#zoom_transform) transitions. The bounding box is computed using [*path*.bounds](https://d3js.org/d3-geo/path#path_bounds).`
)}

function _chart(d3,topojson,us)
{
  const width = 975;
  const height = 610;

  const zoom = d3.zoom()
      .scaleExtent([1, 8])
      .on("zoom", zoomed);

  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height])
       .attr("width", width)
      .attr("height", height)
      .attr("style", "max-width: 100%; height: auto;")
      .on("click", reset);

  const path = d3.geoPath();

  const g = svg.append("g");

  const states = g.append("g")
      .attr("fill", "#444")
      .attr("cursor", "pointer")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.states).features)
    .join("path")
      .on("click", clicked)
      .attr("d", path);
  
      states.append("title")
      .text(d => d.properties.name);

  g.append("path")
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-linejoin", "round")
      .attr("d", path(topojson.mesh(us, us.objects.states, (a, b) => a !== b)));

  // Load and display coordinates
  d3.csv("Coordinates_CSV.csv").then(data => {
    const points = g.append("g")
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", d => {
        const projection = d3.geoAlbersUsa();
        const coords = projection([+d.longitude, +d.latitude]);
        return coords ? coords[0] : null;
      })
      .attr("cy", d => {
        const projection = d3.geoAlbersUsa();
        const coords = projection([+d.longitude, +d.latitude]);
        return coords ? coords[1] : null;
      })
      .attr("r", 3)
      .attr("fill", "red")
      .attr("stroke", "white")
      .attr("stroke-width", 1);

    points.append("title")
      .text(d => `${d.name}\n${d.desc}`);
  });

  svg.call(zoom);

  function reset() {
    states.transition().style("fill", null);
    svg.transition().duration(750).call(
      zoom.transform,
      d3.zoomIdentity,
      d3.zoomTransform(svg.node()).invert([width / 2, height / 2])
    );
    
  }

  function clicked(event, d) {
    const [[x0, y0], [x1, y1]] = path.bounds(d);
    event.stopPropagation();
    states.transition().style("fill", null);
    d3.select(this).transition().style("fill", "blue");
    svg.transition().duration(750).call(
      zoom.transform,
      d3.zoomIdentity
        .translate(width / 2, height / 2)
        .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)))
        .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
      d3.pointer(event, svg.node())

    );
    
  }

  function zoomed(event) {
    const {transform} = event;
    g.attr("transform", transform);
    g.attr("stroke-width", 1 / transform.k);
  }

  return svg.node();
}


//function to open the side navigation 
// function openNav() {
//   document.getElementById("mySidenav").style.width = "250px"; //MAY HAVE TO ADJUST THIS VALUE

// }
//function to close the side navigation
// function closeNav() {
//   document.getElementById("mySidenav").style.width = "0";
// }

//event listener to see if a state has been clicked
//document.getElementById("states").addEventListener("click", openNav);

function _us(FileAttachment){return(
FileAttachment("states-albers-10m.json").json()
//FileAttachment("75faaaca1f1a4f415145b9db520349a3a0b93a53c1071346a30e6824586a7c251f45367d9262ed148b7a2b5c2694aa7703f3ac88051abc65066fd0074fdf9c9e.json").json()
)}



export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["states-albers-10m.json", {url: new URL("./files/75faaaca1f1a4f415145b9db520349a3a0b93a53c1071346a30e6824586a7c251f45367d9262ed148b7a2b5c2694aa7703f3ac88051abc65066fd0074fdf9c9e.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("chart")).define("chart", ["d3","topojson","us"], _chart);
  main.variable(observer("us")).define("us", ["FileAttachment"], _us);
  return main;
}




