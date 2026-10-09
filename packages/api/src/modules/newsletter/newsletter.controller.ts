import type { NextFunction, Request, Response } from 'express';
import type { CreateNewsletterType } from '../../lib/types.js';
import { newsletterService } from './newsletter.service.js';
import { isUniqueViolation } from '../../lib/helper.js';

export const NewsletterController = () => {
  const service = newsletterService();

  return {
    createNewsletter: async (
      req: Request<{}, {}, CreateNewsletterType>,
      res: Response,
      next: NextFunction,
    ) => {
      try {
        const { email } = req.body;
        const data = await service.create({ email });

        if (!data) {
          return res.status(500).json({ message: 'Internal server error' });
        }

        await service.sendSubscribedEmail({ email: data.email });

        return res.status(201).json({
          message: 'Thank you for your subscription!',
        });
      } catch (error) {
        console.error(`Create Newsletter error`, error);

        if (isUniqueViolation(error)) {
          return res.status(409).json({
            message: 'You are already in the list!',
          });
        }

        next(error);
      }
    },

    getAllNewsletters: async (
      req: Request,
      res: Response,
      next: NextFunction,
    ) => {
      try {
        const data = await service.getAllNewsletters();

        return res.status(200).json(data);
      } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
      }
    },
  };
};
