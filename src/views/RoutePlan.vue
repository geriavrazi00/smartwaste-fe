<template>
  <div class="container-components" >
    <div id="google-map"></div>

    <div id="directions-contrainer">
      <div id="directions-panel"></div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable no-undef */
  import { defineComponent } from 'vue'

  export default defineComponent({
    data () {
      return {
        center: null,
        markers: [],
        zoom: 14,
        apiKey: process.env.VUE_APP_GOOGLE_API_KEY,
        theme: 'grey',
        flightPath: null,
        google: null,
        route: null
      }
    },
    mounted() {
      this.loadCurrentGeolocation();
      this.loadMarkers();
      this.calculatePath();

      this.route.then((data) => {
        console.log(data);
      });
    },
    methods: {
      loadMarkers() {
        // Call the api to load the proper locations
        this.markers = [
           { lat: 41.321263, lng: 19.807579 },
           { lat: 41.321666, lng: 19.811430 },
           { lat: 41.328626, lng: 19.802093 },
           { lat: 41.328495, lng: 19.824447 }
        ];
      },

      loadCurrentGeolocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {
              this.center = Object.assign({}, this.center, {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });

              const central = { id: 'q', position: this.center, label: 'Q'};
              this.markers.push(central);
            },
          );
        } else {
          console.log("Your browser does not support geolocation API!");
          this.center = { lat: 41.312709, lng: 19.7995264 }; // Default value if center is not defined
        }
      },

      calculatePath() {
        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer();
        const map = new google.maps.Map(document.getElementById("google-map"), {
          zoom: this.zoom,
          center: { lat: 41.312709, lng: 19.7995264 },
        });

        // Setting the traffic layer
        // const trafficLayer = new google.maps.TrafficLayer();
        // trafficLayer.setMap(map);
        directionsRenderer.setMap(map);
        return this.calculateAndDisplayRoute(directionsService, directionsRenderer);
      },

      calculateAndDisplayRoute(directionsService, directionsRenderer) {
        const waypts = [];
        for (let i = 0; i < this.markers.length; i++) {
          waypts.push({
            location: this.markers[i],
            stopover: true,
          });
        }

        this.route = directionsService.route({
            origin: { lat: 41.312709, lng: 19.7995264 },
            destination: { lat: 41.312709, lng: 19.7995264 },
            waypoints: waypts,
            optimizeWaypoints: true,
            travelMode: google.maps.TravelMode.DRIVING,
            drivingOptions: {
              departureTime: new Date(Date.now()),
              trafficModel: 'bestguess'
            },
            unitSystem: google.maps.UnitSystem.METRIC,
            provideRouteAlternatives: true,
          })
          .then((response) => {
            directionsRenderer.setDirections(response);
            const route = response.routes[0];
            const summaryPanel = document.getElementById("directions-panel");

            summaryPanel.innerHTML = "";

            // For each route, display summary information.
            for (let i = 0; i < route.legs.length; i++) {
              const routeSegment = i + 1;

              summaryPanel.innerHTML +=
                "<b>Route Segment: " + routeSegment + "</b><br>";
              summaryPanel.innerHTML += route.legs[i].start_address + " to ";
              summaryPanel.innerHTML += route.legs[i].end_address + "<br>";
              summaryPanel.innerHTML += route.legs[i].distance.text + "<br>";
              summaryPanel.innerHTML += route.legs[i].duration.text + "<br><br>";
            }

            return response;
          })
          .catch(() => window.alert("Directions request failed due to " + status));
      }
    }
  })
</script>

<style scoped>
  .container-components {
    padding: 0;
    height: 100%;
    display: flex;
  }

  #google-map {
    width: 100%;
    /* width: 100%;
    height: 100vh; */
    flex-basis: 0;
    flex-grow: 4;
    height: 100vh;
  }

  #directions-contrainer {
    flex-basis: 15rem;
    flex-grow: 1;
    padding: 1rem;
    max-width: 30rem;
    height: 100%;
    box-sizing: border-box;
    overflow: auto;
    height: 100vh;
  }

  #directions-panel {
    
    margin-top: 10px;
  }

  @media screen and (max-width: 500px) {
    #google-map {
      top: 180px;
    }
  }
</style>