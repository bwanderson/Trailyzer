
  var map, toolbar, symbol, geomTask;

  require([
    "esri/map",
    "esri/toolbars/draw",
    "esri/graphic",
    "esri/Color",
    "esri/graphicsUtils",
    "esri/tasks/Geoprocessor",
    "esri/tasks/FeatureSet",

    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleFillSymbol",

    "dojo/parser", "dijit/registry",

    "dijit/layout/BorderContainer", "dijit/layout/ContentPane",
    "dijit/form/Button", "dijit/WidgetSet", "dojo/domReady!"
  ], function(
    Map, Draw, Graphic,Color,graphicsUtils,Geoprocessor,FeatureSet,
    SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol,
    parser, registry
  ) {
    parser.parse();

    map = new Map("map", {
        center: [-157.45, 20.3],
        zoom: 6,
        basemap: "topo"
      });

    var gp = new Geoprocessor("http://geoserver.byu.edu/arcgis/rest/services/Hawaii/Stack/GPServer/Model");
    gp.setOutputSpatialReference({
          wkid: 102100
        });
    map.on("load", createToolbar);

    // loop through all dijits, connect onClick event
    // listeners for buttons to activate drawing tools
    registry.forEach(function(d) {
      // d is a reference to a dijit
      // could be a layout container or a button
      if ( d.declaredClass === "dijit.form.Button" ) {
        d.on("click", activateTool);
      }
    });

    function activateTool() {
    map.graphics.clear();
      var tool = this.label.toUpperCase().replace(/ /g, "_");
      toolbar.activate(Draw[tool]);
      map.hideZoomSlider();
    }

    function createToolbar(themap) {
      toolbar = new Draw(map);
      toolbar.on("draw-end", addToMap);
    }

    function addToMap(evt) {
    map.setMapCursor("progress");
      var symbol;
      toolbar.deactivate();
      map.showZoomSlider();
      switch (evt.geometry.type) {
        case "point":
        case "multipoint":
          symbol = new SimpleMarkerSymbol();
          break;
        case "polyline":
          symbol = new SimpleLineSymbol();
          break;
        default:
          symbol = new SimpleFillSymbol();
          break;
      }
      var graphic = new Graphic(evt.geometry, symbol);
      map.graphics.add(graphic);

      var features = [];
        features.push(graphic);
        var featureSet = new FeatureSet();
        featureSet.features = features;
        var params = {
          "Input_Line_Features": featureSet,
        };
        gp.execute(params, getProfile);
    }


    function getProfile(results, messages){
      var elevation_values = [];
         var features = results[0].value.features;

         for(var f = 0,fl=features.length; f < fl; f++){
             var z = results[0].value.features[f].attributes['FIRST_Z'];
             elevation_values.push(z);
         }
         console.log(elevation_values);
          $('#container').highcharts({
    chart: {
        type: 'area'
    },
    title: {
        text: 'Elevation Profile'
    },
    xAxis: {
        allowDecimals: false,
        labels: {
            formatter: function () {
                return this.value; // clean, unformatted number for year
            }
        }
    },
    yAxis: {
        title: {
            text: 'Height (ft)'
        },
        labels: {
            formatter: function () {
                return this.value;
            }
        }
    },
    tooltip: {
        pointFormat: '<b>{point.y}</b>'
    },
    plotOptions: {
        area: {
            pointStart: 0,
            marker: {
                enabled: false,
                symbol: 'circle',
                radius: 2,
                states: {
                    hover: {
                        enabled: true
                    }
                }
            }
        }
    },
    series: [{
        name: 'Elevation Profile',
        data: elevation_values
    }]
});
map.setMapCursor("auto");
    }
  });