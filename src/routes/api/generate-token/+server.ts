import { simpleID } from '$lib/utils/simple-id.js';
import { error, json } from '@sveltejs/kit';
import 'dotenv/config';
import jwt from 'jsonwebtoken';

export async function POST({ request, cookies }) {
	let { username } = await request.json();

	if (!username) {
		return error(400, { message: 'No username provided' });
	}

	const jwtSecret = process.env.JWT_SECRET as string;
	username = username.replace(/\s/g, '_');
	const id = simpleID(username);
	const token = jwt.sign({ id, username }, jwtSecret, { expiresIn: '7d' });
	const tokenDecoded = jwt.verify(token, jwtSecret) as jwt.JwtPayload;

	cookies.set('token', token, {
		path: '/',
		httpOnly: false,
		secure: false,
		maxAge: 7 * 24 * 60 * 60
	});

	return json({ user: tokenDecoded }, { status: 200 });
}
