// https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson


// Create a map using Leaflet that plots all of the earthquakes from your data set based on their longitude and latitude.

   
// function createMap(earthquakes) {

  var streetmap= L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={access token}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

  var myMap = L.map("map", {
    center: [15.5994, -28.6731],
    zoom: 2
    
  });
  streetmap.addTo(myMap);

// **********************************************
d3.json( "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson", function(data){
 ///making the markers

  function styleInfo(feature){
    return{
      opacity:1,
      fillOpacity: 1,
      fillColor: getColor(feature.geometry.coordinates[2]),
      color: "#000000", 
      radius:getRadius(feature.properties.mag),
      stroke: true,
      weight:0.5
    };
  }
  
  function getColor(depth) {
    if (depth > 24) {
      return "#1f011b"
      
    } else if (depth > 20) {
      return "#060399"
    } else if (depth > 16) {
      return "#1803ff"
    } else if (depth > 12) {
      return "#5703ff"
    } else if (depth > 8) {
      return "#9603ff"
    } else if (depth > 4) {
      return "#d503ff"
    } else {
      return "#ff03dd"
      }
    }
  
    function getRadius(magnitude){
      if (magnitude ===0) {
        return 1;
      }
      return magnitude * 3;
    }
  
    L.geoJson(data, {
      pointToLayer: function (feature, latlng){
        return L.circleMarker(latlng);
      }, 
    style: styleInfo,
  
    onEachFeature: function(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.place +
          "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
      }
  
    }).addTo(myMap);
// **********************************************
  
//legend
var legend = L.control({ position: "bottomright" });
legend.onAdd = function() {
  var div = L.DomUtil.create("div", "info legend");
  // var grades = [-10, 4, 8, 12, 16, 20, 24];
  // var colors = [
  //   "#98ee00",
  //   "#d4ee00",
  //   "#eecc00",
  //   "#ee9c00",
  //   "#ea2c2c"];

  // for (var i = 0; i < grades.length; i++) {
  div.innerHTML= ["<br> Depth in km</br>","<br> >-10 = pink</br>",
  "<br> >4 = magenta</br>",
  "<br> >8 = purple</br>",
  "<br> >12 = indigo</br>",
  "<br> >16 = blue</br>",
  "<br> >20 = dark blue</br>",
  "<br> >24 = black</br>"]
  //  "<i style= 'background:" + colors[i] +"'></i> " + grades[i] + (grades[i+1] ? "&ndash;" + grades[i+1] + "<br>": "+");}
  // the given code for the legend does not work
  return div;
};
legend.addTo(myMap);

});

