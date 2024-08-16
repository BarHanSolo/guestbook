import cors from 'cors';
import express from 'express';
import { handler } from './build/handler.js';

const app = express();
app.use(cors());
app.use(handler);
app.get('/uploads/*', express.static('uploads'));

app.listen(4000, () => {
	console.log('listening on port 40000');
});
