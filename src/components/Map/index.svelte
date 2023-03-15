<script lang="ts">
	import setMap from '@scripts/setMap';

	export let zoom: number = 1;

</script>

<figure use:setMap={{ zoom }} />

<style>
	@import 'leaflet/dist/leaflet.css';

	figure {
		width: 100vw;
		height: 100vh;
		margin: 0;
	}

	:global(.leaflet-container) {
		background: black;
	}
</style>
