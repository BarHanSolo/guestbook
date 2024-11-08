import { error, type Actions } from '@sveltejs/kit';
import 'dotenv/config';
import ExifParser from 'exif-parser';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import path from 'path';
import sharp from 'sharp';

export const actions: Actions = {
	'upload-photo': async ({ request, cookies }) => {
		const formData = await request.formData();
		const files = formData.getAll('file') as File[];

		if (files.length === 0) {
			return error(400, { message: 'No files attached' });
		}

		// Sprawdzenie typu MIME
		const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/heic'];
		for (const file of files) {
			if (!allowedMimeTypes.includes(file.type)) {
				return {
					status: 400,
					error: true,
					message: 'Invalid file type. Only JPEG and PNG are allowed.'
				};
			}
		}

		const uploadDirPhotos = path.resolve('uploads/photos');
		if (!fs.existsSync(uploadDirPhotos)) {
			fs.mkdirSync(uploadDirPhotos, { recursive: true });
		}

		const uploadDirThumbnails = path.resolve('uploads/thumbnails');
		if (!fs.existsSync(uploadDirThumbnails)) {
			fs.mkdirSync(uploadDirThumbnails, { recursive: true });
		}

		const token = cookies.get('token');
		if (!token) {
			return error(401, { message: 'User unauthorized' });
		}
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;
		const username = decodedToken.username;

		const filePaths: string[] = [];

		try {
			for (const file of files) {
				const fileExtension = path.extname(file.name);
				const newFileName = await generateUniqueFileName(
					file,
					uploadDirPhotos,
					fileExtension,
					username
				);

				const filePath = path.join(uploadDirPhotos, newFileName);
				const thumbPath = path.join(uploadDirThumbnails, newFileName);

				const buffer = Buffer.from(await file.arrayBuffer());
				fs.writeFileSync(filePath, buffer);

				const thumbnailBuffer = await sharp(buffer).withMetadata().resize(400).toBuffer();
				fs.writeFileSync(thumbPath, thumbnailBuffer);

				filePaths.push(filePath); // Dodanie ścieżki pliku do tablicy
			}

			return { filePaths };
		} catch (e) {
			console.error(e);
			return error(500, { message: 'Internal server error' });
		}
	}
};

async function generateUniqueFileName(
	file: File,
	uploadDir: string,
	fileExtension: string,
	username: string
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
		newFileName = `${username}${formattedDate}(${counter++})${fileExtension}`;
	}

	return newFileName;
}

async function getCreationDate(file: File): Promise<string | null> {
	const buffer = Buffer.from(await file.arrayBuffer());
	const parser = ExifParser.create(buffer);

	try {
		const exifData = parser.parse();
		let dateTime = exifData.tags.DateTimeOriginal || exifData.tags.DateTime || null;
		if (dateTime) {
			dateTime = Number(dateTime);
			dateTime *= 1000;
			const currentTimeMillis = Date.now() + 172800000;  //two days added in case of shennaningans with timezones to be absolutely certain
			if (dateTime > currentTimeMillis) {
				dateTime /= 1000;
			}
		}
		return dateTime;
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
