<template>
	<div class="container-components col-xs-9 offset-xs-2 row">

		<div class="col-xs-12">
			<h1 style="width: 100%;">{{ $t('help.help-and-documentation') }}</h1>
		</div>

		<br><br>

		<div class="accordion col-xs-12" id="accordionExample" style="margin-top: 20px; padding-bottom: 25px;">
			<vue-collapsible-panel-group accordion>
				<vue-collapsible-panel :expanded="false">
						<template #title>
							{{ $t('help.info.tracking.title') }}
						</template>
						<template #content>
							{{ $t('help.info.tracking.content') }}
						</template>
				</vue-collapsible-panel>

				<vue-collapsible-panel :expanded="false">
					<template #title>
						{{ $t('help.info.best-route.title') }}
					</template>
					<template #content>
						{{ $t('help.info.best-route.content') }}
					</template>
				</vue-collapsible-panel>

				<vue-collapsible-panel :expanded="false">
					<template #title>
						{{ $t('help.info.critical-areas.title') }}
					</template>
					<template #content>
						{{ $t('help.info.critical-areas.content') }}
					</template>
				</vue-collapsible-panel>

				<vue-collapsible-panel :expanded="false">
					<template #title>
						{{ $t('help.info.select-bin.title') }}
					</template>
					<template #content>
						{{ $t('help.info.select-bin.content') }}
					</template>
				</vue-collapsible-panel>

				<vue-collapsible-panel :expanded="false">
					<template #title>
						{{ $t('help.info.alternative-routes.title') }}
					</template>
					<template #content>
						{{ $t('help.info.alternative-routes.content') }}
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
				panels: []
      }
    },
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
    margin-right: 20px;
	}

	/* .vcp .vcp--expandable {
		background-color: #37CEB7;
	} */

	@media screen and (max-width: 500px) {
  .container-components {
    margin-left: 10px;
    margin-right: 10px;
  }
}
</style>