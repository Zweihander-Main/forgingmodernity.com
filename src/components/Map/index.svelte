<script lang="ts">
	import { onMount } from 'svelte';
	import './leaflet.scss';
	import './globals.scss';
	import MapBG from './MapBG.svelte';
	import Cloud from './Cloud.svelte';
	import Canal from './Canal.svelte';
	import GrabIndicator from './GrabIndicator.svelte';
	import LoadingScreen from './LoadingScreen.svelte';
	import { TOTAL_CLOUDS, AVIF_BASE64 } from '@util/vars';
	import { isFormatSupported } from '@util/funcs';
	import Icon from '@iconify/svelte';
	import type { slimCanals } from '@util/types';

	export let canals: slimCanals;

	let avifSupported: boolean;
	void isFormatSupported('avif', AVIF_BASE64).then((result) => {
		avifSupported = result;
	});
	let L: typeof import('leaflet');
	onMount(() => {
		void import('leaflet').then((result) => {
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
	@use '../../styles/_variables.scss' as v;
	@use '../../styles/_mixins.scss' as m;

	.home-button {
		position: absolute;
		z-index: 10001;
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
		filter: drop-shadow(0 0 1px v.$color-shadow);
		transition: all v.$transition-speed-instant ease-in;

		&:hover {
			color: #fff;
			filter: drop-shadow(0 0 2px v.$color-shadow-dark);
		}
	}

	.home-text {
		@include m.smallcaps;
		@include m.text-stroke(
			v.$color-text-stroke,
			0.5px,
			1px 1px 2px v.$color-shadow
		);

		font-size: 1.4rem;
		margin: 0;
	}
</style>
