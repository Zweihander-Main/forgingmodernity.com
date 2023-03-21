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
