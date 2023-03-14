export default function setMap(
	mapElement: HTMLElement,
	{
		latitude,
		longitude,
		zoom,
	}: {
		latitude: number;
		longitude: number;
		zoom: number;
	}
) {
	(async () => {
		const { map: leafletMap, tileLayer } = await import('leaflet');

		const map = leafletMap(mapElement).setView([latitude, longitude], zoom);
		tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution:
				'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
		}).addTo(map);
	})();
}
