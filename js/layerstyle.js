/*  QGIS layer*/
  var layerOrder = new Array();
  var feature_group = new L.featureGroup([]);

  function styleNhfn(feature) {
      if (feature.properties.NHFN == "PHFS") {
          return {
                              color: '#5ab4ac',
                              weight: '2',
                              opacity: '1.0',

          }
      }
      if (feature.properties.NHFN == "NON_PHFS_IS") {
          return {
                              color: '#d8b365',
                              weight: '2',
                              opacity: '1.0',

          }
      }
  }

  var freightStyle = new L.geoJson(nhfn, {
      style: styleNhfn
      ,clickable :false
      ,pane: 'shadowPane'
  });
layerOrder[layerOrder.length] = freightStyle;
feature_group.addLayer(freightStyle);

function styleCounties(feature){
    return {
                        color: '#999999',
                        weight: '2',
                        opacity: '.5',
                        fill: false,

    }
}
var countiesStyle = new L.geoJson(counties, {
    style: styleCounties
    ,clickable :false
    ,pane: 'shadowPane'
});
layerOrder[layerOrder.length] = countiesStyle;
feature_group.addLayer(countiesStyle);
  //
  //
  // function doStylebikefacilities(feature) {
  //         if (feature.properties.BikeFacili >= 1.0 &&
  //                 feature.properties.BikeFacili <= 1.8) {
  //
  //             return {
  //                 color: '#006837',
  //                 weight: '3.44',
  //                 opacity: '1.0',
  //             }
  //         }
  //         if (feature.properties.BikeFacili >= 1.8 &&
  //                 feature.properties.BikeFacili <= 2.6) {
  //
  //             return {
  //                 color: '#984ea3',
  //                 weight: '3.44',
  //                 opacity: '1.0',
  //             }
  //         }
  //         if (feature.properties.BikeFacili >= 2.6 &&
  //                 feature.properties.BikeFacili <= 3.4) {
  //
  //             return {
  //                 color: '#78c679',
  //                 weight: '3.44',
  //                 opacity: '1.0',
  //             }
  //         }
  //         if (feature.properties.BikeFacili >= 3.4 &&
  //                 feature.properties.BikeFacili <= 4.2) {
  //
  //             return {
  //                 color: '#c2e699',
  //                 weight: '3.44',
  //                 opacity: '1.0',
  //             }
  //         }
  //         if (feature.properties.BikeFacili >= 4.2 &&
  //                 feature.properties.BikeFacili <= 5.0) {
  //
  //             return {
  //                 color: '#ffff99',
  //                 weight: '3.44',
  //                 opacity: '1.0',
  //             }
  //         }
  // }
  //     var json_bikefacilitiesJSON = new L.geoJson(json_bikefacilitiesexp, {
  //         style: doStylebikefacilities
  //         ,clickable :false
  //         ,pane: 'shadowPane'
  //     });
  // layerOrder[layerOrder.length] = json_bikefacilitiesJSON;
  // feature_group.addLayer(json_bikefacilitiesJSON);
