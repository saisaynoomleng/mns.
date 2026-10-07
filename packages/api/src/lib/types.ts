import { InsertContactSchema } from '@mns/db';
import * as z from 'zod';

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
