var submissionsStyle = L.geoJson(submissions_scores, {
    onEachFeature: onEachFeature,
    style: style_comparesubmissions0_0


});

layerOrder[layerOrder.length] = submissionsStyle;
feature_group.addLayer(submissionsStyle).addTo(submissions);

function style_comparesubmissions0_0(feature) {
    if (feature.properties['run2_Score'] >= 1.673182 && feature.properties['run2_Score'] <= 3.236364 ) {
        return {
        opacity: 1,
        color: 'rgba(254,240,217,1.0)',
        dashArray: '',
        lineCap: 'square',
        lineJoin: 'bevel',
        weight: 4.0,
        fillOpacity: 0,
    }
    }
    if (feature.properties['run2_Score'] >= 3.236364 && feature.properties['run2_Score'] <= 4.687727 ) {
        return {
        opacity: 1,
        color: 'rgba(253,204,138,1.0)',
        dashArray: '',
        lineCap: 'square',
        lineJoin: 'bevel',
        weight: 4.0,
        fillOpacity: 0,
    }
    }
    if (feature.properties['run2_Score'] >= 4.687727 && feature.properties['run2_Score'] <= 6.112273 ) {
        return {
        opacity: 1,
        color: 'rgba(252,141,89,1.0)',
        dashArray: '',
        lineCap: 'square',
        lineJoin: 'bevel',
        weight: 4.0,
        fillOpacity: 0,
    }
    }
    if (feature.properties['run2_Score'] >= 6.112273 && feature.properties['run2_Score'] <= 7.419545 ) {
        return {
        opacity: 1,
        color: 'rgba(227,74,51,1.0)',
        dashArray: '',
        lineCap: 'square',
        lineJoin: 'bevel',
        weight: 4.0,
        fillOpacity: 0,
    }
    }
    if (feature.properties['run2_Score'] >= 7.419545 && feature.properties['run2_Score'] <= 9.269545 ) {
        return {
        opacity: 1,
        color: 'rgba(179,0,0,1.0)',
        dashArray: '',
        lineCap: 'square',
        lineJoin: 'bevel',
        weight: 4.0,
        fillOpacity: 0,
    }
    }
}
