<script lang="ts">
	import { TOTAL_CLOUDS } from '@util/vars';

	const MAP_WEIGHT = 0.8;
	const CLOUD_WEIGHT = 0.2;

	let visualPercentageDone = 0;
	let mapPercentageDone = 0;
	let cloudsPercentageDone = 0;
	let mapLoaded = false;
	let bgOpacity = 1;
	let loadingScreenClass = 'loading-screen';
	let cloudsLoaded = 0;

	const setMapLoadedPercentage = (percentage: number) => {
		mapPercentageDone = Math.floor(percentage);
	};

	const setMapLoaded = () => {
		mapLoaded = true;
	};

	const setCloudLoaded = () => {
		cloudsLoaded++;
		cloudsPercentageDone = Math.floor((cloudsLoaded / TOTAL_CLOUDS) * 100);
	};

	$: visualPercentageDone = Math.floor(
		mapPercentageDone * MAP_WEIGHT + cloudsPercentageDone * CLOUD_WEIGHT
	);

	$: if (
		visualPercentageDone === 100 &&
		mapLoaded &&
		cloudsLoaded === TOTAL_CLOUDS
	) {
		bgOpacity = 0;
		loadingScreenClass += ' loaded';
	}
</script>

<aside class={loadingScreenClass} style={`opacity:${bgOpacity}`}>
	<noscript>
		<p>Map requires JavaScript to work!</p>
	</noscript>
	<span
		class="loading-indicator"
		style={`opacity:${1 - visualPercentageDone / 100}`}
		>{`${visualPercentageDone}%`}</span
	>
</aside>
<slot {setMapLoadedPercentage} {setMapLoaded} {setCloudLoaded} />

<style lang="scss">
	@use '../../styles/_variables.scss' as v;

	.loading-screen {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: v.$color-map-bg;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 9999;
		will-change: opacity;
		transition: opacity v.$transition-speed-page-change v.$transition-timing;
	}

	.loaded {
		pointer-events: none;
	}

	.loading-indicator {
		font-size: 5vw;
		font-family: v.$font-family-headings;
		color: v.$color-text-stroke;
		text-shadow: 0 2px 4px v.$color-shadow-light;
		will-change: opacity;
	}
</style>
