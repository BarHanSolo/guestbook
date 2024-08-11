export function getCookie(name: string) {
	const nameEQ = name + '=';
	const cookiesArray = document.cookie.split('; ');

	for (const cookie of cookiesArray) {
		if (cookie.indexOf(nameEQ) === 0) {
			return decodeURIComponent(cookie.substring(nameEQ.length));
		}
	}
	return null;
}
