<script lang="ts">
	import setMap from '@scripts/setMap';
	export let zoom: number = 13;

	// Possible let svelte manage clouds once you've got them placed and can interact with the map?
</script>

<figure id="map" use:setMap={{ zoom }} />

<style>
	@import 'leaflet/dist/leaflet.css';

	figure {
		width: 100vw;
		height: 100vh;
		margin: 0;
		position: absolute;
	}

	:global(.leaflet-container) {
		background: black;
	}

	:global(.cloud) {
		position: relative;
		will-change: transform;
		z-index: 999;
	}
</style>
