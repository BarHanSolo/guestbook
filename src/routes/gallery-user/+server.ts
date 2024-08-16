import { json } from '@sveltejs/kit';
import fs from 'fs/promises'; // Upewnij się, że korzystasz z odpowiedniej wersji Node.js, która obsługuje fs/promises
import path from 'path';

export async function DELETE({ request }: { request: Request }) {
	const { filename } = await request.json();
	console.log(filename);

	if (!filename) {
		return json({ error: 'Filename is missing' }, { status: 400 });
	}

	try {
		// Zakładam, że pliki są przechowywane w folderze '/uploads/photos'
		const photosDirPath = path.resolve(filename);
		const thumbnailsDirPath = path.resolve(filename.replace('/photos/', '/thumbnails/'));
		await fs.unlink(photosDirPath); // Usuwa plik z serwera
		await fs.unlink(thumbnailsDirPath);
		return json({ message: 'File deleted successfully' });
	} catch (error) {
		console.error(`Error deleting file: ${error}`);
		return json({ error: 'File deletion failed' }, { status: 500 });
	}
}
