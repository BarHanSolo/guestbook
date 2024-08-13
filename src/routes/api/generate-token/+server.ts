import { simpleID } from '$lib/utils/simple-id.js';
import { error, json } from '@sveltejs/kit';
import 'dotenv/config';
import jwt from 'jsonwebtoken';

export async function POST({ request, cookies }) {
	const { username } = await request.json();

	if (!username) {
		return error(400, { message: 'No username provided' });
	}

	const jwtSecret = process.env.JWT_SECRET as string;
	const id = simpleID(username);
	const token = jwt.sign({ id, username }, jwtSecret, { expiresIn: '7days' });
	const tokenDecoded = jwt.verify(token, jwtSecret) as jwt.JwtPayload;

	cookies.set('token', token, { path: '/', httpOnly: false });

	return json({ user: tokenDecoded }, { status: 200 });
}
