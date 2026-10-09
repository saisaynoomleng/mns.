import { Router } from 'express';
import { NewsletterController } from './newsletter.controller.js';
import { ValidateSchemaBody } from '../../middlewares/validations.js';
import { CreateNewsletterSchema } from '../../lib/types.js';
import { adminRequired } from '../../middlewares/adminRequired.js';

const router: Router = Router();
const controller = NewsletterController();

router.post(
  '/',
  ValidateSchemaBody(CreateNewsletterSchema),
  controller.createNewsletter,
);

router.get('/', adminRequired, controller.getAllNewsletters);

export default router;
