<template>
	<div class="container-components col-xs-9 offset-xs-2 row">

    <div class="col-xl-7 road-statistics-container row">
			<h2>{{roadContainer.street}}</h2>

			<div v-for="(data, index) of roadContainer.values" :key="index" class="road-statistics-row">
				<div class="road-statistics-label">{{data.label}}</div>
				<div class="road-statistics-bar">
					<div class="road-statistics-value-bar" :style="{ width: data.value, }"></div>
				</div>
				<div class="road-statistics-value">{{data.value}}</div>
			</div>
		</div>

		<div id="small-map" class="col-xl-4 offset-xl-1 small-map row"></div>
		
		<div class="col-xl-7 general-statistics-container row">
			<h2>{{ $t('statistics.general') }}</h2>
			
			<div class="col-xl-6 row" style="padding: 0px; height: fit-content;">
				<div id="radial-bar-1" class="col-xl-6">
					<apexchart type="radialBar" height="200" :options="radialBar1.chartOptions" :series="radialBar1.series"></apexchart>
				</div>
				<div id="radial-bar-2" class="col-xl-6">
					<apexchart type="radialBar" height="200" :options="radialBar2.chartOptions" :series="radialBar2.series"></apexchart>
				</div>

				<hr style="border: 3px solid #E6F5FB; opacity: 0.5;"/>

				<div class="col-3">
					<h1 style="margin: 0;">45%</h1>
					<p style="font-size: 12px;">{{ $t('statistics.daily_activity') }}</p>
				</div>

				<div class="col-3">
					<h1 style="margin: 0;">25%</h1>
					<p style="font-size: 12px;">{{ $t('statistics.monthly_activity') }}</p>
				</div>

				<div class="col-3">
					<h1 style="margin: 0;">64%</h1>
					<p style="font-size: 12px;">{{ $t('statistics.trimester') }}</p>
				</div>

				<div class="col-3">
					<h1 style="margin: 0;">80%</h1>
					<p style="font-size: 12px;">{{ $t('statistics.yearly_activity') }}</p>
				</div>
			</div>

			<div class="col-xl-6">
				<div class="row" style="justify-content: end;">
					<div class="col-xl-4 offset-xl-2 short-general-statistics-container">
						<div class="short-general-statistics-container-icon-bckg">
							<font-awesome-icon icon="chart-area" class="short-general-statistics-container-icon"/>
						</div>

						<p style="font-size: 12px;">{{ $t('statistics.statistics') }}</p>
						<p style="font-size: 12px;">{{ $t('statistics.general_activity') }}</p>
					</div>
					<div class="col-xl-4 short-general-statistics-container">
						<div class="short-general-statistics-container-icon-bckg">
							<font-awesome-icon icon="route" class="short-general-statistics-container-icon"/>
						</div>

						<p style="font-size: 12px;">{{ $t('statistics.route') }}</p>
						<p style="font-size: 12px;">{{ $t('statistics.shortest_route') }}</p>
					</div>
				</div>

				<div class="row" style="justify-content: end;">
					<div class="col-xl-4 short-general-statistics-container">
						<div class="short-general-statistics-container-icon-bckg">
							<font-awesome-icon icon="truck" class="short-general-statistics-container-icon"/>
						</div>

						<p style="font-size: 12px;">{{ $t('statistics.trucks') }}</p>
						<p style="font-size: 12px;">{{ $t('statistics.all_trucks') }}</p>
					</div>
					<div class="col-xl-4 short-general-statistics-container">
						<div class="short-general-statistics-container-icon-bckg">
							<font-awesome-icon icon="ellipsis-h" class="short-general-statistics-container-icon"/>
						</div>

						<p style="font-size: 12px;">{{ $t('statistics.others') }}</p>
						<p style="font-size: 12px;">{{ $t('statistics.other_statistics') }}</p>
					</div>
				</div>
			</div>
		</div>

		<div class="col-xl-4 offset-xl-1 general-statistics-container row">
			<h2>{{ $t('statistics.state_of_areas') }}</h2>
			<apexchart type="bar" height="250" :options="barChart.chartOptions" :series="barChart.series"></apexchart>
		</div>
	</div>
</template>

