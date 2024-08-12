export async function load({ fetch }) {
	const response = await fetch('/api/current-user');
	const user = await response.json();

	return { ...user };
}
