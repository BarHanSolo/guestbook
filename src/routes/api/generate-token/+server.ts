import { simpleID } from '$lib/utils/simple-id.js';
import { error, json } from '@sveltejs/kit';
import 'dotenv/config';
import jwt from 'jsonwebtoken';

export async function POST({ request }) {
	const { username } = await request.json();

	if (!username) {
		return error(400, { message: 'No username provided' });
	}

	const jwtSecret = process.env.JWT_SECRET as string;
	const id = simpleID(username);
	const token = jwt.sign({ id, username }, jwtSecret, { expiresIn: '7days' });

	return json({ token }, { status: 200 });
}
