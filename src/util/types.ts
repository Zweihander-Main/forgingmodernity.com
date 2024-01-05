import type { ImageMetadata } from '../env';
export interface slimCanal {
	x: number;
	y: number;
	width: number;
	height: number;
	scale: number;
	stroke: number;
	path: string;
	name: string;
	pathYAdjust: number;
}

export type slimCanals = Array<slimCanal>;

export type canalContentDOMId = `canal_${string}`;
export type canalPictureDOMId = `canal_${string}_image`;

export interface ImageImport {
	default: ImageMetadata;
}

export type { ImageMetadata };
