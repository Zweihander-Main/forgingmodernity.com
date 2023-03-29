<script lang="ts">
	import { onMount } from 'svelte';
	import {
		MAP_WIDTH,
		MAP_HEIGHT,
		MAP_H_GUTTER,
		MAP_V_GUTTER,
	} from '@util/vars';
	import type { LatLngBoundsExpression } from 'leaflet';

	export let L: typeof import('leaflet');
	export let mapImageElement: HTMLImageElement;
	export let setMapLoaded: () => void;

	const bounds: LatLngBoundsExpression = [
		[0, 0],
		[MAP_HEIGHT, MAP_WIDTH],
	];

	const zoom = 13;

	let mapElement: HTMLElement;
	let map: L.Map;
	let mapLoaded = false;

	onMount(() => {
		map = L.map(mapElement, {
			attributionControl: false,
			crs: L.CRS.Simple,
			maxZoom: -1,
			minZoom: -3,
			zoomSnap: 1,
			maxBounds: bounds,
		}).setView(
			[
				MAP_HEIGHT - MAP_V_GUTTER - window.innerHeight,
				MAP_WIDTH - MAP_H_GUTTER - window.innerWidth,
			],
			zoom
		);

		const mapOverlay = L.imageOverlay(mapImageElement, bounds, {
			className: 'map-image',
		});

		mapOverlay.addTo(map);

		mapOverlay.on('load', () => {
			mapLoaded = true;
			setMapLoaded();
		});
	});
</script>

<figure id="map" bind:this={mapElement}>
	{#if map && mapLoaded}
		<slot {map} />
	{/if}
</figure>

<style lang="scss">
	figure {
		width: 100vw;
		height: 100vh;
		margin: 0;
		position: absolute;
	}

	:global(.map-image) {
		box-shadow: 0 0 2rem v.$color-shadow-light;
	}
</style>
