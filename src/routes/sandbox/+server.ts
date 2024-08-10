import { json } from '@sveltejs/kit';

import fs from 'fs';
import path from 'path';

export function GET() {
	// Ścieżka do katalogu z obrazami
	const directoryPath = path.resolve('static/uploads/thumbnails');

	let files = [];
	try {
		// Przeszukiwanie katalogu i generowanie pełnych URL-i do plików
		files = fs.readdirSync(directoryPath).map(file => `/uploads/thumbnails/${file}`);
		return json({ files });
	} catch (error) {
		console.error('Unable to scan directory: ', error);
		return json({ message: 'Unable to scan directory' }, { status: 500 });
	}
}