<script lang="ts">
	import Map from './Map.svelte';
	import Cloud from './Cloud.svelte';
	import Canal from './Canal.svelte';
	import GrabIndicator from './GrabIndicator.svelte';
	import { TOTAL_CLOUDS, AVIF_BASE64 } from './vars';
	import { isFormatSupported } from './util';
	import Icon from '@iconify/svelte';
	import type { CollectionEntry } from 'astro:content';

	export let canals: Array<CollectionEntry<'canals'>>;

	let avifSupported: boolean;

	(async () => {
		avifSupported = await isFormatSupported('avif', AVIF_BASE64);
	})();

	// Transform seems to fix things -- the viewbox is wrong for some reason, check 494/362 vs 188/137
</script>

<div class="home-button">
	<a href="/" title="Go back to the homepage">
		<Icon icon="mdi:home" class="home-icon" />
		<span class="home-text">Home</span>
	</a>
</div>
<Map let:map let:L>
	{#if typeof avifSupported !== 'undefined'}
		{#each Array(TOTAL_CLOUDS) as _}
			<Cloud {map} {L} {avifSupported} />
		{/each}
	{/if}
	{#each canals as { data: { x, y, width, height, scale, stroke, path, name, pathYAdjust } }}
		<Canal
			{map}
			{L}
			{x}
			{y}
			{width}
			{height}
			{scale}
			{stroke}
			{path}
			{name}
			{pathYAdjust}
		/>
	{/each}
	<GrabIndicator {map} {L} />
</Map>

<style lang="scss">
	$control-left-margin: 0.6rem;
	// Leaflet CSS located in Astro file
	// Overrides for leaflet CSS
	:global(.leaflet-container) {
		background: v.$color-mapbg !important;
	}

	:global(.leaflet-tooltip) {
		background-color: rgba(0, 0, 0, 0.5) !important;
		color: #fffafa !important;
		text-shadow: 2px 2px 5px black !important;
		border: 0px !important;
		font-size: 1.5rem;
		font-family: 'Vollkorn SC', serif;
		font-weight: 600;
		-webkit-text-stroke: 0.5px #222;
		padding: 0px 1rem !important;

		&::before {
			border: 0px !important;
		}
	}

	:global(.leaflet-top .leaflet-control) {
		margin-top: 2.5rem !important;
		margin-left: $control-left-margin !important;
	}

	:global(.leaflet-bar) {
		border-radius: 0px !important;
	}

	:global(.leaflet-bar a) {
		background-color: #fffafa !important;
		border-color: #999 !important;
	}

	:global(.leaflet-bar a.leaflet-disabled) {
		color: #c5b2b2 !important;
		background-color: #e9dbdb !important;
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
	.home-button {
		position: absolute;
		z-index: 1000;
		top: 0.4rem;
		left: $control-left-margin;
		font-size: 1.8rem;
	}

	.home-button a {
		color: #fffafa;
		text-decoration: none;
		display: flex;
		justify-content: center;
		align-items: center;
		filter: drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.5));
		transition: all 0.09s ease-in;
		&:hover {
			filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.7));
		}
	}

	:global(.home-icon) {
		position: relative;
		bottom: 0.2rem;
		margin-right: 0.3rem;
		filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.6));
		stroke: #222;
		stroke-width: 0.3px;
	}

	.home-text {
		font-family: 'Vollkorn SC', serif;
		font-weight: 600;
		font-size: 1.4rem;
		margin: 0;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6);
		-webkit-text-stroke: 0.3px #222;
	}
</style>
