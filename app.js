var map = L.map('map').setView([52.186, 21.571], 7);

map.dragging.disable()

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

map.on('click', function(e){
    console.log(e.latlng)

    addMarker(e)
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
        "coordinates": [21.571, 52.186]
    }
};

L.geoJSON(geojsonFeature).addTo(map);
//modyfikowany znacznik
var greenIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/141/141803.png',

    iconSize:     [40, 40], // size of the icon
    iconAnchor:   [20, 40], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

L.marker([52.186, 21.571], {icon: greenIcon}).addTo(map);

//znaczniki po kliknięciu
function addMarker(e){
    L.marker([e.latlng.lat,e.latlng.lng]).addTo(map)

    const lat = e.latlng.lat
    const lng = e.latlng.lng
    
    var myLines = [{
        "type": "LineString",
        "coordinates": [[21.571, 52.186], [lng, lat]]
    }, 
]



//ustawienia znaczników(kolor, szerokość)
    var myStyle = {
        "color": "#ff00ff",
        "weight": 4,
        "opacity": 0.65
    };

    L.geoJSON(myLines, {
        style: myStyle
    }).addTo(map);
}

async function getData(latlng){

    const lng = latlng.lng
    const lat = latlng.lat

    console.log(lng)

    const url =await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&namedetails=1`)

    const data = await fetch(url)
    const json= await data.json

    console.log(json.features[0].properties.addres.county)
}



//napis "Mińsk Mazowiecki" nad danym miejscem
var popup = L.popup()
.setLatLng([52.186, 21.571])
.setContent("Mińsk Mazowiecki")
.openOn(map);


for(let i=0;1<=powiaty.features.length-1;i++){
    var powiat = powiaty.features
    var mappowiat = L.geoJSON(powiat).addTo(map)
    mappowiat.blindTooltip(powiaty.features[i].properties.nazwa)
}
console.log(powiaty.features)

/*function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    layer.bringToFront();
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
}

var geojson;
// ... our listeners
geojson = L.geoJson();

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
    });
}

geojson = L.geoJson(statesData, {
    onEachFeature: onEachFeature
}).addTo(map);*/