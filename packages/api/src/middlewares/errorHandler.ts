import type { Request, Response, NextFunction } from 'express';
import env from '../lib/env.js';

type APIError = Error & {
  code: string;
  message: string;
  status: number;
};

export const errorHandler = (
  error: APIError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(error.stack);
  error.stack;

  let status = error.status ?? 500;
  let message = error.message ?? 'Internal server error';

  if (error.code === '23505') {
    status = 409;
    message = 'Resource already exists';
  }

  if (error.code === '23503') {
    status = 400;
    message = 'Bad request';
  }

  if (error.code === '23502') {
    status = 422;
    message = 'Validation error';
  }

  return res.status(status).json({
    message,
    ...(env.APP_STAGE === 'dev' && {
      stack: error.stack,
      details: error.message,
    }),
  });
};
