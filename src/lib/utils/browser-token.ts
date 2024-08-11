import { getCookie } from './get-browser-cookie';

export function getBrowserToken(): string | null {
	return getCookie('token');
}
