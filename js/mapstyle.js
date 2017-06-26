var layerOrder = new Array();
var feature_group = new L.featureGroup([]);



function stackLayers() {
    for (index = 0; index < layerOrder.length; index++) {
        map.removeLayer(layerOrder[index]);
        map.addLayer(layerOrder[index]);
    }
}
function restackLayers() {
    for (index = 0; index < layerOrder.length; index++) {
        layerOrder[index].bringToFront();
    }
}


//L.mapbox.accessToken = config.mapboxAccessToken;
// Create a map in the div #map
		var bounds = L.latLngBounds(L.latLng(config.south,config.west), L.latLng(config.north,config.east));
        var map = L.map('map', {
            center: config.mapFocus,
            zoom: 7,
            minZoom : 7,
            maxzoom: 19,
            maxBounds : (bounds.pad(1)),
            zoomControl :false
        });
        map.touchZoom.enable();
        L.control.zoom({position : 'bottomleft'}).addTo(map);

        //Positron basemap
        var CartoDB_PositronNoLabels = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
            maxZoom: 19
        });

        var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        });

        CartoDB_PositronNoLabels.addTo(map);

        // Esri_WorldImagery.addTo(map);

        //Bug appeared preventing ending of route drawing.
		map.doubleClickZoom.disable();
//		Do nothing on right-click
		map.on('contextmenu', []);

		//Adding the left Bar of icons as a leaflet control panel
		var leftBar = L.control({position: 'topleft'});

		//Inspiration: http://stackoverflow.com/a/25764322/4047679
		//More insiration: http://stackoverflow.com/questions/18673860/defining-a-html-template-to-append-using-jquery

		var hiddenInteractionButtonsTemplate = $('#hidden-interaction-buttons-template').html();

		leftBar.onAdd = function(map){
			var div =L.DomUtil.create('div', '');
			div.id = 'leftBar';
			div.innerHTML = hiddenInteractionButtonsTemplate;
			return div;
		};

		leftBar.addTo(map);


		//Adding layer of labels
		var labelLayer = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_only_labels/{z}/{x}/{y}.png', {
            "attribution": '&copy; <a href="https://carto.com/attribution">CARTO</a>',
            "maxzoom": 17,
        	"minzoom": 13,
            "pane":"markerPane"}).addTo(map);
//		markerPane.appendChild(labelLayer.getContainer());
		//See for explanation of zindex level http://stackoverflow.com/q/35092858/4047679
//		labelLayer.setZIndex(5);

map.on('overlayadd', restackLayers);
layerControl = L.control.layers({},{},{collapsed:false});

//Empty to store markers after they are submitted
var submittedData = L.geoJson(false, {
onEachFeature: function (feature, layer) {
  layer.bindPopup('<b>'+feature.properties.name +', '+ feature.properties.password +'</b><br>'                               +feature.properties.description +'');
}
}).addTo(map);

var arcgisOnline = L.esri.Geocoding.arcgisOnlineProvider();

var boundaries = new L.LayerGroup();

var urban = new L.LayerGroup();

var mpo = new L.LayerGroup();

var gai = new L.LayerGroup();

var rail = new L.LayerGroup();

var airports = new L.LayerGroup();

var counts = new L.LayerGroup();

var freight = new L.LayerGroup();

var intermodal_legend = new L.LayerGroup();

var submissions = new L.LayerGroup();
var elevators = new L.LayerGroup();
var majorports = new L.LayerGroup();
var minorports = new L.LayerGroup();

// L.geoJSON(counties).addTo(boundaries);

// L.geoJSON(nhfn).addTo(freight);


  // L.esri.basemapLayer("Topographic").addTo(map);
// L.esri.featureLayer({
// url: 'https://ags10s1.dot.illinois.gov/ArcGIS/rest/services/GAI/gai_boundaries/MapServer/5',
// opacity: 0.7,
// useCors: true,
// simplifyFactor: 1,
// precision: 5,
// layers: [5]
// }).addTo(gai);

// L.esri.featureLayer({
// url: 'https://ags10s1.dot.illinois.gov/ArcGIS/rest/services/GAI/gai_designatedtruckroutes/MapServer/2',
// opacity: 0.7,
// useCors: true,
// simplifyFactor: 1,
// precision: 5,
// layers: [0,1,2,3,4]
// }).addTo(gai);

