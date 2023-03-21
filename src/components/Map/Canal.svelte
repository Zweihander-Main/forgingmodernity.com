<script lang="ts">
	import type { LatLngBoundsExpression } from 'leaflet';
	import { camelCaseString } from './util';

	export let L: typeof import('leaflet');
	export let map: L.Map;
	export let x: number;
	export let y: number;
	export let height: number;
	export let width: number;
	export let scale: number;
	export let path: string;
	export let name: string;

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
	canalSVG.innerHTML = `
<defs>
	<path id="${camelCaseName}SVGPath"
		class="canal-path"
		d="${path}"
	/>
</defs>
<g transform="translate(0,-70)" id="${camelCaseName}" class="canal-group">
    <use class="canal-hover" xlink:href="#${camelCaseName}SVGPath" pointer-events="stroke"/>
    <use class="canal-visible" xlink:href="#${camelCaseName}SVGPath"/>
</g>`;
	L.svgOverlay(canalSVG, canalBounds, {
		interactive: true,
	}).addTo(map);
</script>

<style lang="scss">
	:global(.canal-path) {
		fill: none;
		stroke-linecap: round;
		stroke-linejoin: miter;
	}

	:global(.canal-hover) {
		stroke-width: 20;
	}

	:global(.canal-visible) {
		stroke: #ff0000;
		stroke-width: 4;
	}

	:global(.canal-group) {
		pointer-events: all;
		cursor: pointer;

		&:hover > :global(.canal-visible) {
			stroke: #00ff00;
		}
	}
</style>
