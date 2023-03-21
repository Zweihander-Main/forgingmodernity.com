<script lang="ts">
	import { onMount } from 'svelte';
	import Map from './Map.svelte';
	import Cloud from './Cloud.svelte';
	import Canals from './Canal.svelte';
	import { TOTAL_CLOUDS, AVIF_BASE64 } from './vars';
	import { isFormatSupported } from './util';

	let avifSupported: boolean;

	onMount(async () => {
		avifSupported = await isFormatSupported('avif', AVIF_BASE64);
	});
</script>

<Map let:map let:L>
	{#if typeof avifSupported !== 'undefined'}
		{#each Array(TOTAL_CLOUDS) as _}
			<Cloud {map} {L} {avifSupported} />
		{/each}
	{/if}
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
