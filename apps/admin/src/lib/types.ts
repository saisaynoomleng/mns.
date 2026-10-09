import * as z from 'zod';
import { authClient } from './authClient';

export type BetterAuthSessionProps = typeof authClient.$Infer.Session;

export const GetAllNewslettersSchema = z.array(
  z.object({
    email: z.email(),
    createdAt: z.coerce.date(),
    id: z.uuid(),
  }),
);
export type GetAllNewslettersType = z.infer<typeof GetAllNewslettersSchema>;
