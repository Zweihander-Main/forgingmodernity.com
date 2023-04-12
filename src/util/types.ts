export interface slimmedCanal {
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

export type slimmedCanals = Array<slimmedCanal>;

export type canalContentDOMId = `canal_${string}`;
export type canalPictureDOMId = `canal_${string}_image`;
