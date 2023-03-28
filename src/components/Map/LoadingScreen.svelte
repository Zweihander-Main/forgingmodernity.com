<script lang="ts">
	import { loadImage } from '@util/funcs';
	import { onMount } from 'svelte';

	let percentageDone = 0;
	let bgOpacity = 1;
	let mapImageElement: HTMLImageElement;
	let loadingScreenClass = 'loading-screen';

	onMount(() => {
		loadImage('/img/map.webp', (percentageLoaded: number) => {
			percentageDone = Math.floor(percentageLoaded);
		}).then((imgSrc) => {
			mapImageElement = new Image();
			mapImageElement.alt = 'Background Map Image';
			mapImageElement.src = imgSrc;
		});
	});

	$: if (percentageDone === 100) {
		bgOpacity = 0;
		loadingScreenClass += ' loaded';
	}
</script>

<aside class={loadingScreenClass} style={`opacity:${bgOpacity}`}>
	<span
		class="loading-indicator"
		style={`opacity:${1 - percentageDone / 100}`}
		>{`${percentageDone}%`}</span
	>
</aside>
{#if percentageDone === 100 && mapImageElement}
	<slot {mapImageElement} />
{/if}

<style lang="scss">
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
		text-shadow: 0px 2px 4px v.$color-shadow-light;
		will-change: opacity;
	}
</style>
