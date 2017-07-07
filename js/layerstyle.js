

        var bounds_group = new L.featureGroup([]);

L.TopoJSON = L.GeoJSON.extend({
    addData: function (data) {
        var geojson, key;
        if (data.type === "Topology") {
            for (key in data.objects) {
                if (data.objects.hasOwnProperty(key)) {
                    geojson = topojson.feature(data, data.objects[key]);
                    L.GeoJSON.prototype.addData.call(this, geojson);
                }
            }

            return this;
        }

        L.GeoJSON.prototype.addData.call(this, data);

        return this;
    }
});

L.topoJson = function (data, options) {
    return new L.TopoJSON(data, options);
};
// Copyright (c) 2013 Ryan Clark

/*  QGIS layer*/

// generic code to append all attributes of a feature to a pop-up

function onEachFeature(feature, layer) {
    if (feature.properties )
    {
        var popupContent = '<table >';
        for (var p in feature.properties) {
            popupContent += '<tr><td>' + p + ':</td><td><b>' + feature.properties[p] + '</b></td></tr>';
        }
        popupContent += '</table>';
        layer.bindPopup(popupContent, {maxWidth: 300, minWidth: 250, maxHeight: 160, autoPan: true, closeButton: true, autoPanPadding: [5, 5]});
    }
}

function onEachFeatureMPO(feature, layer) {
    if (feature.properties)
    {
        var popupContent = '<table>';
        popupContent += '<tr><td>' + "" + '</td><td><b>' + feature.properties['MPONAME'] + '</b></td></tr>';
        popupContent += '</table>';
        layer.bindPopup(popupContent);
    }
}

function onEachFeaturePorts(feature, layer) {
    if (feature.properties)
    {
        var popupContent = '<table>';
        popupContent += '<tr><td>' + "" + '</td><td><b>' + feature.properties['PORT_NAME'] + '</b></td></tr>';
        popupContent += '</table>';
        layer.bindPopup(popupContent);
    }
}



