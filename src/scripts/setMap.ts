export default function setMap(
	mapElement: HTMLElement,
	{
		latitude,
		longitude,
		zoom,
		markerMarkup = '',
	}: {
		latitude: number;
		longitude: number;
		zoom: number;
		markerMarkup?: string;
	}
) {
	(async () => {
		const {
			map: leafletMap,
			marker: leafletMarker,
			tileLayer,
		} = await import('leaflet');

		const map = leafletMap(mapElement).setView([latitude, longitude], zoom);
		tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution:
				'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
		}).addTo(map);

		if (markerMarkup !== '') {
			leafletMarker([latitude, longitude])
				.bindPopup(markerMarkup)
				.addTo(map);
		} else {
			leafletMarker([latitude, longitude]).addTo(map);
		}
	})();
}
