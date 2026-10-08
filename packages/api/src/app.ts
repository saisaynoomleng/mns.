import express, { type Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { isTest } from 'better-auth';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth.js';

const app: Express = express();

// security and cors
app.use(helmet());
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
// better auth
app.use('/api/auth/{*any}', toNodeHandler(auth));
app.use(
  morgan('dev', {
    skip: () => isTest(),
  }),
);

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// health check
app.get('/health-check', (req, res) => {
  return res.status(200).json({ message: 'Health Ok!' });
});

export default app;