var intermodal = L.esri.featureLayer({
url: 'https://maps.bts.dot.gov/services/rest/services/NTAD/IntermodalFreightFacilities/MapServer/0',
where: "STATE='IL'",
pane: 'shadowPane'
}).addTo(intermodal_legend);

var intermodalPopup = "<p>{NAME}<br></p><table><tr><th>Type</th><th>Mode Type</th><th>Association</th></tr><tr><td>{TYPE}</td><td>{MODE_TYPE}</td><td>{ASSOC}</td></tr></table>"
intermodal.bindPopup(function (layer) {
  return L.Util.template(intermodalPopup, layer.feature.properties);
});

L.esri.dynamicMapLayer({
url: 'https://ags10s1.dot.illinois.gov/ArcGIS/rest/services/GAI/gai_trafficCount/MapServer/',
opacity: 0.7,
useCors: true,
simplifyFactor: 1,

precision: 5,
layers: [0,1]
}).addTo(counts);

var basemaps = {
    "Grayscale Basemap" : CartoDB_PositronNoLabels,
    "Physical Basemap (Satellite)" : Esri_WorldImagery,
    // "labels" : labelLayer
}

var groupedOverlays = {
  "Boundaries": {
      "Counties": countiesStyle,
      "Planning Agencies": rpaStyle,
      "MPOs": mpo,
    "Urban Areas": urbanStyle,
  },
  "Roads & Rail": {
      "National Highway Freight Network": freightStyle.addTo(map),
      "Truck Congested Hours": truckcongestedhoursStyle,
      "Intermodal Connectors": intermodalStyle,
      "Rail Lines": rail,

  },
  "Points of Interest": {
      "Military Bases": militaryStyle,
      "Airports": airports,
      "Intermodal Facilities": intermodalpointsStyle,
      "Major Ports": majorports,
      "Minor Ports": minorports,
      "Transloads": transloadsStyle,
  },
  "Economic": {
      "Grain Elevators": elevatorsStyle,
      'Sawmills': layer_ILsawmills2,
      'Energy Data<br /><table><tr><td style="text-align: center;"><img src="legend/EnergyData1_BiodieselPlants0.png" /></td><td>Biodiesel Plants</td></tr><tr><td style="text-align: center;"><img src="legend/EnergyData1_CoalMines1.png" /></td><td>Coal Mines</td></tr><tr><td style="text-align: center;"><img src="legend/EnergyData1_CrudeOilRailTerminals2.png" /></td><td>Crude Oil Rail Terminals</td></tr><tr><td style="text-align: center;"><img src="legend/EnergyData1_EthanolPlants3.png" /></td><td>Ethanol Plants</td></tr><tr><td style="text-align: center;"><img src="legend/EnergyData1_NaturalGasHubs4.png" /></td><td>Natural Gas Hubs</td></tr><tr><td style="text-align: center;"><img src="legend/EnergyData1_NaturalGasProcessingPlant5.png" /></td><td>Natural Gas Processing Plant</td></tr><tr><td style="text-align: center;"><img src="legend/EnergyData1_NaturalGasUndergroundStorage6.png" /></td><td>Natural Gas Underground Storage</td></tr><tr><td style="text-align: center;"><img src="legend/EnergyData1_PetroleumRefineries7.png" /></td><td>Petroleum Refineries</td></tr><tr><td style="text-align: center;"><img src="legend/EnergyData1_PetroleumProductTerminals8.png" /></td><td>Petroleum Product Terminals</td></tr></table>'
      : layer_EnergyData1,
  },
  "Submissions": {
      "Submissions": submissions,
  }

};



