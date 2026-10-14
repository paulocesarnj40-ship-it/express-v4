import 'dotenv/config';
import express, { Express } from 'express';

import { createUserRouter } from '@routes/auth.routes';
import { errorHandler } from '@middlewares/errorHandler';

//Initialize Express application
const app: Express = express();

//Middleware Global
app.use(express.json());

//Routes
app.use('/api/auth', createUserRouter());

app.use(errorHandler);

export default app;
