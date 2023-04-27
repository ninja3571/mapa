
var map = L.map('map').setView([52.186, 21.571], 7);

map.dragging.disable()

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

map.on('click', function(e){
    console.log(e.latlng)

    addMarker(e.latlng)
})

var geojsonFeature = {
    "type": "Feature",
    "properties": {
        "name": "Coors Field",
        "amenity": "Baseball Stadium",
        "popupContent": "This is where the Rockies play!"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [52.186, 21.571]
    }
};

L.geoJSON(geojsonFeature).addTo(map);

var myLines = [{
    "type": "LineString",
    "coordinates": [[-100, 40], [-105, 45], [-110, 55]]
}, {
    "type": "LineString",
    "coordinates": [[-105, 40], [-110, 45], [-115, 55]]
}];

function addMarker(latlng){
    L.marker(latlng).addTo(map)
}

/*async function getData(latlng){

    const lng = latlng.lng
    const lat = latlng.lat

    console.log(lng)

    const url =await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}`)
    const data = await fetch(url)
    const json= await data.json
}*/