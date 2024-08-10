import { USERNAME } from '$env/static/private';
import { error, type Actions } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';
import ExifParser from 'exif-parser';

export const actions: Actions = {
	'upload-photo': async ({ request }) => {
		const formData = await request.formData();
		const file = formData.get('file') as File;

		if (!file) {
			return error(400, { message: 'No file attached' });
		}

		// Sprawdzenie typu MIME
		const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg', 'image/heic'];
		if (!allowedMimeTypes.includes(file.type)) {
			return {
				status: 400,
				error: true,
				message: 'Invalid file type. Only JPEG, PNG, and GIF are allowed.'
			};
		}

        const uploadDir = path.resolve('static/uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const fileExtension = path.extname(file.name);
        let newFileName = await generateUniqueFileName(file, uploadDir, fileExtension);

        const filePath = path.join(uploadDir, newFileName);
        try {
            const buffer = Buffer.from(await file.arrayBuffer());
            fs.writeFileSync(filePath, buffer);
            return { filePath };
        } catch (e) {
            console.error(e);
            return error(500, { message: 'Internal server error' });
        }
    }
};

async function generateUniqueFileName(file: File, uploadDir: string, fileExtension: string): Promise<string> {
    let formattedDate: string;
    const creationDate = await getCreationDate(file);

    if (creationDate) {
        formattedDate = formatDate(creationDate);
    } else {
        formattedDate = getCurrentFormattedDate();
        console.warn('No creation date found in EXIF. Using current date instead.');
    }

    let counter = 1;
    const userFiles = fs.readdirSync(uploadDir).filter(f => f.startsWith(USERNAME));
    let newFileName = `${USERNAME}${formattedDate}${fileExtension}`;

    while (userFiles.includes(newFileName)) {
        newFileName = `${USERNAME}${formattedDate}${counter++}${fileExtension}`;
    }

    return newFileName;
}

async function getCreationDate(file: File): Promise<Date | null> {
    const buffer = Buffer.from(await file.arrayBuffer());
    const parser = ExifParser.create(buffer);

    try {
        const exifData = parser.parse();
        return exifData.tags.DateTimeOriginal || exifData.tags.DateTime || null;
    } catch (e) {
        console.error('Error parsing EXIF data:', e);
        return null;
    }
}

function formatDate(creationDate: string): string {
    const date = new Date(creationDate);
    return [
        String(date.getDate()).padStart(2, '0'),
        String(date.getMonth() + 1).padStart(2, '0'),
        date.getFullYear(),
        String(date.getHours()).padStart(2, '0'),
        String(date.getMinutes()).padStart(2, '0'),
        String(date.getSeconds()).padStart(2, '0')
    ].join('');
}

function getCurrentFormattedDate(): string {
    const now = new Date();
    return [
        String(now.getDate()).padStart(2, '0'),
        String(now.getMonth() + 1).padStart(2, '0'),
        now.getFullYear(),
        String(now.getHours()).padStart(2, '0'),
        String(now.getMinutes()).padStart(2, '0'),
        String(now.getSeconds()).padStart(2, '0')
    ].join('');
}