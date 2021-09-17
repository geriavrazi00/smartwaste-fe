<template>
	<div class="container-components col-md-9 offset-md-2 row">

		<div class="col-md-12">
			<h1 style="width: 100%;">{{ $t('help.help-and-documentation') }}</h1>
		</div>

		<br><br>

		<div class="accordion col-md-12" id="accordionExample" style="margin-top: 20px; padding-bottom: 25px;">
			<vue-collapsible-panel-group accordion>
				<vue-collapsible-panel :expanded="false">
						<template #title>
							{{ $t('help.info.tracking.title') }}
						</template>
						<template #content>
							<!-- {{ $t('help.info.tracking.content') }} -->
							{{text}}
						</template>
				</vue-collapsible-panel>

				<vue-collapsible-panel :expanded="false">
					<template #title>
						{{ $t('help.info.best-route.title') }}
					</template>
					<template #content>
						<!-- {{ $t('help.info.best-route.content') }} -->
						{{text}}
					</template>
				</vue-collapsible-panel>

				<vue-collapsible-panel :expanded="false">
					<template #title>
						{{ $t('help.info.fuel.title') }}
					</template>
					<template #content>
						<!-- {{ $t('help.info.fuel.content') }} -->
						{{text}}
					</template>
				</vue-collapsible-panel>

				<vue-collapsible-panel :expanded="false">
					<template #title>
						{{ $t('help.info.vehicles.title') }}
					</template>
					<template #content>
						<!-- {{ $t('help.info.vehicles.content') }} -->
						{{text}}
					</template>
				</vue-collapsible-panel>

				<vue-collapsible-panel :expanded="false">
					<template #title>
						{{ $t('help.info.critical-areas.title') }}
					</template>
					<template #content>
						<!-- {{ $t('help.info.critical-areas.content') }} -->
						{{text}}
					</template>
				</vue-collapsible-panel>

				<vue-collapsible-panel :expanded="false">
					<template #title>
						{{ $t('help.info.select-bin.title') }}
					</template>
					<template #content>
						<!-- {{ $t('help.info.select-bin.content') }} -->
						{{text}}
					</template>
				</vue-collapsible-panel>

				<vue-collapsible-panel :expanded="false">
					<template #title>
						{{ $t('help.info.access-statistics.title') }}
					</template>
					<template #content>
						<!-- {{ $t('help.info.access-statistics.content') }} -->
						{{text}}
					</template>
				</vue-collapsible-panel>

				<vue-collapsible-panel :expanded="false">
					<template #title>
						{{ $t('help.info.best-plan.title') }}
					</template>
					<template #content>
						<!-- {{ $t('help.info.best-plan.content') }} -->
						{{text}}
					</template>
				</vue-collapsible-panel>
		</vue-collapsible-panel-group>
			
			
		</div>
	</div>
</template>

<script>
	export default {
    data() {
      return {
				panels: [],
        text: `
          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
          richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor
          brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon
          tempor, sunt aliqua put a bird on it squid single-origin coffee nulla
          assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
          wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher
          vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic
          synth nesciunt you probably haven't heard of them accusamus labore VHS.
        `
      }
    },

		mounted() {
			this.loadContent();
		},

		methods: {
			loadContent() {
				this.panels.push({
					title: this.$t('help.tracking.title'), 
					content: this.$t('help.tracking.content')});
				this.panels.push({
					title: this.$t('help.best-route.title'), 
					content: this.$t('help.best-route.content')});
				this.panels.push({
					title: this.$t('help.fuel.title'), 
					content: this.$t('help.fuel.content')});
				this.panels.push({
					title: this.$t('help.vehicles.title'), 
					content: this.$t('help.vehicles.content')});
				this.panels.push({
					title: this.$t('help.critical-areas.title'), 
					content: this.$t('help.critical-areas.content')});
				this.panels.push({
					title: this.$t('help.select-bin.title'), 
					content: this.$t('help.select-bin.content')});
				this.panels.push({
					title: this.$t('help.access-statistics.title'), 
					content: this.$t('help.access-statistics.content')});
				this.panels.push({
					title: this.$t('help.best-plan.title'), 
					content: this.$t('help.best-plan.content')});
			}
		}
  }
	
</script>

<style scoped>
	.container-components {
		padding: 20px;
    background-color: white;
    box-shadow: 0px 2px 6px #f5f5f5;
    border-radius: 10px;
    position: relative;
    top: 54px;
    margin-left: 300px;
    margin-right: 300px;
	}

	.vcp .vcp--expandable {
		background-color: #37CEB7;
	}
</style>