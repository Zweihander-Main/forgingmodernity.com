import { expect, test } from 'vitest';
import { isFormatSupported, camelCaseString } from './funcs';

test('isFormatSupported', async () => {
	expect(await isFormatSupported('avif', 'random')).toBe(false);
});

test('camelCaseString', () => {
	expect(camelCaseString('')).toBe('');
	expect(camelCaseString('hello world')).toBe('helloWorld');
	expect(camelCaseString('Hello World')).toBe('helloWorld');
	expect(camelCaseString('HELLOWORLD')).toBe('helloworld');
});
