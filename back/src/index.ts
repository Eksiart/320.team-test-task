import express, { Application } from 'express'
import dotenv from 'dotenv';
import expressSession from 'express-session';
import userRouter from '@/routes/user';
import cors from 'cors';

dotenv.config();

const sessionSecret = '3205';
const port = process.env.PORT || 3000;
const app: Application = express();

app.use(cors({
	origin: 'http://127.0.0.1:5173',
	credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressSession({
	secret: sessionSecret,
	resave: false,
	saveUninitialized: true,
	cookie: {
		httpOnly: false,
		secure: false,
	}
}));

app.set('trust proxy', 1)

app.use("/api/user", userRouter);

app.get('/api', function (req, res) {
	res.send('Its work!');
});

app.listen(port, () => {
	console.log('Server started at: ' + port);
});