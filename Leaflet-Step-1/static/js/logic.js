// https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson


// Create a map using Leaflet that plots all of the earthquakes from your data set based on their longitude and latitude.
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson"
d3.json(queryUrl, function(data) {
     createFeatures(data.features);
  });
  
  function createFeatures(earthquakeData) {
    // * Include popups that provide additional information about the earthquake when a marker is clicked.


    function onEachFeature(feature, layer) {
      layer.bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    }
  
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature
  });
 
    createMap(earthquakes);
  }
  
  function createMap(earthquakes) {

  var streetmap= L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={access_token}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });



var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token=access_token", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };


  var overlayMaps = {
    Earthquakes: earthquakes
  };
  var myMap = L.map("map", {
    center: [15.5994, -28.6731],
    zoom: 2,
    layers: [streetmap, earthquakes]
  });
L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}

//legend
var legend = L.control({ position: "bottomright" });
legend.onAdd = function() {
  var div = L.DomUtil.create("div", "info legend");
  
  div.innerHTML += "<ul>" + labels.join("") + "</ul>";
  return div;
};

// Adding legend to the map
legend.addTo(myMap);

};


// // * Your data markers should reflect the magnitude of the earthquake by their size and and depth of the earth quake by color. 
// //Earthquakes with higher magnitudes should appear larger and earthquakes with greater depth should appear darker in color.
// function markerSize(magnitude) {
//     return magnitude * 5;
// }
// // * **HINT** the depth of the earth can be found as the third coordinate for each earthquake.

// function markerColor(magnitude) {

//     // Conditionals for countries points
    
//     if (magnitude  >= 5.5) {
//       return "purple";
//     }
//     else if (magnitude  >= 5.1) {
//         return  "blue";
//     }
//     else if (magnitude  >= 4.7) {
//         return  "green";
//     }
//     else {
//         return "yellow";
//     }
// };
