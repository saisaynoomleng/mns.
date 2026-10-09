import { Router } from 'express';
import { NewsletterController } from './newsletter.controller.js';
import { ValidateSchemaBody } from '../../middlewares/validations.js';
import { CreateNewsletterSchema } from '../../lib/types.js';

const router: Router = Router();
const controller = NewsletterController();

router.post(
  '/',
  ValidateSchemaBody(CreateNewsletterSchema),
  controller.createNewsletter,
);

export default router;
