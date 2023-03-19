import type { LatLngBoundsExpression, ImageOverlay } from 'leaflet';

export interface args {
	zoom: number;
}

export default function setMap(mapElement: HTMLElement, { zoom }: args) {
	(async () => {
		const L = await import('leaflet');

		const bounds: LatLngBoundsExpression = [
			[0, 0],
			[MAP_HEIGHT, MAP_WIDTH],
		];

		const map = L.map(mapElement, {
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

		L.imageOverlay('/img/map.webp', bounds)
			.addTo(map)
			.on('load', async () => {});

		const x = 2770;
		const y = 3850;
		const height = 188.10725;
		const width = 137.65312;
		const scale = 6.8;

		const trentAndMerseyCanalBounds = [
			[y, x],
			[y + height * 1.3 * scale, x + width * scale],
		] as LatLngBoundsExpression;

		const trentAndMerseyCanalSVG = document.createElementNS(
			'http://www.w3.org/2000/svg',
			'svg'
		);
		trentAndMerseyCanalSVG.classList.add('canal');
		trentAndMerseyCanalSVG.setAttribute(
			'xmlns',
			'http://www.w3.org/2000/svg'
		);
		trentAndMerseyCanalSVG.setAttribute(
			'viewBox',
			'0 0 188.10725 137.65312'
		);
		trentAndMerseyCanalSVG.innerHTML = `
<defs>
	<path id="trentAndMerseySVGPath"
		style="fill:none;stroke-linecap:square;stroke-linejoin:miter;stroke-opacity:1"
		d="m 10.457689,79.050114 c -0.08906,0.41152 2.125284,1.182812 2.372167,1.301637 1.284011,0.61799 2.2163,1.83506 3.397953,2.603275 0.787381,0.511892 2.160137,0.749911 3.077387,0.942543 1.988199,0.417545 3.977091,1.840442 5.898328,2.064698 3.511115,0.409837 4.317086,-2.016985 8.014048,-0.134676 0.397097,0.202181 1.204211,0.474226 1.474592,0.852802 0.386085,0.540584 -0.455613,1.896806 -0.06412,2.513502 0.259924,0.409443 2.201109,4.289055 1.602828,4.847487 -0.416089,0.388379 -1.250635,0.292039 -1.666949,0.583512 -0.548527,0.384043 -0.586576,3.446 -0.192326,3.860012 1.137203,1.194197 2.300949,2.183284 3.462073,3.321434 1.506178,1.47637 2.164815,3.54154 3.462073,5.20655 0.606483,0.77841 1.443122,1.38271 1.987481,2.19931 0.155877,0.23383 1.12467,0.77818 1.154025,0.94257 0.379159,2.12345 0.01786,4.64618 0.384654,6.95703 0.94107,1.32729 1.310746,2.69737 2.179839,3.32143 1.301676,0.91119 4.481523,1.33884 6.090655,1.66073 1.129504,0.22595 2.526168,-0.0927 3.590279,0.40394 2.48493,1.15984 6.542762,2.77424 8.206409,4.93726 0.642991,0.83599 0.973813,1.94701 1.602796,2.82769 1.24696,1.74595 3.142901,2.71794 4.231412,4.62307 0.989272,1.73144 1.148184,3.57861 1.987482,5.3412 0.912907,1.91716 3.503228,5.3628 3.846726,7.0468 0.461323,2.26164 -0.483661,4.55074 -0.256447,6.7775 0.634362,6.21688 1.01087,11.98697 3.141506,17.95364 0.497782,1.39399 4.379331,4.91848 5.706002,5.47584 1.059481,0.44511 4.394345,5.68044 5.513676,6.77751 1.98293,1.94351 4.195455,3.44377 6.3471,5.25146 0.960244,0.80674 1.128146,1.89371 1.795155,2.82769 0.546172,0.76477 2.370037,2.0051 2.500377,2.91747 0.13078,0.91545 -1.0641,1.6253 -0.64113,2.5135 0.67223,1.41162 6.84617,3.58104 8.7193,4.89236 5.18748,5.20291 9.8023,9.23743 17.50267,11.3108 1.64778,0.32963 2.61253,2.40934 4.10321,2.55838 2.24655,0.2246 3.4607,-2.54052 5.25719,-3.41118 2.14583,-1.03997 4.56212,-0.79681 6.53943,-2.37886 1.06055,-0.84854 1.46927,-2.6991 2.17987,-3.86004 0.59013,-0.96411 1.86486,-1.4454 2.43623,-2.37886 0.59733,-0.97588 0.86734,-3.12419 1.73103,-3.81513 2.26102,-1.80879 3.68234,-4.80969 5.77012,-7.00193 0.66886,-0.70233 0.50578,-2.08563 1.28227,-2.73792 2.72137,-2.28612 5.84088,-4.13357 8.78335,-6.194 1.40316,-0.98254 2.36442,-2.65634 3.84679,-3.54585 1.75783,-1.0548 3.05143,-0.47801 4.87251,0 1.86505,0.48955 3.58095,0.59412 5.38547,1.43628 2.60457,1.21554 8.17428,6.8086 11.15552,3.05211 1.73437,-2.18536 3.56091,-3.68203 5.96242,-5.027 1.80201,-1.00922 1.70438,-0.6899 2.22825,-0.6485"
	/>
</defs>
<g id="trentAndMersey" class="canal-group">
    <use class="canal-hover" xlink:href="#trentAndMerseySVGPath" stroke-width="20" pointer-events="stroke"/>
    <use class="canal-visible" xlink:href="#trentAndMerseySVGPath" stroke-width="3"/>
</g>`;
		L.svgOverlay(trentAndMerseyCanalSVG, trentAndMerseyCanalBounds, {
			interactive: true,
		}).addTo(map);

		const trentAndMerseyCanalGroup =
			document.getElementById('trentAndMersey');

		trentAndMerseyCanalGroup?.addEventListener('pointerdown', (e) => {
			console.log(e);
		});

		const avifSupport = await isFormatSupported('avif', AVIF_BASE64);

		const clouds: Array<Cloud> = [];

		for (let i = 0; i < TOTAL_CLOUDS; i++) {
			const cloudSrc = `${
				IMAGES[Math.floor(Math.random() * IMAGES.length)] as string
			}.${avifSupport ? 'avif' : 'png'}`;
			const cloudImage = new Image();
			cloudImage.src = cloudSrc;
			cloudImage.onload = () => {
				const randomSizeScale = Math.random() * 0.7 + 1;
				const width = cloudImage.naturalWidth * randomSizeScale;
				const height = cloudImage.naturalHeight * randomSizeScale;
				const cloud = new Cloud({
					x: getCloudXStart(width),
					y: getCLoudYStart(height),
					opacity: Math.random() * 0.5 + 0.5,
					speed: Math.floor(Math.random() * 1.7) + 0.3,
					src: cloudSrc,
					width,
					height,
					L,
				});
				clouds.push(cloud);
				cloud.overlay.addTo(map);
				cloud.raq();
			};
		}
	})();
}

interface CloudArgs {
	x: number;
	y: number;
	speed: number;
	width: number;
	height: number;
	opacity: number;
	src: string;
	L: typeof import('leaflet');
}

class Cloud {
	private x: number;
	private y: number;
	private speed: number;
	private width: number;
	private height: number;
	private opacity: number;
	private src: string;
	private L: typeof import('leaflet');
	public overlay: ImageOverlay;
	private start: number | false = false;
	private previousTimeStamp = 0;

	constructor({ x, y, speed, width, height, opacity, src, L }: CloudArgs) {
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.width = width;
		this.height = height;
		this.opacity = opacity;
		this.src = src;
		this.L = L;

		this.overlay = this.L.imageOverlay(
			this.src,
			[
				[this.y, this.x],
				[this.y + this.height, this.x + this.width],
			],
			{
				interactive: false,
				opacity: this.opacity,
				alt: 'Cloud',
				className: 'cloud',
			}
		);
	}

	public raq() {
		window.requestAnimationFrame(this.animate.bind(this));
	}

	public animate(timestamp: number) {
		if (!this.start) {
			this.start = timestamp;
		}
		if (this.previousTimeStamp !== timestamp) {
			if (this.x > MAP_WIDTH + 150) {
				this.x = -this.width;
				this.y = getCLoudYStart(this.height);
				this.overlay.setOpacity(this.opacity);
			} else if (this.x > MAP_WIDTH) {
				this.overlay.setOpacity(0);
			}
			this.x = this.x + this.speed;
			this.overlay.setBounds([
				[this.y, this.x],
				[this.y + this.height, this.x + this.width],
			]);
		}
		this.previousTimeStamp = timestamp;
		this.raq();
	}
}

const MAP_WIDTH = 6609;
const MAP_HEIGHT = 8356;
const MAP_V_GUTTER = 586;
const MAP_H_GUTTER = 340;

const AVIF_BASE64 =
	'AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=';

const isFormatSupported = (format: string, dataUri: string): Promise<boolean> =>
	new Promise<boolean>((resolve, reject) => {
		const image = new Image();
		image.src = `data:image/${format};base64,${dataUri}`;
		image.onload = () => {
			resolve(true);
		};
		image.onerror = () => {
			reject(false);
		};
	}).catch(() => false);

const IMAGES: Array<string> = [
	'img/clouds/cloud1',
	'img/clouds/cloud2',
	'img/clouds/cloud3',
	'img/clouds/cloud4',
	'img/clouds/cloud5',
	'img/clouds/cloud6',
	'img/clouds/cloud7',
];

const TOTAL_CLOUDS = 25;

function getCloudXStart(width: number) {
	return Math.floor(Math.random() * MAP_WIDTH - width - MAP_H_GUTTER);
}

function getCLoudYStart(height: number) {
	return Math.floor(
		Math.random() * (MAP_HEIGHT - height - 2 * MAP_V_GUTTER) + MAP_V_GUTTER
	);
}
