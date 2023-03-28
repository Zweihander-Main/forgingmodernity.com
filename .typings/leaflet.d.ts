import {LatLngBoundsExpression, ImageOverlay, ImageOverlayOptions} from 'leaflet';

declare module 'leaflet' {
	export function imageOverlay(imageUrl: string | HTMLImageElement, bounds: LatLngBoundsExpression, options?: ImageOverlayOptions): ImageOverlay;
}

