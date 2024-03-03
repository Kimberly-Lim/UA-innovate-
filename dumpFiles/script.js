var zoom = d3.zoom()
    .scaleExtent([1, 8]);

svg.selectAll('path')
   .on('click', function(event, d) {
       // Define zoom transformation, e.g., scale by 2 and center on the clicked element
       var transform = d3.zoomIdentity.translate(width / 2, height / 2).scale(2).translate(-d.x, -d.y);
       svg.transition().duration(750).call(zoom.transform, transform);
   });

svg.call(zoom);

