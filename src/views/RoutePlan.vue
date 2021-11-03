<template>
  <div class="container-components">
    <div id="map"></div>

    <div id="data-container" class="data-container">
      <h4 style="color: black;">{{ $t('bin_state_by_area') }}</h4>

      <div class="road-statistics-row" v-for="(data, index) of mapData.trips" :key="index">
				<div class="road-statistics-label" v-if="index != 0">{{ data.name }}</div>
				<div class="road-statistics-bar" v-if="index != 0">
					<div class="road-statistics-value-bar" :style="{ width: (data.value ? data.value + '%' : '0px'), backgroundColor: data.color }"></div>
				</div>
				<div class="road-statistics-value" v-if="index != 0" :style="{ color: data.color }">{{ (data.value ? data.value : '0') }}%</div>
			</div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
import * as turf from '@turf/turf'

export default {
  data () {
    return {
      accessToken: process.env.VUE_APP_MAPBOX_ACCESS_TOKEN,
      sensor1Id: process.env.VUE_APP_SENSOR1_ID,
      markers: [],
      center: [19.8187, 41.3275],
      defaultLocations: [
        [19.800401, 41.312528], // Geri
        [19.815211, 41.303892] // Albi
      ],
      mapCenter: [19.8244686, 41.3131335],
      zoom: 13,
      data: [],
      mapData: {
        distance: 0,
        duration: 0,
        trips: [
          // {
          //   name: null,
          //   location: [],
          //   distance: 0,
          //   duration: 0,
          //   summary: 0,
          //   value: 0,
          //   color: "#37CEB7"
          // }
        ]
      },
      binMaxDepth: 100
    }
  },
  mounted() {
    this.loadBinStatus();
  },
  methods: {
    loadMarkers() {
      for (let index = 0; index < this.defaultLocations.length; index++) {
        const element = this.defaultLocations[index];
        this.markers.push(element);
      }
    },

    async loadMapData() {
      // Make a request to the Optimization API
      const query = await fetch(this.assembleQueryURL(), { method: 'GET' });
      const data = await query.json();

      // Build an object with the data
      this.mapData.distance = data.trips[0].distance;
      this.mapData.duration = data.trips[0].duration;

      for (let i = 0; i < data.waypoints.length; i++) {
        let mapDataObj = {};
        mapDataObj.location = data.waypoints[i].location;
        mapDataObj.name = data.waypoints[i].name;

        let sensor = this.data.filter(function (el) {
          return el.longitude === mapDataObj.location[0] &&
            el.latitude === mapDataObj.location[1]
        });

        if (sensor.length > 0) {
          let value = (sensor[0].sensor_leftdown + sensor[0].sensor_leftup + sensor[0].sensor_rightdown + sensor[0].sensor_rightup) / 4;
          mapDataObj.value = ((this.binMaxDepth - value) * 100 / this.binMaxDepth).toFixed(2);
        }

        this.mapData.trips.push(mapDataObj);
      }

      for (let i = 0; i < data.trips[0].legs.length; i++) {
        this.mapData.trips[i].distance = data.trips[0].legs[i].distance * 0.001;
        this.mapData.trips[i].duration = data.trips[0].legs[i].duration * 0.0166667;
        this.mapData.trips[i].summary = data.trips[0].legs[i].summary;

        if (this.mapData.trips[i].value <= 50) {
          this.mapData.trips[i].color = "#37CEB7";
        } else if (this.mapData.trips[i].value > 50 && this.mapData.trips[i].value <= 80) {
          this.mapData.trips[i].color = "#FF9100";
        } else {
          this.mapData.trips[i].color = "#FA1D20";
        }
      }

      return data;
    },

    async loadMap() {
      let mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
      // Create a GeoJSON feature collection for the warehouse
      const warehouse = turf.featureCollection([turf.point(this.center)]);
      // Create an empty GeoJSON feature collection, which will be used as the data source for the route before users add any new data
      const nothing = turf.featureCollection([]);
      const data = await this.loadMapData();
 
      mapboxgl.accessToken = this.accessToken;
      let map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        zoom: this.zoom, // starting zoom
        center: this.mapCenter,
      });

      // Add zoom and rotation controls to the map.
      map.addControl(new mapboxgl.NavigationControl());
      map.addControl(new mapboxgl.FullscreenControl());

      // Create markers
      for (let i = 0; i < this.markers.length; i++) {
        if (i != 0) {
          const dumpster = document.createElement('div');
          dumpster.classList = 'dumpster';

          // create the popup
          const popup = new mapboxgl.Popup({ offset: [0, -5], closeOnClick: false, closeButton: false }).setHTML(
            '<span style="font-weight: bold; font-size: 12px;">' + this.mapData.trips[i].name + '</span><br/>'
            + '<span style="font-weight: bold;">Mbushur: </span>' + this.mapData.trips[i].value + '%'
          );

          new mapboxgl.Marker(dumpster)
            .setLngLat(this.markers[i])
            .setPopup(popup) // sets a popup on this marker
            .addTo(map)
            .togglePopup();
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
              'line-color': '#37CEB7',
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
              'text-color': '#37CEB7',
              'text-halo-color': 'hsl(55, 11%, 96%)',
              'text-halo-width': 3
            }
          }, 'waterway-label'
        );

        this.loadRoute(map, data);
      });
    },

    async loadRoute(map, data) {
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
    },

    // Here you'll specify all the parameters necessary for requesting a response from the Optimization API
    assembleQueryURL() {
      // Store the location of the truck in a constant called coordinates
      const coordinates = this.markers;

      // In the response we are interested in the trips object, legs array we can get each route with its distance in m and duration in s. 
      // Inside the object we also have the total duration and distance
      return `https://api.mapbox.com/optimized-trips/v1/mapbox/driving-traffic/${coordinates.join(';')}`
        + `?overview=full`
        + `&annotations=duration,distance,speed`
        + `&steps=true`
        + `&geometries=geojson`
        + `&source=first`
        + `&access_token=${this.accessToken}`;
    },

    async readSensorData(url) {
      return this.axios.get(url);
    },

    async loadBinStatus() {
      // TDB: Make the second call as well
      this.markers.push(this.center);

      const firstSensorData = await this.readSensorData('/sensor1').then(response => {
        return response.data.value[0];
      }).catch(error => console.log(error));

      const secondSensorData = await this.readSensorData('/sensor2').then(response => {
        return response.data.value[0];
      }).catch(error => console.log(error));

      this.data.push(firstSensorData);
      this.data.push(secondSensorData);

      if (this.data) {
        if (this.data[0].latitude === 0 && this.data[0].longitude === 0) {
          this.data[0].latitude = this.defaultLocations[1][1];
          this.data[0].longitude = this.defaultLocations[1][0];
          this.markers.push(this.defaultLocations[1]);
        } else {
          this.markers.push([ this.data[0].longitude, this.data[0].latitude ]);
        }

        if (this.data[1].latitude === 0 && this.data[1].longitude === 0) {
          this.data[1].latitude = this.defaultLocations[0][1];
          this.data[1].longitude = this.defaultLocations[0][0];

          this.markers.push(this.defaultLocations[0]);
        } else {
          this.markers.push([ this.data[1].longitude, this.data[1].latitude ]);
        }

        this.loadMap();
      }
    }
  },
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

  .data-container {
    height: 300px;
    min-width: 400px;
    background-color: #FEFEFE;
    position: absolute;
    right: 20px;
    bottom: 30px;
    box-shadow: 0px 3px 25px #00000029;
    border-radius: 15px;
    padding: 20px;
  }

  .road-statistics-row {
		display: flex;
	}

	.road-statistics-bar {
		width: 40%;
	}

	.road-statistics-value-bar {
		background-color: #37CEB7;
    height: 4px;
    border-radius: 10px;
    margin-top: 8px;
	}

	.road-statistics-label {
		width: 40%;
	}

	.road-statistics-value {
		width: 20%;
		text-align: center;
	}

  .mapboxgl-popup {
    max-width: 200px;
  }
</style>