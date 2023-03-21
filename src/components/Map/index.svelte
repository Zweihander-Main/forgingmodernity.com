<script lang="ts">
	import Map from './Map.svelte';
	import Cloud from './Cloud.svelte';
	import Canal from './Canal.svelte';
	import { TOTAL_CLOUDS, AVIF_BASE64 } from './vars';
	import { isFormatSupported } from './util';
	import type { CollectionEntry } from 'astro:content';

	export let canals: Array<CollectionEntry<'canals'>>;

	let avifSupported: boolean;

	(async () => {
		avifSupported = await isFormatSupported('avif', AVIF_BASE64);
	})();

	// Transform seems to fix things -- the viewbox is wrong for some reason, check 494/362 vs 188/137
</script>

<Map let:map let:L>
	{#if typeof avifSupported !== 'undefined'}
		{#each Array(TOTAL_CLOUDS) as _}
			<Cloud {map} {L} {avifSupported} />
		{/each}
	{/if}
	{#each canals as { data: { x, y, width, height, scale, path, name } }}
		<Canal
			{map}
			{L}
			{x}
			{y}
			width={width + 200}
			height={height + 80}
			{scale}
			{path}
			{name}
		/>
	{/each}
</Map>

<style lang="scss">
	// Leaflet CSS located in Astro file
	// Overrides for leaflet CSS
	:global(.leaflet-container) {
		background: v.$color-mapbg !important;
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
