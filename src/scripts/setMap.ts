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

// const map = document.querySelector('.leaflet-map-pane');

// for (let i = 0; i < TOTAL_CLOUDS; i++) {
// 	const cloudSrc = `${
// 		IMAGES[
// 			Math.floor(Math.random() * IMAGES.length)
// 		] as string
// 	}.${avifSupport ? 'avif' : 'png'}`;
// 	const x = Math.random() * 100;
// 	const y = Math.random() * 100;
// 	const opacity = Math.random() * 0.3 + 0.7;
// 	const cloud = new Image();
// 	cloud.src = cloudSrc;
// 	cloud.classList.add('cloud');
// 	cloud.style.opacity = opacity.toString();
// 	cloud.style.transform = `translate3d(${x}px, ${y}px, 0)`;
// 	cloud.alt = 'cloud';
// 	cloud.onload = () => {
// 		cloud.width = cloud.naturalWidth;
// 		cloud.height = cloud.naturalHeight;
// 		map?.appendChild(cloud);
// 	};
// }

// const cloud = L.motion
// 	.icon({
// 		iconUrl: cloudSrc,
// 		iconSize: [CLOUD_SIZE, CLOUD_SIZE],
// 		iconAnchor: [CLOUD_SIZE / 2, CLOUD_SIZE / 2],
// 	})
// 	.addTo(map);

// const position: LatLngTuple = [
// 	Math.random() * MAP_HEIGHT,
// 	Math.random() * MAP_WIDTH,
// ];

// cloud.setLatLng(position);

// const speed = Math.random() * 0.0001 + 0.00005;

// cloud.motionPath([
// 	position,
// 	[
// 		position[0] + Math.random() * 0.0001 - 0.00005,
// 		position[1] + Math.random() * 0.0001 - 0.00005,
// 	],
// ]);

// cloud.motionSpeed(speed);