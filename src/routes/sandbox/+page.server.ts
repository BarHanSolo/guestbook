import { error, type Actions } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

export const actions: Actions = {
	'upload-photo': async ({ request }) => {
		const formData = await request.formData();
		const file = formData.get('file') as File;

		if (!file) {
			return error(400, { message: 'No file attached' });
		}

		const uploadDir = path.resolve('static/uploads'); // TODO: configurable upload directory
		if (!fs.existsSync(uploadDir)) {
			fs.mkdirSync(uploadDir, { recursive: true });
		}

		const filePath = path.join(uploadDir, file.name);

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
