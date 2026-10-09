import express, { type Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { isTest } from 'better-auth';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth.js';
import env from './lib/env.js';

import NewsletterRouter from './modules/newsletter/newsletter.router.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app: Express = express();

// security and cors
app.use(
  cors({
    origin: env.ALLOWED_ORIGINS.split(','),
    credentials: true,
  }),
);
// better auth
app.all('/api/auth/{*any}', toNodeHandler(auth));

app.use(helmet());
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

// routes
app.use('/api/newsletters', NewsletterRouter);

// error handler
app.use(errorHandler);

export default app;
