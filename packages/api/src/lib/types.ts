import * as z from 'zod';
import { InsertContactSchema, InsertNewsletterSchema } from '../db/index.js';

export const CreateContactSchema = InsertContactSchema.pick({
  name: true,
  companyName: true,
  position: true,
  email: true,
  message: true,
  minBudget: true,
  maxBudget: true,
});
export type CreateContactType = z.infer<typeof CreateContactSchema>;

export const CreateNewsletterSchema = InsertNewsletterSchema.pick({
  email: true,
});
export type CreateNewsletterType = z.infer<typeof CreateNewsletterSchema>;
