import express, { type Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { isTest } from 'better-auth';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth.js';
import { appRouter } from './trpc/router.js';
import { createContext } from './trpc/context.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { createExpressMiddleware } from '@trpc/server/adapters/express';

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

// trpc
app.use(
  '/trpc',
  createExpressMiddleware({
    router: appRouter,

    createContext: ({ req }) => createContext(req),
  }),
);

app.use(errorHandler);

export default app;
