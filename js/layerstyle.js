/*  QGIS layer*/
  var layerOrder = new Array();
  var feature_group = new L.featureGroup([]);


  function doStylebikefacilities(feature) {
          if (feature.properties.BikeFacili >= 1.0 &&
                  feature.properties.BikeFacili <= 1.8) {

              return {
                  color: '#006837',
                  weight: '3.44',
                  opacity: '1.0',
              }
          }
          if (feature.properties.BikeFacili >= 1.8 &&
                  feature.properties.BikeFacili <= 2.6) {

              return {
                  color: '#984ea3',
                  weight: '3.44',
                  opacity: '1.0',
              }
          }
          if (feature.properties.BikeFacili >= 2.6 &&
                  feature.properties.BikeFacili <= 3.4) {

              return {
                  color: '#78c679',
                  weight: '3.44',
                  opacity: '1.0',
              }
          }
          if (feature.properties.BikeFacili >= 3.4 &&
                  feature.properties.BikeFacili <= 4.2) {

              return {
                  color: '#c2e699',
                  weight: '3.44',
                  opacity: '1.0',
              }
          }
          if (feature.properties.BikeFacili >= 4.2 &&
                  feature.properties.BikeFacili <= 5.0) {

              return {
                  color: '#ffff99',
                  weight: '3.44',
                  opacity: '1.0',
              }
          }
  }
      var json_bikefacilitiesJSON = new L.geoJson(json_bikefacilitiesexp, {
          style: doStylebikefacilities
          ,clickable :false
          ,pane: 'shadowPane'
      });
  layerOrder[layerOrder.length] = json_bikefacilitiesJSON;
  feature_group.addLayer(json_bikefacilitiesJSON);
