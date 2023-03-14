<script lang="ts">
	import setMap from '@scripts/setMap';

	export let location: {
		latitude: number;
		longitude: number;
	};
	export let zoom: number = 1;

	const { latitude, longitude } = location;
</script>

<figure use:setMap={{ latitude, longitude, zoom }} />

<style>
	@import 'leaflet/dist/leaflet.css';

	figure {
		width: 100vw;
		height: 100vh;
		margin: 0;
	}

	:global(.leaflet-container) {
		background: black;
	}
</style>