<script>
	import VueApexCharts from "vue3-apexcharts";

	export default {
		components: {
			apexchart: VueApexCharts,
		},
    data() {
      return {
				roadContainer: {
					street: "Myslym Shyri", 
					values: [
						{
							label: this.$t('statistics.collected_trash_in_kg'),
							value: "95%"
						},
						{
							label: this.$t('statistics.collected_bin_number'),
							value: "45%"
						},
						{
							label: this.$t('statistics.status_of_the_bins'),
							value: "81%"
						},
						{
							label: this.$t('statistics.number_of_critical_status_bins'),
							value: "70%"
						},
						{
							label: this.$t('statistics.number_of_okay_status_bins'),
							value: "80%"
						},
						{
							label: this.$t('statistics.number_of_good_status_bins'),
							value: "83%"
						},
					],
				},
				radialBar1: {
					series: [45],
					chartOptions: {
						chart: {
							height: 350,
							type: 'radialBar'
						},
						plotOptions: {
							radialBar: {
								offsetX: 0,
								offsetY: 0,
								hollow: {
									size: '70%',
									background: 'transparent',
									position: 'front',
								},
								track: {
									// strokeWidth: '50%',
								},
								dataLabels: {
									show: true,
									name: {
										color: '#000',
									},
									value: {
										show: true,
										offsetY: 16,
									}
								}
							},
						},
						labels: [this.$t('statistics.statistics')],
						fill: {
							colors: ['#FF9100'],
						},
					},
				},
				radialBar2: {
					series: [78],
					chartOptions: {
						chart: {
							height: 350,
							type: 'radialBar'
						},
						plotOptions: {
							radialBar: {
								offsetX: 0,
								offsetY: 0,
								hollow: {
									size: '70%',
									background: 'transparent',
									position: 'front',
								},
								track: {
									// strokeWidth: '50%',
								},
								dataLabels: {
									show: true,
									name: {
										color: '#000',
									},
									value: {
										show: true,
										offsetY: 16,
									}
								}
							},
						},
						labels: [this.$t('statistics.statistics')],
						fill: {
							colors: ['#FA1D20'],
						},
					},
				},
				barChart: {
					series: [{
						name: "Mbushur",
            data: ['86%', '80%', '13%', '75%', '53%']
          }],
          chartOptions: {
            chart: {
              height: 250,
              type: 'bar',
            },
            colors: ['#FA1D20', '#FA1D20', '#37CEB7', '#FA1D20', '#FF9100'],
            plotOptions: {
              bar: {
                columnWidth: '15%',
                distributed: true,
              }
            },
            dataLabels: {
              enabled: false,
            },
            legend: {
              show: false
            },
            xaxis: {
              categories: [
                ['Myslym', 'Shyri'],
                ['Medar', 'Shtylla'],
                ['Rruga', 'e Kavajës'],
                ['Mine', 'Peza'],
                'Fortuzi'
              ],
              labels: {
                style: {
                  colors: ['#FA1D20', '#FA1D20', '#37CEB7', '#FA1D20', '#FF9100'],
                  fontSize: '12px'
                }
              }
            }
          },
				},
				accessToken: process.env.VUE_APP_MAPBOX_ACCESS_TOKEN,
				center: [19.8187, 41.3275],
				zoom: 13
			}
		},
		mounted() {
			this.loadMap();
		},
		methods: {
			loadMap() {
				let mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
				mapboxgl.accessToken = this.accessToken;
				let map = new mapboxgl.Map({
					container: 'small-map',
					style: 'mapbox://styles/mapbox/streets-v11',
					zoom: this.zoom, // starting zoom
					center: this.center,
				});

				// Add zoom and rotation controls to the map.
				map.addControl(new mapboxgl.NavigationControl());
				map.addControl(new mapboxgl.FullscreenControl());
			}
		},
	}
</script>

<style scoped>
	.container-components {
    position: relative;
    top: 54px;
    margin-left: 300px;
    margin-right: 20px;
	}

	.road-statistics-container {
		background: #E6F5FB;
		border-radius: 15px;
		padding: 15px;
	}

	.road-statistics-row {
		display: flex;
	}

	.road-statistics-bar {
		width: 50%;
	}

	.road-statistics-value-bar {
		background-color: #37CEB7;
    height: 4px;
    border-radius: 10px;
    margin-top: 8px;
	}

	.road-statistics-label {
		width: 33.33%;
	}

	.road-statistics-value {
		width: 20%;
		text-align: center;
	}

	.general-statistics-container {
		background: #FEFEFE;
		box-shadow: 0px 3px 15px #00000029;
		border-radius: 15px;
		margin-top: 20px;
		padding: 15px;
		margin-bottom: 20px;
	}

	.short-general-statistics-container {
		background: #FEFEFE;
		box-shadow: 0px 3px 7px #00000029;
		border-radius: 15px;
		margin: 10px; 
		padding: 20px;
		height: 130px;
	}

	.short-general-statistics-container-icon {
		color: #FF5242;
		opacity: 1;
	}

	.short-general-statistics-container-icon-bckg {
		background-color: #FFF4F3;
    width: fit-content;
    padding: 4px;
    border-radius: 20px;
	}

	.small-map {
		border-radius: 15px;
		height: 250px;
	}

	@media screen and (max-width: 500px) {
		.container-components {
			margin-left: 25px;
			margin-right: 0px;
		}
	}

	@media screen and (max-width: 1200px) {
		.small-map {
			margin-top: 20px;
		}
	}
	
</style>