import type { Request, Response, NextFunction } from 'express';
import * as z from 'zod';

export const ValidateSchemaBody = (schema: z.ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = schema.parse(req.body);
      req.body = data;

      return next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json({
          message: 'Invalid data entity!',
          details: error.issues.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        });
      }

      next(error);
    }
  };
};
