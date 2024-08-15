import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async (event) => {
	try {
		const response = await event.fetch('/sandbox');
		if (!response.ok) {
			throw new Error('Failed to fetch files');
		}

		const data = await response.json();

		// Sortujemy pliki według daty zawartej w nazwie
		const sortedFiles = data.files.sort((a: string, b: string) => {
			const dateA = extractDateFromFileName(a);
			const dateB = extractDateFromFileName(b);
			return dateB.getTime() - dateA.getTime();
		});
		console.log(sortedFiles);

		return {
			photos: sortedFiles
		};
	} catch (err) {
		console.error('Error fetching files:', err);
		throw error(500, { message: 'Unable to load photos' });
	}
};

// Funkcja do wyciągania daty z nazwy pliku
function extractDateFromFileName(fileName: string): Date {
	let fileNameWithoutExtension = fileName.slice(0, fileName.lastIndexOf('.'));

	fileNameWithoutExtension = fileNameWithoutExtension.replace(/\s*\(\d\)\s*$/, '');
	const dateStr = fileNameWithoutExtension.slice(-14);
	const day = parseInt(dateStr.substring(0, 2));
	const month = parseInt(dateStr.substring(2, 4)) - 1; // Miesiące w JS są od 0 do 11
	const year = parseInt(dateStr.substring(4, 8));
	const hours = parseInt(dateStr.substring(8, 10));
	const minutes = parseInt(dateStr.substring(10, 12));
	const seconds = parseInt(dateStr.substring(12, 14));

	return new Date(year, month, day, hours, minutes, seconds);
}
