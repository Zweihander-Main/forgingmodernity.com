<script lang="ts">
	import setMap from '@scripts/setMap';

	export let location: {
		latitude: number;
		longitude: number;
	};
	export let zoom: number = 19;

	const { latitude, longitude } = location;
</script>

<figure use:setMap={{ latitude, longitude, zoom }} />

<style>
	@import 'leaflet/dist/leaflet.css';
	figure {
		width: 38rem;
		height: 21rem;
		box-shadow: var(--shadow-elevation-low);
	}
</style>
