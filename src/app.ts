import cors from 'cors';
import 'dotenv/config';
import express, { Express } from 'express';
import helmet from 'helmet';

import { corOptions } from '@config/cor';
import { helmetOptions } from '@config/helmet';
import { errorHandler } from '@middlewares/errorHandler';
import { rateLimiter } from '@config/rateLimiter';
import { createUserRouter } from '@routes/auth.routes';
    
//Initialize Express application
const app: Express = express();

//Middleware de segurança HTTP
app.use(helmet(helmetOptions));

//Middleware de limite de taxa
app.use(rateLimiter);

//Middleware de CORS
app.use(cors(corOptions));

//Middleware Global
app.use(express.json());

//Routes
app.use('/api/auth', createUserRouter());

//Middleware de tratamento de erros
app.use(errorHandler);

export default app;
