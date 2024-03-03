function handleCSVUpload(event) {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
  
    const reader = new FileReader();
    reader.onload = function(event) {
      const text = event.target.result;
      const coordinates = parseCSV(text);
      plotCoordinatesOnMap(coordinates);
    };
    reader.readAsText(file);
  }
  
  function parseCSV(csvText) {
    // Split the text into lines
    const lines = csvText.trim().split("\n");
    const coordinates = lines.map(line => {
      // Assuming the CSV separator is a comma
      const [lat, lng] = line.split(",");
      return { lat: parseFloat(lat), lng: parseFloat(lng) };
    });
    return coordinates;
  }
  
  function plotCoordinatesOnMap(coordinates) {
    coordinates.forEach(({ lat, lng }) => {
      L.marker([lat, lng], {
        icon: L.divIcon({
          className: 'custom-div-icon',
          html: "<div style='background-color: red; width: 10px; height: 10px; border-radius: 50%;'></div>",
          iconSize: [10, 10],
          iconAnchor: [5, 5]
        })
      }).addTo(window.map); // Ensure `map` is a global variable or accessible in this context
    });
  }
  