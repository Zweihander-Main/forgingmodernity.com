<script lang="ts">
	import Modal from './Modal.svelte';
	import { camelCaseString } from '@util/funcs';
	import type { LatLngBoundsExpression, Map } from 'leaflet';
	import type { canalContentDOMId, canalPictureDOMId } from '@util/types';

	export let L: typeof import('leaflet');
	export let map: Map;
	export let name: string;
	export let x: number;
	export let y: number;
	export let height: number;
	export let width: number;
	export let scale: number;
	export let stroke: number;
	export let pathYAdjust: number;
	export let path: string;

	const visibleStrokeWidth = stroke;
	const hoverStrokeWidth = visibleStrokeWidth * 5;

	const camelCaseName = camelCaseString(name);

	const canalBounds = [
		[y, x],
		[y + height * scale, x + width * scale],
	] as LatLngBoundsExpression;

	const canalSVG = document.createElementNS(
		'http://www.w3.org/2000/svg',
		'svg'
	);
	canalSVG.classList.add('canal');
	canalSVG.setAttribute('data-testid', camelCaseName);
	canalSVG.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
	canalSVG.setAttribute('viewBox', `0 0 ${width} ${height}`);
	canalSVG.style.cssText = 'pointer-events: none !important';
	canalSVG.innerHTML = `
<defs>
	<path id="${camelCaseName}SVGPath"
		class="canal-path"
		d="${path}"
	/>
</defs>
<g transform="translate(0,${pathYAdjust})" id="${camelCaseName}" class="canal-group">
    <use class="canal-hover" xlink:href="#${camelCaseName}SVGPath" style="stroke-width:${hoverStrokeWidth}" pointer-events="stroke"/>
    <use class="canal-visible" xlink:href="#${camelCaseName}SVGPath" style="stroke-width:${visibleStrokeWidth}" />
</g>`;

	const svgLayer = L.svgOverlay(canalSVG, canalBounds, {
		interactive: true,
		zIndex: 100,
	});
	svgLayer.bindTooltip(name);

	let showModal = false;
	svgLayer.on('click', () => {
		showModal = true;
	});
	svgLayer.addTo(map);

	const contentID: canalContentDOMId = `canal_${camelCaseName}`;
	const imageID: canalPictureDOMId = `canal_${camelCaseName}_image`;

	const bodyContent = (document.getElementById(contentID) as HTMLElement)
		.innerHTML;

	// Replace forces image loading when component mounted
	const imageContent = (
		document.getElementById(imageID) as HTMLPictureElement
	).innerHTML.replace(/loading=.lazy./, 'loading="eager"');
</script>

<Modal {name} {L} bind:showModal>
	<svelte:fragment slot="text">
		{@html bodyContent}
	</svelte:fragment>
	<svelte:fragment slot="image">
		{@html imageContent}
	</svelte:fragment>
</Modal>

<style lang="scss">
	@use '../../styles/_variables.scss' as v;

	:global(.canal:focus) {
		outline: none;
	}

	:global(.canal-path) {
		fill: none;
		stroke-linecap: round;
		stroke-linejoin: miter;
	}

	:global(.canal-visible) {
		stroke: v.$color-map-peach;
		filter: drop-shadow(0 0 5px v.$color-shadow);
		transition: all v.$transition-speed-instant v.$transition-timing-instant;
	}

	:global(.canal-group) {
		pointer-events: all;
		cursor: pointer;

		&:hover > :global(.canal-visible) {
			stroke: v.$color-map-white;
			filter: drop-shadow(0 0 5px v.$color-shadow)
				drop-shadow(0 0 6px v.$color-shadow-light);
		}
	}
</style>
