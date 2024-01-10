<script lang="ts">
	import Icon from '@iconify/svelte';
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
	<Icon icon="icon-park:hand-drag" class="grab-icon" />
</div>
