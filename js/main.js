//var map = new maplibregl.Map({
//    container: 'map',
//    style: 'https://api.maptiler.com/maps/openstreetmap/style.json?key=AnloT5VXYX3E6sqkSTtS', // stylesheet location
//    center: [13.011586184559851, 55.591988278009765], // starting position [lng, lat]
//    zoom: 9 // starting zoom
//    });

  const map = new maplibregl.Map({
      style: 'https://tiles.openfreemap.org/styles/bright',
      center: [13.011586184559851, 55.591988278009765],
      zoom: 15.5,
      pitch: 45,
      bearing: -17.6,
      container: 'map',
      canvasContextAttributes: {antialias: true}
  });

  // The 'building' layer in the streets vector source contains building-height
  // data from OpenStreetMap.
  map.on('load', () => {
      // Insert the layer beneath any symbol layer.
      const layers = map.getStyle().layers;

      let labelLayerId;
      for (let i = 0; i < layers.length; i++) {
          if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
              labelLayerId = layers[i].id;
              break;
          }
      }

      map.addSource('openfreemap', {
          url: `https://tiles.openfreemap.org/planet`,
          type: 'vector',
      });

      map.addLayer({
              'id': '3d-buildings',
              'source': 'openfreemap',
              'source-layer': 'building',
              'type': 'fill-extrusion',
              'minzoom': 15,
              'filter': [
                'all',
                ['!=', ['get', 'hide_3d'], true],
              ],
              'paint': {
                  'fill-extrusion-color': [
                      'interpolate',
                      ['linear'],
                      ['get', 'render_height'], 0, '#fffef6', 25, '#f47c31'
                  ],
                  'fill-extrusion-height': [
                      'interpolate',
                      ['linear'],
                      ['zoom'],
                      15,
                      0,
                      16,
                      ['get', 'render_height']
                  ],
                  'fill-extrusion-base': ['case',
                      ['>=', ['get', 'zoom'], 16],
                      ['get', 'render_min_height'], 0
                  ]
              }
          },
          labelLayerId
      );
  });
