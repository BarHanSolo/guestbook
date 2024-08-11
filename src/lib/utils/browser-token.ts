import { getCookie } from './get-browser-cookie';

export function getBrowserToken(): string | null {
	const wholeToken = getCookie('token');

	if (!wholeToken) {
		return null;
	}
	return wholeToken.substring(7);
}
