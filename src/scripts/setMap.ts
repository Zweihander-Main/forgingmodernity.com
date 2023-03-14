import type { LatLngBoundsExpression, LatLngTuple } from 'leaflet';

export interface args {
	latitude: number;
	longitude: number;
	zoom: number;
}

export default function setMap(
	mapElement: HTMLElement,
	{ latitude, longitude, zoom }: args
) {
	(async () => {
		const L = await import('leaflet');

		const imageWidth = 6834;
		const imageHeight = 8588;
		const maxZoom = Math.ceil(Math.log2(Math.max(imageWidth, imageHeight)));
		const minZoom = Math.floor(
			Math.log2(Math.min(imageWidth, imageHeight))
		);
		const toLatLng = (x: number, y: number) => {
			const latLng = L.CRS.Simple.pointToLatLng(
				new L.Point(x, y),
				maxZoom
			);
			return [latLng.lat, latLng.lng] as LatLngTuple;
		};

		const bounds: LatLngBoundsExpression = [
			toLatLng(0, 0),
			toLatLng(imageWidth, imageHeight),
		];

		const map = L.map(mapElement, {
			crs: L.CRS.Simple,
			maxZoom,
			minZoom,
			zoomSnap: 0,
			maxBounds: bounds,
		}).setView([latitude, longitude], zoom);

		L.imageOverlay('/img/map.jpg', bounds).addTo(map);
		map.fitBounds(bounds);
	})();
}
