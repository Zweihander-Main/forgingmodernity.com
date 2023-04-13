export const isFormatSupported = (
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

export const camelCaseString = (str: string) => {
	return str
		.toLowerCase()
		.replace(/[^a-zA-Z0-9]+(.)/g, (_, chr: string) => chr.toUpperCase());
};

export const loadImage = (
	imageUrl: string,
	onprogress: (percentageLoaded: number) => void
) => {
	return new Promise<string>((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		let notifiedNotComputable = false;

		xhr.open('GET', imageUrl, true);
		xhr.responseType = 'arraybuffer';

		xhr.onprogress = function (ev) {
			if (ev.lengthComputable) {
				onprogress((ev.loaded / ev.total) * 100);
			} else {
				if (!notifiedNotComputable) {
					notifiedNotComputable = true;
					onprogress(-1);
				}
			}
		};

		xhr.onloadend = function () {
			if (!xhr.status.toString().match(/^2/)) {
				reject(xhr);
			} else {
				if (!notifiedNotComputable) {
					onprogress(100);
				}

				const options: BlobPropertyBag = {};
				const headers = xhr.getAllResponseHeaders();
				const m = headers.match(/^Content-Type:\s*(.*?)$/im);

				if (m && m[1]) {
					options.type = m[1];
				}

				const blob = new Blob([this.response], options);

				resolve(window.URL.createObjectURL(blob));
			}
		};

		xhr.send();
	});
};
