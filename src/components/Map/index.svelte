<script lang="ts">
	import Map from './map.svelte';
	import Cloud from './clouds.svelte';
	import Canals from './canals.svelte';
</script>

<Map let:map let:L>
	<Cloud {map} {L} />
	<Canals {map} {L} />
</Map>

<style lang="scss">
	// Leaflet CSS located in Astro file
	// Overrides for leaflet CSS
	:global(.leaflet-container) {
		background: #eee0c8 !important;
	}
	:global(.leaflet-interactive) {
		cursor: unset !important;
	}

	:global(
			.leaflet-marker-icon.leaflet-interactive,
			.leaflet-image-layer.leaflet-interactive,
			.leaflet-pane > svg path.leaflet-interactive,
			svg.leaflet-image-layer.leaflet-interactive path
		) {
		pointer-events: unset !important;
	}
	// End overrides
</style>
