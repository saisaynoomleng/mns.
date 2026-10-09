import * as z from 'zod';
import {
  InsertNewsletterSchema,
  SelectNewsletterSchema,
} from '../db/schema/index.js';
import type { auth } from './auth.js';

export type BetterAuthSessionProps = typeof auth.$Infer.Session;
export type BetterAuthSessionUserProps = typeof auth.$Infer.Session.user;

export const CreateNewsletterSchema = InsertNewsletterSchema.pick({
  email: true,
});
export type CreateNewsletterType = z.infer<typeof CreateNewsletterSchema>;
