import { error, json } from '@sveltejs/kit';
import 'dotenv/config';
import jwt from 'jsonwebtoken';

export async function GET({ cookies }) {
	const token = cookies.get('token');

	if (!token) {
		throw error(401, { message: 'No token found' });
	}

	const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;
	const user = decodedToken;

	return json({ user }, { status: 200 });
}
