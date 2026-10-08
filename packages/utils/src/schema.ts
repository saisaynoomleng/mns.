import * as z from 'zod';
import { passwordRules } from './helper.js';

export const emailSchema = z
  .email({ error: 'Must be a valid email address' })
  .min(1, { error: 'Email is required' });

export const passwordSchema = z
  .string()
  .refine((p) => passwordRules.every((r) => r.test(p)), {
    error: 'Password requirements not meet',
    path: ['password'],
  });

export const otpSchema = z
  .string()
  .min(1, { error: 'OTP is required' })
  .max(6, { error: 'OTP cannot exceeds 6 characters' });

export const CreateContactSchema = z
  .object({
    name: z.string().min(1, { error: 'Name must have at least 1 character' }),
    message: z
      .string()
      .min(10, { error: 'Message must have at least 10 characters' })
      .max(3000, { error: 'Message cannot exceeds 3000 characters' }),
    email: emailSchema,
    companyName: z.string().optional(),
    position: z.string().optional(),
    minBudget: z.coerce.number().nonnegative(),
    maxBudget: z.coerce.number().nonnegative(),
  })
  .refine((data) => data.maxBudget > data.minBudget, {
    error: 'Maximum budget is lower than maximum budget',
    path: ['maxBudget'],
  });

//===================================//
//Form                               //
//===================================//
export const SignUpEmailFormSchema = z.object({
  name: z.string().min(1, { error: 'Name is required' }),
  email: emailSchema,
  password: passwordSchema,
});
export type SignUpEmailType = z.infer<typeof SignUpEmailFormSchema>;
