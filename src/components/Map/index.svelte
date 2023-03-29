<script lang="ts">
	import { onMount } from 'svelte';
	import './leaflet.scss';
	import MapBG from './MapBG.svelte';
	import Cloud from './Cloud.svelte';
	import Canal from './Canal.svelte';
	import GrabIndicator from './GrabIndicator.svelte';
	import LoadingScreen from './LoadingScreen.svelte';
	import { TOTAL_CLOUDS, AVIF_BASE64 } from '@util/vars';
	import { isFormatSupported } from '@util/funcs';
	import Icon from '@iconify/svelte';
	import type { slimmedCanals } from '@util/types';

	export let canals: slimmedCanals;

	let avifSupported: boolean;
	isFormatSupported('avif', AVIF_BASE64).then((result) => {
		avifSupported = result;
	});
	let L: typeof import('leaflet');
	onMount(() => {
		import('leaflet').then((result) => {
			L = result;
		});
	});
</script>

<nav class="home-button">
	<a href="/" title="Go back to the homepage">
		<Icon icon="mdi:home" class="home-icon" />
		<span class="home-text">Home</span>
	</a>
</nav>
<slot name="canal-entry" />
<LoadingScreen let:setMapLoadedPercentage let:setMapLoaded let:setCloudLoaded>
	{#if L}
		<MapBG {L} {setMapLoadedPercentage} {setMapLoaded} let:map>
			{#if typeof avifSupported !== 'undefined'}
				{#each Array(TOTAL_CLOUDS) as _}
					<Cloud {map} {L} {avifSupported} {setCloudLoaded} />
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
			<GrabIndicator {map} />
		</MapBG>
	{/if}
</LoadingScreen>

<style lang="scss">
	@use 'sass:color';
	.home-button {
		position: absolute;
		z-index: 1000;
		top: 0.4rem;
		left: v.$margin-map-control-left;
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