/*
'IL_sawmills<br /><table><tr><td style="text-align: center;"><img src="legend/ILsawmills2_1M0.png" /></td><td><1 M</td></tr><tr><td style="text-align: center;"><img src="legend/ILsawmills2_16M1.png" /></td><td>> 16 M</td></tr><tr><td style="text-align: center;"><img src="legend/ILsawmills2_1216M2.png" /></td><td>12-16 M</td></tr><tr><td style="text-align: center;"><img src="legend/ILsawmills2_14M3.png" /></td><td>1-4 M</td></tr><tr><td style="text-align: center;"><img src="legend/ILsawmills2_48M4.png" /></td><td>4-8 M</td></tr><tr><td style="text-align: center;"><img src="legend/ILsawmills2_812M5.png" /></td><td>8-12 M</td></tr><tr><td style="text-align: center;"><img src="legend/ILsawmills2_Satellitelogyard6.png" /></td><td>Satellite log yard</td></tr><tr><td style="text-align: center;"><img src="legend/ILsawmills2_UNK7.png" /></td><td>UNK</td></tr></table>'

'Energy Data<br /><table><tr><td style="text-align: center;"><img src="legend/EnergyData1_BiodieselPlants0.png" /></td><td>Biodiesel Plants</td></tr><tr><td style="text-align: center;"><img src="legend/EnergyData1_CoalMines1.png" /></td><td>Coal Mines</td></tr><tr><td style="text-align: center;"><img src="legend/EnergyData1_CrudeOilRailTerminals2.png" /></td><td>Crude Oil Rail Terminals</td></tr><tr><td style="text-align: center;"><img src="legend/EnergyData1_EthanolPlants3.png" /></td><td>Ethanol Plants</td></tr><tr><td style="text-align: center;"><img src="legend/EnergyData1_NaturalGasHubs4.png" /></td><td>Natural Gas Hubs</td></tr><tr><td style="text-align: center;"><img src="legend/EnergyData1_NaturalGasProcessingPlant5.png" /></td><td>Natural Gas Processing Plant</td></tr><tr><td style="text-align: center;"><img src="legend/EnergyData1_NaturalGasUndergroundStorage6.png" /></td><td>Natural Gas Underground Storage</td></tr><tr><td style="text-align: center;"><img src="legend/EnergyData1_PetroleumRefineries7.png" /></td><td>Petroleum Refineries</td></tr><tr><td style="text-align: center;"><img src="legend/EnergyData1_PetroleumProductTerminals8.png" /></td><td>Petroleum Product Terminals</td></tr></table>'
*/
var overlays = {
"Submissions": submissions,
// "labels": labelLayer,
// "<h4>Boundaries</h4>": boundaries,
"Counties": countiesStyle,
"Planning Agencies": rpaStyle,
"MPOs": mpo,
// "gai features": gai,
// "<h4>Road & Rail</h4>": boundaries,
"National Highway Freight Network": freightStyle.addTo(map),
"Truck Congested Hours": truckcongestedhoursStyle,
"Intermodal Connectors": intermodalStyle,
"Rail Lines": rail,
// "<h4>Points of Interest</h4>": boundaries,
"Military Bases": militaryStyle,
"Urban Areas": urbanStyle,
"Airports": airports,
"Intermodal Facilities": intermodalpointsStyle,
"Grain Elevators": elevatorsStyle,
"Major Ports": majorports,
"Minor Ports": minorports
};

// boundaries.addTo(map);



//query mpo service, just in bounds
var mpoQuery = L.esri.query({
    url: 'https://maps.bts.dot.gov/services/rest/services/NTAD/MetropolitanPlanningOrganizations/MapServer/0',
    useCors: false,
    pane: 'shadowPane',
    // where: "STATE IN('IL')",
    // layerDefs: {0: "STFIPS='17'"}
});

mpoQuery.within(bounds);

mpoQuery.run(function(error, featureCollection, response){
    L.geoJSON(featureCollection , { onEachFeature: onEachFeatureMPO}).addTo(mpo);
});

var majorPortQuery = L.esri.query({
    url: 'https://maps.bts.dot.gov/services/rest/services/NTAD/Ports_Major/MapServer/0',
    useCors: false,
    // onEachFeature: onEachFeature,
    pane: 'shadowPane',
    // where: "STATE IN('IL')",
    // layerDefs: {0: "STFIPS='17'"}
});

majorPortQuery.within(bounds);

majorPortQuery.run(function(error, featureCollection, response){
    L.geoJSON(featureCollection, {
        onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, majorPortMarkerOptions);
            }
    }).addTo(majorports);
});



var minorPortQuery = L.esri.query({
    url: 'https://maps.bts.dot.gov/services/rest/services/NTAD/Ports/MapServer/0',
    useCors: false,
    // onEachFeature: onEachFeature,
    pane: 'shadowPane',
    // where: "STATE IN('IL')",
    // layerDefs: {0: "STFIPS='17'"}
});

minorPortQuery.within(bounds);

minorPortQuery.run(function(error, featureCollection, response){
    L.geoJSON(featureCollection, {
        onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, minorPortMarkerOptions);
            }
    }).addTo(minorports);
});


