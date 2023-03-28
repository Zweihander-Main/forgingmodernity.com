<script lang="ts">
	import MapBG from './MapBG.svelte';
	import Cloud from './Cloud.svelte';
	import Canal from './Canal.svelte';
	import GrabIndicator from './GrabIndicator.svelte';
	import { TOTAL_CLOUDS, AVIF_BASE64 } from '@util/vars';
	import { isFormatSupported } from '@util/funcs';
	import Icon from '@iconify/svelte';
	import type { slimmedCanals } from '@util/types';

	export let canals: slimmedCanals;

	let avifSupported: boolean;
	let L: typeof import('leaflet');

	(async () => {
		L = await import('leaflet');
		avifSupported = await isFormatSupported('avif', AVIF_BASE64);
	})();
</script>

<nav class="home-button">
	<a href="/" title="Go back to the homepage">
		<Icon icon="mdi:home" class="home-icon" />
		<span class="home-text">Home</span>
	</a>
</nav>
<slot name="canal-entry" />
{#if L}
	<MapBG {L} let:map>
		{#if typeof avifSupported !== 'undefined'}
			{#each Array(TOTAL_CLOUDS) as _}
				<Cloud {map} {L} {avifSupported} />
			{/each}
		{/if}
		{#each canals as { x, y, width, height, scale, stroke, path, name, pathYAdjust, imageSrc }}
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
				{imageSrc}
			/>
		{/each}
		<GrabIndicator {map} {L} />
	</MapBG>
{/if}

<style lang="scss">
	@use 'sass:color';
	$control-left-margin: 0.6rem;
	// Leaflet CSS located in Astro file
	// Overrides for leaflet CSS
	:global(.leaflet-container) {
		background: v.$color-map-bg !important;
		font-family: unset !important;
		font-size: unset !important;
		line-height: unset !important;
	}

	:global(.leaflet-tooltip) {
		@include m.smallcaps;
		background-color: v.$color-shadow !important;
		color: v.$color-map-white !important;
		text-shadow: 2px 2px 5px black !important;
		border: 0px !important;
		font-size: 1.5rem;
		-webkit-text-stroke: 0.5px v.$color-text-stroke;
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
		background-color: v.$color-map-white !important;
		border-color: color.adjust(
			v.$color-map-white,
			$blackness: 60%
		) !important;
		transition: all v.$transition-speed-instant ease-in;

		&:hover {
			box-shadow: 0 0 2px 1px v.$color-shadow;
		}
	}

	:global(.leaflet-bar a.leaflet-disabled) {
		color: color.adjust(v.$color-map-white, $blackness: 30%) !important;
		background-color: color.adjust(
			v.$color-map-white,
			$blackness: 10%
		) !important;

		&:hover {
			box-shadow: none;
		}
	}

	:global(
			.leaflet-touch .leaflet-control-layers,
			.leaflet-touch .leaflet-bar
		) {
		border: 0px !important;
		box-shadow: 0 0 3px 1px v.$color-shadow !important;
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
		filter: drop-shadow(0px 0px 1px v.$color-shadow);
		transition: all v.$transition-speed-instant ease-in;
		&:hover {
			color: #fff;
			filter: drop-shadow(0px 0px 2px v.$color-shadow-dark);
		}
	}

	:global(.home-icon) {
		position: relative;
		bottom: 0.2rem;
		margin-right: 0.3rem;
		filter: drop-shadow(1px 1px 2px v.$color-shadow);
		stroke: v.$color-text-stroke;
		stroke-width: 0.3px;
	}

	.home-text {
		@include m.smallcaps;
		font-size: 1.4rem;
		margin: 0;
		text-shadow: 1px 1px 2px v.$color-shadow;
		-webkit-text-stroke: 0.3px v.$color-text-stroke;
	}
</style>