var geojsonMarkerOptions = {
    radius: 5,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

var minorPortMarkerOptions = {
    radius: 4,
    // fillColor: "#ff7800",
    // color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

var majorPortMarkerOptions = {
    radius: 12,
    // fillColor: "#ff0000",
    // color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

var transloadMarkerOptions = {
    radius: 5,
    fillColor: "#a2e4e6",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

function onEachFeatureFreight(feature, layer) {
    // if (feature.properties && feature.properties.name)
    {
        var popupContent = '<table>';
            popupContent += '<tr><td>' + "AADTT" + ':</td><td><b>' + feature.properties['AADTT'] + '</b></td></tr>';
        popupContent += '</table>';
        // layer.bindPopup(popupContent);

                layer.bindPopup(popupContent, {closeButton: false, offset: L.point(0, -20)});
                layer.on('mouseover', function() { layer.openPopup(); });
                layer.on('mouseout', function() { layer.closePopup(); });
    }
}

function onEachFeatureIntermodalPoints(feature, layer) {
    // if (feature.properties && feature.properties.name)
    {
        var popupContent = '<table>';
            popupContent += '<tr><td>' + 'Name' + ':</td><td><b>' + feature.properties['NAME1_'] + '</b></td></tr>';
            popupContent += '<tr><td>' + 'Status' + ':</td><td><b>' + feature.properties['MapStatus'] + '</b></td></tr>';
            popupContent += '<tr><td>' + 'Notes' + ':</td><td><b>' + feature.properties['Notes'] + '</b></td></tr>';
        popupContent += '</table>';
        layer.bindPopup(popupContent);
    }
}

function onEachFeatureIntermodalConn(feature, layer) {
    // if (feature.properties && feature.properties.name)
    {
        var popupContent = '<table>';
            popupContent += '<tr><td>' + "" + ':</td><td><b>' + feature.properties['CONN_DES'] + '</b></td></tr>';
        popupContent += '</table>';
        layer.bindPopup(popupContent);

                // layer.bindPopup(popupContent, {closeButton: false, offset: L.point(0, -20)});
                // layer.on('mouseover', function() { layer.openPopup(); });
                // layer.on('mouseout', function() { layer.closePopup(); });
    }
}

function onEachFeatureRpa(feature, layer) {
    // if (feature.properties && feature.properties.name)
    {
        var popupContent = '<table>';
            popupContent += '<tr><td>' + "" + '</td><td><b>' + feature.properties['rpa'] + '</b></td></tr>';
        popupContent += '</table>';
        layer.bindPopup(popupContent);

                // layer.bindPopup(popupContent, {closeButton: false, offset: L.point(0, -20)});
                // layer.on('mouseover', function() { layer.openPopup(); });
                // layer.on('mouseout', function() { layer.closePopup(); });
    }
}


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

  function styleMilitary(feature) {
      if (feature.properties.OPER_STAT == "Active") {
          return {
                              color: '#205b22',
                              weight: '2',
                              opacity: '1.0',

          }
      }
      else {
          return {
              color: '#3d3d3d',
              weight: '2',
              opacity: '1.0',
          }
      }
  }

  function styletruckcongestedhours(feature) {
  if (feature.properties['light_hrs'] >= 0.0 &&
          feature.properties['light_hrs'] <= 3.94075) {

      return {
          color: '#fef0d9',
          weight: '2',
          dashArray: '',
          lineCap: 'square',
          lineJoin: 'bevel',
          opacity: '1.0',
      }
  }
  if (feature.properties['light_hrs'] >= 3.94075 &&
          feature.properties['light_hrs'] <= 7.8815) {

      return {
          color: '#fdb77a',
          weight: '2',
          dashArray: '',
          lineCap: 'square',
          lineJoin: 'bevel',
          opacity: '1.0',
      }
  }
  if (feature.properties['light_hrs'] >= 7.8815 &&
          feature.properties['light_hrs'] <= 11.82225) {

      return {
          color: '#ec603f',
          weight: '2',
          dashArray: '',
          lineCap: 'square',
          lineJoin: 'bevel',
          opacity: '1.0',
      }
  }
  if (feature.properties['light_hrs'] >= 11.82225 &&
          feature.properties['light_hrs'] <= 15.763) {

      return {
          color: '#b30000',
          weight: '2',
          dashArray: '',
          lineCap: 'square',
          lineJoin: 'bevel',
          opacity: '1.0',
      }
  }
  }

  function styleElevators(feature) {
  if (feature.properties['capacity'] >= 901000.0 &&
          feature.properties['capacity'] <= 2059000.0) {

      return {
          radius: 2.0,
          fillColor: '#f7fbff',
          color: '#000000',
          weight: .5,
          fillOpacity: '1.0',
          opacity: '1.0',
          dashArray: ''
      }
  }

  if (feature.properties['capacity'] >= 2059000.0 &&
          feature.properties['capacity'] <= 3872000.0) {

      return {
          radius: 4.0,
          fillColor: '#c8ddf0',
          color: '#000000',
          weight: .5,
          fillOpacity: '1.0',
          opacity: '1.0',
          dashArray: ''
      }
  }

  if (feature.properties['capacity'] >= 3872000.0 &&
          feature.properties['capacity'] <= 6709000.0) {

      return {
          radius: 6.0,
          fillColor: '#73b3d8',
          color: '#000000',
          weight: .5,
          fillOpacity: '1.0',
          opacity: '1.0',
          dashArray: ''
      }
  }

  if (feature.properties['capacity'] >= 6709000.0 &&
          feature.properties['capacity'] <= 15245000.0) {

      return {
          radius: 8.0,
          fillColor: '#2879b9',
          color: '#000000',
          weight: .5,
          fillOpacity: '1.0',
          opacity: '1.0',
          dashArray: ''
      }
  }

  if (feature.properties['capacity'] >= 15245000.0 &&
          feature.properties['capacity'] <= 31258000.0) {

      return {
          radius: 10.0,
          fillColor: '#08306b',
          color: '#000000',
          weight: .5,
          fillOpacity: '1.0',
          opacity: '1.0',
          dashArray: ''
      }
  }

  }

  var intermodalStyle = L.geoJson(intermodal_conn, {
      onEachFeature: onEachFeatureIntermodalConn
  });

  layerOrder[layerOrder.length] = intermodalStyle;
  feature_group.addLayer(intermodalStyle);

  var truckcongestedhoursStyle = L.geoJson(truckcongestedhours, {
      onEachFeature: onEachFeature,
      style: styletruckcongestedhours

  });

  layerOrder[layerOrder.length] = truckcongestedhoursStyle;
  feature_group.addLayer(truckcongestedhoursStyle);

  var elevatorsStyle = L.geoJson(elevators, {
      onEachFeature: onEachFeature,
      style: styleElevators,
      pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng);
          }

  });

  layerOrder[layerOrder.length] = elevatorsStyle;
  feature_group.addLayer(elevatorsStyle);


  // function styleMilitary(feature) {
  //    console.log(sn);
  //    if (feature.properties.OPER_STAT == 'Active') {
  //      return {
  //          geojsonMarkerOptions
  //      };
  //    } else {
  //      return {
  //        weight: 2,
  //        opacity: 1,
  //        color: 'white',
  //        dashArray: '3',
  //        fillOpacity: 0.3,
  //        fillColor: '#666666'
  //      };
  //    }
  //  }
  var militaryStyle = L.geoJson(military, {
      style: styleMilitary,
      onEachFeature: onEachFeature,
      pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng);
}

  });

  layerOrder[layerOrder.length] = militaryStyle;
  feature_group.addLayer(militaryStyle);

  var intermodalpointsStyle = L.geoJson(intermodalpoints, {
      onEachFeature: onEachFeatureIntermodalPoints,
      pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, geojsonMarkerOptions);
}
  });

  layerOrder[layerOrder.length] = intermodalpointsStyle;
  feature_group.addLayer(intermodalpointsStyle);

  var urbanStyle = L.geoJson(urban, {
      style: {
          color: '#999999',
          weight: '2',
          opacity: '.5',

      }
  });

  layerOrder[layerOrder.length] = urbanStyle;
  feature_group.addLayer(urbanStyle);

  var rpaStyle = L.geoJson(rpa_diss, {

      onEachFeature: onEachFeatureRpa,
      style: {
          color: '#343434',
          weight: '2.5',
          opacity: '.5',

      },
      interactive:true,
      pane: 'shadowPane',
  });

  layerOrder[layerOrder.length] = rpaStyle;
  feature_group.addLayer(rpaStyle);

  var mpoStyle = L.geoJson(mpo, {

      onEachFeature: onEachFeatureMPO,
      style: {
          color: '#343434',
          weight: '2.5',
          opacity: '.5',

      },
      interactive:true,
      pane: 'shadowPane',
  });

  layerOrder[layerOrder.length] = mpoStyle;
  feature_group.addLayer(mpoStyle);

