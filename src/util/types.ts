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
	imageSrc: string;
}

export type slimmedCanals = Array<slimmedCanal>;