// .addTo(mpo);
//
// var mpoSelect = {};
// mpo.query()
// .within(bounds)
// .run(function(error, featureCollection){
// return mpoSelect = featureCollection;
// console.log(featureCollection);
// });
//
// L.geoJSON(mpoSelect).addTo(mpo);

var mpoPopup = "<p>{MPONAME}<br></p>"
mpo.bindPopup(function (layer) {
  return L.Util.template(mpoPopup, layer.feature.properties);
});

// var portPopup = "<p>{PORT_NAME}<br></p>"
// ports.bindPopup(function (layer) {
//   return L.Util.template(portPopup, layer.feature.properties);
// });

// var urban = L.esri.dynamicMapLayer({
//     url: 'https://maps.bts.dot.gov/services/rest/services/NTAD/UrbanizedAreas/MapServer',
//     useCors: true,
//     layerDefs: {0: "STFIPS1='17'"}
// }).addTo(urban);

var rail = L.esri.dynamicMapLayer({
    url: 'https://maps.bts.dot.gov/services/rest/services/NTAD/Railroad_Lines/MapServer',
    useCors: false
}).addTo(rail);

var airports = L.esri.dynamicMapLayer({
    url: 'https://maps.bts.dot.gov/services/rest/services/NTAD/Airports/MapServer',
    useCors: false
}).addTo(airports);

// var airportsQuery = L.esri.query({
//     url: 'https://maps.bts.dot.gov/services/rest/services/NTAD/Airports/MapServer/0',
//     useCors: false,
//     pane: 'shadowPane',
//     where: "StateAbbv ='IL'",
//     // layerDefs: {0: "STFIPS='17'"}
// });
//
// airportsQuery.within(bounds);
//
// airportsQuery.run(function(error, featureCollection, response){
//     L.geoJSON(featureCollection , { onEachFeature: onEachFeature}).addTo(airports);
// });



airports.bindPopup(function (error, featureCollection) {
  if(error || featureCollection.features.length === 0) {
    return false;
  } else {
    return featureCollection.features[0].properties.FullName;
  }
});

// L.esri.legendControl(ports).addTo(map);

// var urban = L.esri.featureLayer({
// url: 'https://maps.bts.dot.gov/services/rest/services/NTAD/UrbanizedAreas/MapServer',
// opacity: 0.7,
// useCors: true,
// simplifyFactor: 1,
// precision: 5,
// layers: [0]
// }).addTo(map);




var layerControl = new L.control.groupedLayers(basemaps, groupedOverlays, {collapsed:false}).addTo(map);
layerControl.addTo(map);


		L.control.scale({options: {position: 'bottomleft', maxWidth: 100, metric: true, imperial: false, updateWhenIdle: false}}).addTo(map);
        $(".leaflet-left .leaflet-control-scale").css({"display": "inline-block","float": "none"});
		//http://stackoverflow.com/a/37173967/4047679

        stackLayers();

    var deviceIsMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent);

		/*Geolocator, activate only on mobile
		http://stackoverflow.com/a/26577897/4047679*/
		if (deviceIsMobile) {
			L.control.locate({
				position: 'topright',
				icon: 'fa fa-crosshairs',
				locateOptions: {maxZoom: 17}
			}).addTo(map);
		}

var searchControl = L.esri.Geocoding.geosearch({
  providers: [
    arcgisOnline,
    // L.esri.Geocoding.mapServiceProvider({
    //   label: 'States and Counties',
    //   url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer',
    //   layers: [2, 3],
    //   searchFields: ['NAME', 'STATE_NAME']
    // })
  ]
}).addTo(map);

// .bindPopup(data.results[i].properties.Match_addr).openPopup()
var results = L.layerGroup().addTo(map);

searchControl.on('results', function(data){
  results.clearLayers();
  console.log(data.results[0]);
  for (var i = data.results.length - 1; i >= 0; i--) {
    results.addLayer(L.marker(data.results[i].latlng).bindPopup(data.results[i].properties.Match_addr).openPopup());
  }
});

map.createPane('pane_EnergyData1');
map.getPane('pane_EnergyData1').style.zIndex = 400;
map.getPane('pane_EnergyData1').style['mix-blend-mode'] = 'normal';

map.createPane('pane_ILsawmills2');
map.getPane('pane_ILsawmills2').style.zIndex = 401;
map.getPane('pane_ILsawmills2').style['mix-blend-mode'] = 'normal';
