<script lang="ts">
	import type { ImageOverlay, Map } from 'leaflet';
	// prettier-ignore
	import {
		MAP_WIDTH,
		MAP_HEIGHT,
		MAP_H_GUTTER,
		MAP_V_GUTTER,
		CLOUD_IMAGES
	} from '@util/vars';

	export let L: typeof import('leaflet');
	export let map: Map;
	export let avifSupported: boolean;
	export let setCloudLoaded: () => void;

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

		constructor({
			x,
			y,
			speed,
			width,
			height,
			opacity,
			src,
			L,
		}: CloudArgs) {
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
					zIndex: 2,
				}
			);

			this.overlay.on('load', () => {
				setCloudLoaded();
			});
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

	function getCloudXStart(width: number) {
		return Math.floor(Math.random() * MAP_WIDTH - width - MAP_H_GUTTER);
	}

	function getCLoudYStart(height: number) {
		return Math.floor(
			Math.random() * (MAP_HEIGHT - height - 2 * MAP_V_GUTTER) +
				MAP_V_GUTTER
		);
	}

	const cloudSrc = `${
		CLOUD_IMAGES[Math.floor(Math.random() * CLOUD_IMAGES.length)] as string
	}.${avifSupported ? 'avif' : 'png'}`;
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
		cloud.overlay.addTo(map);
		cloud.raq();
	};
</script>
