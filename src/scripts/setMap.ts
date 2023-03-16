import type {
	ImageOverlay,
	LatLngBoundsExpression,
	LatLngTuple,
	LatLngExpression,
} from 'leaflet';

export interface args {
	zoom: number;
}

export default function setMap(mapElement: HTMLElement, { zoom }: args) {
	(async () => {
		const L = await import('leaflet');

		const MAP_WIDTH = 6609;
		const MAP_HEIGHT = 8356;
		const maxZoom = Math.ceil(Math.log2(Math.max(MAP_WIDTH, MAP_HEIGHT)));
		const minZoom = Math.floor(Math.log2(Math.min(MAP_WIDTH, MAP_HEIGHT)));

		const toLatLng = (x: number, y: number) => {
			const latLng = L.CRS.Simple.pointToLatLng(
				new L.Point(x, y),
				maxZoom
			);
			return [latLng.lat, latLng.lng] as LatLngTuple;
		};

		const bounds: LatLngBoundsExpression = [
			toLatLng(0, 0),
			toLatLng(MAP_WIDTH, MAP_HEIGHT),
		];

		const map = L.map(mapElement, {
			attributionControl: false,
			crs: L.CRS.Simple,
			maxZoom,
			minZoom,
			zoomSnap: 0,
			maxBounds: bounds,
		}).setView([0, 1], zoom);

		L.imageOverlay('/img/map.webp', bounds)
			.addTo(map)
			.on('load', async () => {
				const AVIF_BASE64 =
					'AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=';

				const isFormatSupported = (
					format: string,
					dataUri: string
				): Promise<boolean> =>
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

				const TOTAL_CLOUDS = 50;

				const map = document.querySelector('.leaflet-map-pane');
				console.log(map);
				const avifSupport = await isFormatSupported(
					'avif',
					AVIF_BASE64
				);

				for (let i = 0; i < TOTAL_CLOUDS; i++) {
					const cloudSrc = `${
						IMAGES[
							Math.floor(Math.random() * IMAGES.length)
						] as string
					}.${avifSupport ? 'avif' : 'png'}`;
					const x = Math.random() * 100;
					const y = Math.random() * 100;
					const opacity = Math.random() * 0.3 + 0.7;
					const cloud = new Image();
					cloud.src = cloudSrc;
					cloud.classList.add('cloud');
					cloud.style.opacity = opacity.toString();
					cloud.style.transform = `translate3d(${x}px, ${y}px, 0)`;
					cloud.alt = 'cloud';
					cloud.onload = () => {
						cloud.width = cloud.naturalWidth;
						cloud.height = cloud.naturalHeight;
						map?.appendChild(cloud);
					};
				}
			});
	})();
}
