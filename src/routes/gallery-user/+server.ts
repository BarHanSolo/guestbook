import { json } from '@sveltejs/kit';
import fs from 'fs/promises'; // Upewnij się, że korzystasz z odpowiedniej wersji Node.js, która obsługuje fs/promises

export async function DELETE({ request }: { request: Request }) {
    const { filename } = await request.json();
    console.log(filename)

    if (!filename) {
        return json({ error: 'Filename is missing' }, { status: 400 });
    }

    try {
        // Zakładam, że pliki są przechowywane w folderze '/uploads/photos'
        const filePath = `${filename}`;
        await fs.unlink(filePath); // Usuwa plik z serwera
        const thumbnailPath = filePath.replace('/photos/', '/thumbnails/');
        await fs.unlink(thumbnailPath);
        return json({ message: 'File deleted successfully' });
    } catch (error) {
        console.error(`Error deleting file: ${error}`);
        return json({ error: 'File deletion failed' }, { status: 500 });
    }
}
