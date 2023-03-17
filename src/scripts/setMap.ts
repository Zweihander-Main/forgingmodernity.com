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
		}).setView([0, 1], zoom);

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
				const width = cloudImage.naturalWidth;
				const height = cloudImage.naturalHeight;
				const cloud = new Cloud({
					x: Math.floor(Math.random() * MAP_WIDTH),
					y: Math.floor(Math.random() * MAP_HEIGHT),
					speed: Math.floor(Math.random() * 50000) + 50000,
					src: cloudSrc,
					width,
					height,
					L,
				});
				clouds.push(cloud);
				cloud.overlay.addTo(map);
				console.log(cloud.overlay.getBounds().getSouthWest());
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
	src: string;
	L: typeof import('leaflet');
}

class Cloud {
	public x: number;
	public y: number;
	public speed: number;
	public width: number;
	public height: number;
	public src: string;
	public L: typeof import('leaflet');
	public overlay: ImageOverlay;

	constructor({ x, y, speed, width, height, src, L }: CloudArgs) {
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.width = width;
		this.height = height;
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
				opacity: 1,
				alt: 'Cloud',
				className: 'cloud',
			}
		);
	}

	protected animate() {}
}

const MAP_WIDTH = 6609;
const MAP_HEIGHT = 8356;

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

const TOTAL_CLOUDS = 5;

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
