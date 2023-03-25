<script lang="ts">
	import { onMount } from 'svelte';
	import L from 'leaflet';
	import {
		MAP_WIDTH,
		MAP_HEIGHT,
		MAP_H_GUTTER,
		MAP_V_GUTTER,
	} from '@util/vars';
	import type { LatLngBoundsExpression } from 'leaflet';

	const bounds: LatLngBoundsExpression = [
		[0, 0],
		[MAP_HEIGHT, MAP_WIDTH],
	];

	const zoom = 13;

	let mapElement: HTMLElement;
	let map: L.Map;

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

		L.imageOverlay('/img/map.webp', bounds, {
			className: 'map-image',
		}).addTo(map);
	});
</script>

<figure id="map" bind:this={mapElement}>
	{#if map}
		<slot {map} {L} />
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
