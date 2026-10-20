import 'dotenv/config';
import express, { Express } from 'express';
import cors from 'cors';

import { helmetOptions } from '@config/helmet';
import { corOptions } from '@config/cor';
import { createUserRouter } from '@routes/auth.routes';
import { errorHandler } from '@middlewares/errorHandler';
import helmet from 'helmet';

//Initialize Express application
const app: Express = express();

//Middleware de segurança HTTP
app.use(helmet(helmetOptions));

//Middleware de CORS
app.use(cors(corOptions));

//Middleware Global
app.use(express.json());

//Routes
app.use('/api/auth', createUserRouter());

//Middleware de tratamento de erros
app.use(errorHandler);

export default app;
