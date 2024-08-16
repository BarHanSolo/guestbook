import { error, type Actions } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';
import ExifParser from 'exif-parser';
import sharp from 'sharp';

let username = 'andrz';

export const actions: Actions = {
	'upload-photo': async ({ request }) => {
		const formData = await request.formData();
		const file = formData.get('file') as File;

		if (!file) {
			return error(400, { message: 'No file attached' });
		}

		// Sprawdzenie typu MIME
		const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/heic'];
		if (!allowedMimeTypes.includes(file.type)) {
			return {
				status: 400,
				error: true,
				message: 'Invalid file type. Only JPEG and PNG are allowed.'
			};
		}

		const uploadDirPhotos = path.resolve('uploads/photos');
		const uploadDirThumbnails = path.resolve('uploads/thumbnails');
		if (!fs.existsSync(uploadDirPhotos)) {
			fs.mkdirSync(uploadDirPhotos, { recursive: true });
		}

		const fileExtension = path.extname(file.name);
		const newFileName = await generateUniqueFileName(file, uploadDirPhotos, fileExtension);

		const filePath = path.join(uploadDirPhotos, newFileName);
		const thumbPath = path.join(uploadDirThumbnails, newFileName);
		try {
			const buffer = Buffer.from(await file.arrayBuffer());
			fs.writeFileSync(filePath, buffer);
			const thumbnailBuffer = await sharp(buffer).resize(400).rotate().toBuffer();
			fs.writeFileSync(thumbPath, thumbnailBuffer);
			return { filePath };
		} catch (e) {
			console.error(e);
			return error(500, { message: 'Internal server error' });
		}
	}
};

async function generateUniqueFileName(
	file: File,
	uploadDir: string,
	fileExtension: string
): Promise<string> {
	let formattedDate: string;
	const creationDate = await getCreationDate(file);

	if (creationDate) {
		formattedDate = formatDate(creationDate);
	} else {
		formattedDate = getCurrentFormattedDate();
		console.warn('No creation date found in EXIF. Using current date instead.');
	}

	let counter = 1;
	const userFiles = fs.readdirSync(uploadDir).filter((f) => f.startsWith(username));
	let newFileName = `${username}${formattedDate}${fileExtension}`;

	while (userFiles.includes(newFileName)) {
		newFileName = `${username}${formattedDate}${counter++}${fileExtension}`;
	}

	return newFileName;
}

async function getCreationDate(file: File): Promise<string | null> {
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