var selected

  var freightStyle = new L.TopoJSON(nhfn, {
      style: styleNhfn,
      onEachFeature: onEachFeatureFreight,
      interactive :false,
      pane: 'shadowPane'
  }).on('mouseover', function (e) {
      // Check for selected
      if (selected) {
        // Reset selected to default style
        e.target.resetStyle(selected)

      }
      // Assign new selected
      selected = e.layer
      // Bring selected to front
      selected.bringToFront()
      // Style selected
      selected.setStyle({
        'color': 'red'
      })
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

// var transloadsStyle = new L.geoJson(transloads, {
//     onEachFeature: onEachFeature,
//     pointToLayer: function (feature, latlng) {
//         return L.circleMarker(latlng);
//         }
// });
//
// layerOrder[layerOrder.length] = transloadsStyle;
// feature_group.addLayer(transloadsStyle);

var transloadsStyle = L.geoJson(transloads, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
  return L.circleMarker(latlng, transloadMarkerOptions);
}
});

layerOrder[layerOrder.length] = transloadsStyle;
feature_group.addLayer(transloadsStyle);

  function pop_EnergyData1(feature, layer) {
      var popupContent = '<table>\
              <tr>\
                  <td colspan="2">' + (feature.properties['layer'] !== null ? Autolinker.link(String(feature.properties['layer'])) : '') + '</td>\
              </tr>\
              <tr>\
                  <td colspan="2">' + (feature.properties['name'] !== null ? Autolinker.link(String(feature.properties['name'])) : '') + '</td>\
              </tr>\
          </table>';
      layer.bindPopup(popupContent);
  }

  function style_EnergyData1_0(feature) {
      switch(feature.properties['layer']) {
          case 'clipBiodiesel_Plants_US_201505v3':
              return {
          pane: 'pane_EnergyData1',
          radius: 4.0,
          opacity: 1,
          color: 'rgba(0,0,0,1.0)',
          dashArray: '',
          lineCap: 'butt',
          lineJoin: 'miter',
          weight: 1,
          fillOpacity: 1,
          fillColor: 'rgba(127,201,127,1.0)',
      }
              break;
          case 'clipCoalMines_US_2014_r3':
              return {
          pane: 'pane_EnergyData1',
          radius: 4.0,
          opacity: 1,
          color: 'rgba(0,0,0,1.0)',
          dashArray: '',
          lineCap: 'butt',
          lineJoin: 'miter',
          weight: 1,
          fillOpacity: 1,
          fillColor: 'rgba(190,174,212,1.0)',
      }
              break;
          case 'clipCrudeOil_RailTerminals_Nov2014':
              return {
          pane: 'pane_EnergyData1',
          radius: 4.0,
          opacity: 1,
          color: 'rgba(0,0,0,1.0)',
          dashArray: '',
          lineCap: 'butt',
          lineJoin: 'miter',
          weight: 1,
          fillOpacity: 1,
          fillColor: 'rgba(253,192,134,1.0)',
      }
              break;
          case 'clipEthanol_Plants_US_Aug2015v2':
              return {
          pane: 'pane_EnergyData1',
          radius: 4.0,
          opacity: 1,
          color: 'rgba(0,0,0,1.0)',
          dashArray: '',
          lineCap: 'butt',
          lineJoin: 'miter',
          weight: 1,
          fillOpacity: 1,
          fillColor: 'rgba(255,255,153,1.0)',
      }
              break;
          case 'clipNatura':
              return {
          pane: 'pane_EnergyData1',
          radius: 4.0,
          opacity: 1,
          color: 'rgba(0,0,0,1.0)',
          dashArray: '',
          lineCap: 'butt',
          lineJoin: 'miter',
          weight: 1,
          fillOpacity: 1,
          fillColor: 'rgba(56,108,176,1.0)',
      }
              break;
          case 'clipNaturalGas_ProcessingPlants_US_2014_v2':
              return {
          pane: 'pane_EnergyData1',
          radius: 4.0,
          opacity: 1,
          color: 'rgba(0,0,0,1.0)',
          dashArray: '',
          lineCap: 'butt',
          lineJoin: 'miter',
          weight: 1,
          fillOpacity: 1,
          fillColor: 'rgba(240,2,127,1.0)',
      }
              break;
          case 'clipNaturalGas_UndergroundStorage_US_201607':
              return {
          pane: 'pane_EnergyData1',
          radius: 4.0,
          opacity: 1,
          color: 'rgba(0,0,0,1.0)',
          dashArray: '',
          lineCap: 'butt',
          lineJoin: 'miter',
          weight: 1,
          fillOpacity: 1,
          fillColor: 'rgba(191,91,23,1.0)',
      }
              break;
          case 'clipPetroleum_Refineries_US_2016':
              return {
          pane: 'pane_EnergyData1',
          radius: 4.0,
          opacity: 1,
          color: 'rgba(0,0,0,1.0)',
          dashArray: '',
          lineCap: 'butt',
          lineJoin: 'miter',
          weight: 1,
          fillOpacity: 1,
          fillColor: 'rgba(102,102,102,1.0)',
      }
              break;
          case 'clipPetroleumProduct_Terminals_US_201608':
              return {
          pane: 'pane_EnergyData1',
          radius: 4.0,
          opacity: 1,
          color: 'rgba(0,0,0,1.0)',
          dashArray: '',
          lineCap: 'butt',
          lineJoin: 'miter',
          weight: 1,
          fillOpacity: 1,
          fillColor: 'rgba(102,102,102,1.0)',
      }
              break;
      }
  }

  var layer_EnergyData1 = new L.geoJson(json_EnergyData1, {
      attribution: '<a href=""></a>',
      pane: 'pane_EnergyData1',
      onEachFeature: pop_EnergyData1,
      pointToLayer: function (feature, latlng) {
          var context = {
              feature: feature,
              variables: {}
          };
          return L.circleMarker(latlng, style_EnergyData1_0(feature))
      },
  });
  feature_group.addLayer(layer_EnergyData1);
  // map.addLayer(layer_EnergyData1);
  function pop_ILsawmills2(feature, layer) {
      var popupContent = '<table>\
              <tr>\
                  <td colspan="2">' + (feature.properties['Id'] !== null ? Autolinker.link(String(feature.properties['Id'])) : '') + '</td>\
              </tr>\
              <tr>\
                  <td colspan="2">' + (feature.properties['Name'] !== null ? Autolinker.link(String(feature.properties['Name'])) : '') + '</td>\
              </tr>\
              <tr>\
                  <td colspan="2">' + (feature.properties['Size'] !== null ? Autolinker.link(String(feature.properties['Size'])) : '') + '</td>\
              </tr>\
              <tr>\
                  <td colspan="2">' + (feature.properties['address1'] !== null ? Autolinker.link(String(feature.properties['address1'])) : '') + '</td>\
              </tr>\
              <tr>\
                  <td colspan="2">' + (feature.properties['address2'] !== null ? Autolinker.link(String(feature.properties['address2'])) : '') + '</td>\
              </tr>\
              <tr>\
                  <td colspan="2">' + (feature.properties['owner'] !== null ? Autolinker.link(String(feature.properties['owner'])) : '') + '</td>\
              </tr>\
              <tr>\
                  <td colspan="2">' + (feature.properties['Mill_Statu'] !== null ? Autolinker.link(String(feature.properties['Mill_Statu'])) : '') + '</td>\
              </tr>\
              <tr>\
                  <td colspan="2">' + (feature.properties['In_survey'] !== null ? Autolinker.link(String(feature.properties['In_survey'])) : '') + '</td>\
              </tr>\
              <tr>\
                  <td colspan="2">' + (feature.properties['Capacity'] !== null ? Autolinker.link(String(feature.properties['Capacity'])) : '') + '</td>\
              </tr>\
              <tr>\
                  <td colspan="2">' + (feature.properties['Mill_Type'] !== null ? Autolinker.link(String(feature.properties['Mill_Type'])) : '') + '</td>\
              </tr>\
              <tr>\
                  <td colspan="2">' + (feature.properties['Custom_saw'] !== null ? Autolinker.link(String(feature.properties['Custom_saw'])) : '') + '</td>\
              </tr>\
              <tr>\
                  <td colspan="2">' + (feature.properties['Urban_wood'] !== null ? Autolinker.link(String(feature.properties['Urban_wood'])) : '') + '</td>\
              </tr>\
              <tr>\
                  <td colspan="2">' + (feature.properties['Primary_pr'] !== null ? Autolinker.link(String(feature.properties['Primary_pr'])) : '') + '</td>\
              </tr>\
              <tr>\
                  <td colspan="2">' + (feature.properties['Procuremen'] !== null ? Autolinker.link(String(feature.properties['Procuremen'])) : '') + '</td>\
              </tr>\
              <tr>\
                  <td colspan="2">' + (feature.properties['County'] !== null ? Autolinker.link(String(feature.properties['County'])) : '') + '</td>\
              </tr>\
              <tr>\
                  <td colspan="2">' + (feature.properties['species'] !== null ? Autolinker.link(String(feature.properties['species'])) : '') + '</td>\
              </tr>\
          </table>';
      layer.bindPopup(popupContent);
  }

  function style_ILsawmills2_0(feature) {
      switch(feature.properties['Capacity']) {
          case '<1 M':
              return {
          pane: 'pane_ILsawmills2',
          radius: 2.0,
          opacity: 1,
          color: 'rgba(43,83,54,1.0)',
          dashArray: '',
          lineCap: 'butt',
          lineJoin: 'miter',
          weight: 1,
          fillOpacity: 1,
          fillColor: 'rgba(247,251,255,1.0)',
      }
              break;
          case '> 16 M':
              return {
          pane: 'pane_ILsawmills2',
          radius: 4.0,
          opacity: 1,
          color: 'rgba(43,83,54,1.0)',
          dashArray: '',
          lineCap: 'butt',
          lineJoin: 'miter',
          weight: 1,
          fillOpacity: 1,
          fillColor: 'rgba(225,243,179,1.0)',
      }
              break;
          case '12-16 M':
              return {
          pane: 'pane_ILsawmills2',
          radius: 6.0,
          opacity: 1,
          color: 'rgba(43,83,54,1.0)',
          dashArray: '',
          lineCap: 'butt',
          lineJoin: 'miter',
          weight: 1,
          fillOpacity: 1,
          fillColor: 'rgba(194,230,153,1.0)',
      }
              break;
          case '1-4 M':
              return {
          pane: 'pane_ILsawmills2',
          radius: 8.0,
          opacity: 1,
          color: 'rgba(43,83,54,1.0)',
          dashArray: '',
          lineCap: 'butt',
          lineJoin: 'miter',
          weight: 1,
          fillOpacity: 1,
          fillColor: 'rgba(157,214,137,1.0)',
      }
              break;
          case '4-8 M':
              return {
          pane: 'pane_ILsawmills2',
          radius: 10.0,
          opacity: 1,
          color: 'rgba(43,83,54,1.0)',
          dashArray: '',
          lineCap: 'butt',
          lineJoin: 'miter',
          weight: 1,
          fillOpacity: 1,
          fillColor: 'rgba(120,198,121,1.0)',
      }
              break;
          case '8-12 M':
              return {
          pane: 'pane_ILsawmills2',
          radius: 12.0,
          opacity: 1,
          color: 'rgba(43,83,54,1.0)',
          dashArray: '',
          lineCap: 'butt',
          lineJoin: 'miter',
          weight: 1,
          fillOpacity: 1,
          fillColor: 'rgba(84,181,102,1.0)',
      }
              break;
          case 'Satellite log yard':
              return {
          pane: 'pane_ILsawmills2',
          radius: 2.0,
          opacity: 1,
          color: 'rgba(43,83,54,1.0)',
          dashArray: '',
          lineCap: 'butt',
          lineJoin: 'miter',
          weight: 1,
          fillOpacity: 1,
          fillColor: 'rgba(247,251,255,1.0)',
      }
              break;
          case 'UNK':
              return {
          pane: 'pane_ILsawmills2',
          radius: 2.0,
          opacity: 1,
          color: 'rgba(43,83,54,1.0)',
          dashArray: '',
          lineCap: 'butt',
          lineJoin: 'miter',
          weight: 1,
          fillOpacity: 1,
          fillColor: 'rgba(247,251,255,1.0)',
      }
              break;
      }
  }

  var layer_ILsawmills2 = new L.geoJson(json_ILsawmills2, {
      attribution: '<a href=""></a>',
      pane: 'pane_ILsawmills2',
      onEachFeature: pop_ILsawmills2,
      pointToLayer: function (feature, latlng) {
          var context = {
              feature: feature,
              variables: {}
          };
          return L.circleMarker(latlng, style_ILsawmills2_0(feature))
      },
  });
  feature_group.addLayer(layer_ILsawmills2);
  // map.addLayer(layer_ILsawmills2);
