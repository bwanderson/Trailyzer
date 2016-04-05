
require(["esri/map", "dojo/domReady!"], function(Map) {
  var map = new Map("map", {
    center: [-157.45, 20.3],
    zoom: 6,
    basemap: "topo"
  });
});
