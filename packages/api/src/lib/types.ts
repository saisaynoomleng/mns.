import * as z from 'zod';
import { InsertNewsletterSchema } from '../db/index.js';

export const CreateNewsletterSchema = InsertNewsletterSchema.pick({
  email: true,
});
export type CreateNewsletterType = z.infer<typeof CreateNewsletterSchema>;
