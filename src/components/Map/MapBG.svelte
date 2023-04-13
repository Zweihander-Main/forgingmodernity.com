<script lang="ts">
	import { onMount } from 'svelte';
	import {
		MAP_WIDTH,
		MAP_HEIGHT,
		MAP_H_GUTTER,
		MAP_V_GUTTER,
	} from '@util/vars';
	import type { LatLngBoundsExpression, Map } from 'leaflet';
	import { loadImage } from '@util/funcs';

	export let L: typeof import('leaflet');
	export let setMapLoadedPercentage: (percentageLoaded: number) => void;
	export let setMapLoaded: () => void;

	const bounds: LatLngBoundsExpression = [
		[0, 0],
		[MAP_HEIGHT, MAP_WIDTH],
	];

	const zoom = 13;

	let mapElement: HTMLElement;
	let map: Map;

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

		void loadImage('/img/map.webp', (percentageLoaded: number) => {
			setMapLoadedPercentage(percentageLoaded);
		}).then((imgSrc) => {
			const mapImageElement = new Image();
			mapImageElement.alt = 'Background Map Image';
			mapImageElement.src = imgSrc;

			const mapOverlay = L.imageOverlay(mapImageElement, bounds, {
				className: 'map-image',
			});

			mapOverlay.addTo(map);

			mapOverlay.on('load', setMapLoaded);
		});
	});
</script>

<figure id="map" bind:this={mapElement}>
	{#if map}
		<slot {map} />
	{/if}
</figure>

<style lang="scss">
	@use '../../styles/_variables.scss' as v;

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
