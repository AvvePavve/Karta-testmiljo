//var map = new maplibregl.Map({
//    container: 'map',
//    style: 'https://api.maptiler.com/maps/openstreetmap/style.json?key=AnloT5VXYX3E6sqkSTtS', // stylesheet location
//    center: [13.011586184559851, 55.591988278009765], // starting position [lng, lat]
//    zoom: 9 // starting zoom
//    });

    const map = (window.map = new maplibregl.Map({
        container: 'map',
        zoom: 12,
        center: [13.011586184559851, 55.591988278009765],
        pitch: 70,
        hash: true,
        style: {
            version: 8,
            sources: {
                osm: {
                    type: 'raster',
                    tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
                    tileSize: 256,
                    attribution: '&copy; OpenStreetMap Contributors',
                    maxzoom: 19
                },
                // Use a different source for terrain and hillshade layers, to improve render quality
                terrainSource: {
                    type: 'raster-dem',
                    url: 'https://demotiles.maplibre.org/terrain-tiles/tiles.json',
                    tileSize: 256
                },
                hillshadeSource: {
                    type: 'raster-dem',
                    url: 'https://demotiles.maplibre.org/terrain-tiles/tiles.json',
                    tileSize: 256
                }
            },
            layers: [
                {
                    id: 'osm',
                    type: 'raster',
                    source: 'osm'
                },
                {
                    id: 'hills',
                    type: 'hillshade',
                    source: 'hillshadeSource',
                    layout: {visibility: 'visible'},
                    paint: {'hillshade-shadow-color': '#473B24'}
                }
            ],
            terrain: {
                source: 'terrainSource',
                exaggeration: 1
            },
            sky: {}
        },
        maxZoom: 18,
        maxPitch: 85
    }));
