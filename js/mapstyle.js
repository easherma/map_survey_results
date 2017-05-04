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
        CartoDB_PositronNoLabels.addTo(map);

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

var boundaries = new L.LayerGroup();

var urban = new L.LayerGroup();

var gai = new L.LayerGroup();

var counts = new L.LayerGroup();

var freight = new L.LayerGroup();

var intermodal_legend = new L.LayerGroup();

var submissions = new L.LayerGroup();

// L.geoJSON(counties).addTo(boundaries);

// L.geoJSON(nhfn).addTo(freight);


  // L.esri.basemapLayer("Topographic").addTo(map);
// L.esri.featureLayer({
// url: 'https://ags10s1.dot.illinois.gov/ArcGIS/rest/services/GAI/gai_boundaries/MapServer/5',
// opacity: 0.7,
// useCors: false,
// simplifyFactor: 1,
// precision: 5,
// layers: [5]
// }).addTo(gai);

// L.esri.featureLayer({
// url: 'https://ags10s1.dot.illinois.gov/ArcGIS/rest/services/GAI/gai_designatedtruckroutes/MapServer/2',
// opacity: 0.7,
// useCors: false,
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
useCors: false,
simplifyFactor: 1,

precision: 5,
layers: [0,1]
}).addTo(counts);

var overlays = {
"counties": countiesStyle,
// "gai features": gai,
// "counts": counts,
"urban": urban,
"nhfn": freightStyle,
"intermodal": intermodal_legend,
"submissions": submissions
};

// boundaries.addTo(map);

// freight.addTo(map);

var urban = L.esri.dynamicMapLayer({
    url: 'https://maps.bts.dot.gov/services/rest/services/NTAD/UrbanizedAreas/MapServer',
    useCors: false,
    layerDefs: {0: "STFIPS1='17'"}
}).addTo(urban);

// var urban = L.esri.dynamicMapLayer({
//     url: 'https://ags10s1.dot.illinois.gov/ArcGIS/rest/services/GAI/gai_functionalclass/MapServer/1',
//     useCors: false
// }).addTo(gai);

// L.esri.legendControl(ports).addTo(map);

// var urban = L.esri.featureLayer({
// url: 'https://maps.bts.dot.gov/services/rest/services/NTAD/UrbanizedAreas/MapServer',
// opacity: 0.7,
// useCors: false,
// simplifyFactor: 1,
// precision: 5,
// layers: [0]
// }).addTo(map);




var layerControl = new L.control.layers({}, overlays, {collapsed:false}).addTo(map);
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
