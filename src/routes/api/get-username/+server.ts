import { json, error } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export async function GET({ cookies }) {
    // Pobieramy token z cookies
    const token = cookies.get('token');

    // Jeśli token nie istnieje, zwracamy błąd 401 (Unauthorized)
    if (!token) {
        throw error(401, { message: 'No token found' });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;
	const username = decodedToken.username;
	console.log(username)

    // Zwracamy token w odpowiedzi JSON
    return json({ username }, { status: 200 });
}
