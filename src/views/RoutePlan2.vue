<template>
  <div class="container-components">
    <div id="map"></div>
  </div>
</template>

<script>
/* eslint-disable no-undef */

import * as turf from '@turf/turf'

export default {
  data () {
    return {
      accessToken: process.env.VUE_APP_MAPBOX_ACCESS_TOKEN,
      markers: [],
      center: [19.8187, 41.3275],
      zoom: 13
    }
  },
  mounted() {
    this.loadMarkers();
    this.loadMap();
  },
  methods: {
    loadMarkers() {
      this.markers.push(this.center);
      this.markers.push([ 19.807579, 41.32755  ]);
      this.markers.push([ 19.811430, 41.321666 ]);
      this.markers.push([ 19.802093, 41.328626 ]);
      this.markers.push([ 19.824447, 41.328495 ]);
    },

    async loadMap() {
      let mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
      // Create a GeoJSON feature collection for the warehouse
      const warehouse = turf.featureCollection([turf.point(this.center)]);
      // Create an empty GeoJSON feature collection, which will be used as the data source for the route before users add any new data
      const nothing = turf.featureCollection([]);
 
      mapboxgl.accessToken = this.accessToken;
      let map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        zoom: this.zoom, // starting zoom
        center: this.center,
      });

      // Add zoom and rotation controls to the map.
      map.addControl(new mapboxgl.NavigationControl());
      map.addControl(new mapboxgl.FullscreenControl());

      // Create markers
      for (let i = 0; i < this.markers.length; i++) {
        if (i != 0) {
          const dumpster = document.createElement('div');
          dumpster.classList = 'dumpster';
          new mapboxgl.Marker(dumpster).setLngLat(this.markers[i]).addTo(map);
        }
      }

      map.on('load', () => {
        // Load the center icon of the map
        map.addLayer({
          id: 'warehouse',
          type: 'circle',
          source: {
            data: warehouse,
            type: 'geojson'
          },
          paint: {
            'circle-radius': 15,
            'circle-color': 'white',
            'circle-stroke-color': '#37CEB7',
            'circle-stroke-width': 3
          }
        });

        // Create a symbol layer on top of circle layer
        map.addLayer({
          id: 'warehouse-symbol',
          type: 'symbol',
          source: {
            data: warehouse,
            type: 'geojson'
          },
          layout: {
            'icon-image': 'town-hall-15',
            'icon-size': 1
          },
          paint: {
            'text-color': '#3887be'
          }
        });

          map.addSource('route', {
          type: 'geojson',
          data: nothing
        });

        map.addLayer({
            id: 'routeline-active',
            type: 'line',
            source: 'route',
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': '#3887be',
              'line-width': ['interpolate', ['linear'], ['zoom'], 12, 3, 22, 12]
            }
          }, 'waterway-label'
        );

        map.addLayer({
            id: 'routearrows',
            type: 'symbol',
            source: 'route',
            layout: {
              'symbol-placement': 'line',
              'text-field': '▶',
              'text-size': ['interpolate', ['linear'], ['zoom'], 12, 24, 22, 60],
              'symbol-spacing': ['interpolate', ['linear'], ['zoom'], 12, 30, 22, 160],
              'text-keep-upright': false
            },
            paint: {
              'text-color': '#3887be',
              'text-halo-color': 'hsl(55, 11%, 96%)',
              'text-halo-width': 3
            }
          }, 'waterway-label'
        );

        this.doStuff(map);
      });
    },

    async doStuff(map) {
      // Make a request to the Optimization API
      const query = await fetch(this.assembleQueryURL(), { method: 'GET' });
      const data = await query.json();

      // Create a GeoJSON feature collection
      let routeGeoJSON = turf.featureCollection([
        turf.feature(data.trips[0].geometry)
      ]);

      // If there is no route provided, reset
      if (!data.trips[0]) {
        routeGeoJSON = nothing;
      } else {
        // Update the `route` source by getting the route source
        // and setting the data equal to routeGeoJSON
        map.getSource('route').setData(routeGeoJSON);
      }
      if (data.waypoints.length === 12) {
        // map.off('click', addWaypoints);
        window.alert(
          'Maximum number of points reached. Refresh the page to add a new route. Read more at https://docs.mapbox.com/api/navigation/optimization/.'
        );
      }
    },

    // Here you'll specify all the parameters necessary for requesting a response from the Optimization API
    assembleQueryURL() {
      // Store the location of the truck in a constant called coordinates
      const coordinates = this.markers;
      // const distributions = [];
      // keepTrack = this.marker;

      // Create an array of GeoJSON feature collections for each point
      // const restJobs = Object.keys(pointHopper).map((key) => pointHopper[key]);

      // If there are any orders from this restaurant
      // if (restJobs.length > 0) {
      //   // Check to see if the request was made after visiting the restaurant
      //   const needToPickUp =
      //     restJobs.filter((d) => {
      //       return d.properties.orderTime > lastAtRestaurant;
      //     }).length > 0;

        // If the request was made after picking up from the restaurant,
        // Add the restaurant as an additional stop
        // let restaurantIndex = null;
        // if (needToPickUp) {
        //   restaurantIndex = coordinates.length;
        //   // Add the restaurant as a coordinate
        //   coordinates.push(warehouseLocation);
        //   // push the restaurant itself into the array
        //   keepTrack.push(pointHopper.warehouse);
        // }

      //   for (const job of restJobs) {
      //     // Add dropoff to list
      //     keepTrack.push(job);
      //     coordinates.push(job.geometry.coordinates);
      //     // if order not yet picked up, add a reroute
      //     if (needToPickUp && job.properties.orderTime > lastAtRestaurant) {
      //       distributions.push(`${restaurantIndex},${coordinates.length - 1}`);
      //     }
      //   }
      // }

      // Set the profile to `driving`
      // Coordinates will include the current location of the truck,
      return `https://api.mapbox.com/optimized-trips/v1/mapbox/driving-traffic/${coordinates.join(';')}`
        + `?overview=full`
        + `&steps=true`
        + `&geometries=geojson`
        + `&source=first`
        + `&access_token=${this.accessToken}`;

        // ?distributions=${distributions.join(';')}
    }
  }
}
</script>

<style>
  .container-components {
    padding: 0;
    height: 100%;
    display: flex;
  }

  #map {
    width: 100%;
    flex-basis: 0;
    flex-grow: 4;
    height: 100vh;
  }

  .dumpster {
    width: 20px;
    height: 20px;
    border: 2px solid #fff;
    border-radius: 50%;
    background: #37CEB7;
    pointer-events: none;
  }
</style>