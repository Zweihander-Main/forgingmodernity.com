<script lang="ts">
	import setMap from '@scripts/setMap';
	export let zoom: number = 13;

	// Possible let svelte manage clouds once you've got them placed and can interact with the map?
</script>

<figure id="map" use:setMap={{ zoom }} />

<style lang="scss">
	figure {
		width: 100vw;
		height: 100vh;
		margin: 0;
		position: absolute;
	}

	:global(.leaflet-container) {
		background: #eee0c8;
	}

	:global(.cloud) {
		position: absolute;
		will-change: transform;
		z-index: 999;
		outline: none !important;
		transition: opacity 3s;
	}

	:global(.canal-visible) {
		stroke: #ff0000;
	}

	:global(.canal-group) {
		pointer-events: all;
	}

	:global(.canal-group:hover) {
		cursor: pointer;
	}

	:global(.canal-group:hover > .canal-visible) {
		stroke: #00ff00;
	}

	:global(.leaflet-interactive) {
		cursor: unset;
	}

	:global(
			.leaflet-marker-icon.leaflet-interactive,
			.leaflet-image-layer.leaflet-interactive,
			.leaflet-pane > svg path.leaflet-interactive,
			svg.leaflet-image-layer.leaflet-interactive path
		) {
		pointer-events: unset !important;
	}
</style>
