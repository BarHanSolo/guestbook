export function getBrowserToken(): string | null {
	return localStorage.getItem('token');
}
