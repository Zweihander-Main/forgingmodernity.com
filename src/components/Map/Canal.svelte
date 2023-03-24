<script lang="ts">
	import CanalModal from './CanalModal.svelte';
	import { camelCaseString } from '@util/funcs';
	import type { LatLngBoundsExpression } from 'leaflet';

	export let L: typeof import('leaflet');
	export let map: L.Map;
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

	const bodyContent = (
		document.getElementById(`canal_${camelCaseName}`) as HTMLElement
	).innerHTML;
</script>

<CanalModal bind:showModal>
	{@html bodyContent}
</CanalModal>

<style lang="scss">
	:global(.canal:focus) {
		outline: none;
	}

	:global(.canal-path) {
		fill: none;
		stroke-linecap: round;
		stroke-linejoin: miter;
	}

	:global(.canal-visible) {
		stroke: #fee5e5;
		filter: drop-shadow(0px 0px 5px rgb(0 0 0 / 0.6));
		transition: all 0.06s ease-in;
	}

	:global(.canal-group) {
		pointer-events: all;
		cursor: pointer;

		&:hover > :global(.canal-visible) {
			stroke: #fffafa;
			filter: drop-shadow(0px 0px 5px rgb(0 0 0/ 0.6))
				drop-shadow(0px 0px 8px rgb(0 0 0 / 0.4));
		}
	}
</style>
