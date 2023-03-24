<script lang="ts">
	import Map from './Map.svelte';
	import Cloud from './Cloud.svelte';
	import Canal from './Canal.svelte';
	import GrabIndicator from './GrabIndicator.svelte';
	import { TOTAL_CLOUDS, AVIF_BASE64 } from '@util/vars';
	import { isFormatSupported } from '@util/funcs';
	import Icon from '@iconify/svelte';
	import type { slimmedCanals } from '@util/types';

	export let canals: slimmedCanals;

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
<slot name="canal-entry" />
<Map let:map let:L>
	{#if typeof avifSupported !== 'undefined'}
		{#each Array(TOTAL_CLOUDS) as _}
			<Cloud {map} {L} {avifSupported} />
		{/each}
	{/if}
	{#each canals as { x, y, width, height, scale, stroke, path, name, pathYAdjust }}
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
		background-color: rgba(0, 0, 0, 0.6) !important;
		color: #fffafa !important;
		text-shadow: 2px 2px 5px black !important;
		border: 0px !important;
		font-size: 1.5rem;
		font-family: 'Vollkorn SC', serif;
		font-weight: 600;
		-webkit-text-stroke: 0.5px #222;
		padding: 5px 1rem 0 !important;
		box-shadow: none !important;
		height: fit-content;
		border-radius: 8px !important;

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
		transition: all 0.06s ease-in;

		&:hover {
			box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.6);
		}
	}

	:global(.leaflet-bar a.leaflet-disabled) {
		color: #c5b2b2 !important;
		background-color: #eee9e9 !important;

		&:hover {
			box-shadow: none;
		}
	}

	:global(
			.leaflet-touch .leaflet-control-layers,
			.leaflet-touch .leaflet-bar
		) {
		border: 0px !important;
		box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.6) !important;
		position: relative;
		left: 3px;
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
		transition: all 0.06s ease-in;
		&:hover {
			color: #fff;
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
