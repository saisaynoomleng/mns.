import * as z from 'zod';
import { InsertNewsletterSchema } from '../db/index.js';
import type { auth } from './auth.js';

export const CreateNewsletterSchema = InsertNewsletterSchema.pick({
  email: true,
});
export type CreateNewsletterType = z.infer<typeof CreateNewsletterSchema>;

export type BetterAuthSessionProps = typeof auth.$Infer.Session;
