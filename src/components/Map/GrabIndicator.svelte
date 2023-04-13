<script lang="ts">
	import Icon from '@iconify/svelte/dist/OfflineIcon.svelte';
	import handDrag from '@iconify-icons/icon-park/hand-drag';
	import type { Map } from 'leaflet';

	import { onMount } from 'svelte';

	export let map: Map;

	let grabIcon: HTMLElement;
	onMount(() => {
		const hideGrab = () => {
			grabIcon.classList.add('grab-hide');
			map.off('dragstart', hideGrab);
			map.off('zoomstart', hideGrab);
		};

		map.on('dragstart', hideGrab);
		map.on('zoomstart', hideGrab);
	});
</script>

<div bind:this={grabIcon}>
	<Icon icon={handDrag} class="grab-icon" />
</div>

<style lang="scss">
	:global(.grab-hide) {
		display: none;
	}

	:global(.grab-icon) {
		font-size: 3rem;
		position: fixed;
		z-index: 1100;
		bottom: 30%;
		left: 30%;
		animation: 1.5s ease-in-out 0s infinite forwards drag-gesture;
		will-change: transform opacity;
		filter: drop-shadow(0 0 1px v.$color-black)
			drop-shadow(0 0 0.4rem v.$color-black);
	}

	:global(.grab-icon g) {
		stroke: v.$color-map-white;
		padding: 1rem;
	}

	@keyframes -global-drag-gesture {
		0% {
			transform: translate(0rem, 3rem);
			opacity: 0;
		}
		10% {
			opacity: 0.9;
		}
		60% {
			opacity: 0.9;
		}
		100% {
			opacity: 0;
			transform: translate(3rem, 0rem);
		}
	}
</style>
