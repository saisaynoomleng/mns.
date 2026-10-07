import dotenv from 'dotenv';
import * as z from 'zod';

const appStage = process.env.APP_STAGE ?? 'dev';

dotenv.config({
  path: appStage === 'dev' ? '.env' : '.env.test',
});

const schema = z.object({
  // Database
  DATABASE_URL: z.url().startsWith('postgresql://'),

  // Auth
  BETTER_AUTH_SECRET: z
    .string()
    .min(1, { error: 'Better auth secret is required' }),
  BETTER_AUTH_URL: z
    .url({ error: 'Must be a valid URL' })
    .min(1, { error: 'Better Auth URL is required' }),
  OTP_EXPIRES_IN: z.coerce.number().positive().default(900),
  SESSION_EXPIRES_IN: z.coerce.number().default(604800),
  SESSION_UPDATE_AGE: z.coerce.number().default(86400),
  SESSION_COOKIE_CACHE_MAX_AGE: z.coerce.number().default(300),

  // Social Provider
  GOOGLE_CLIENT_ID: z
    .string()
    .min(1, { error: 'Goolge Client ID is required' }),
  GOOGLE_CLIENT_SECRET: z
    .string()
    .min(1, { error: 'Goolge Client secret is requried' }),

  // cors
  ALLOWED_ORIGINS: z.string().min(1, { error: 'Allowed origins is required' }),

  // Server
  PORT: z.coerce.number().default(8000),
  NODE_ENV: z
    .enum(['development', 'production', 'testing'])
    .default('development'),
  APP_STAGE: z.enum(['dev', 'prod', 'test']).default('dev'),
  APP_NAME: z.string().min(1, { error: 'App name is required' }),

  // Rate limit
  RATE_LIMIT_WINDOW: z.coerce.number().default(90),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(90000),
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().default(10),

  // AWS
  AWS_REGION: z.string().min(1, { error: 'AWS region is required' }),
  AWS_SECRET_ACCESS_KEY: z
    .string()
    .min(1, { error: 'AWS secret access key is required' }),
  AWS_ACCESS_KEY: z.string().min(1, { error: 'AWS access key is required' }),

  NO_REPLY_EMAIL: z
    .email({ error: 'Must be a valid email address' })
    .min(1, { error: 'No reply email is required' }),
  CONTACT_EMAIL: z
    .email({ error: 'Must be a valid email address' })
    .min(1, { error: 'Contact email is required' }),
  REPLY_TO_EMAIL: z
    .email({ error: 'Must be a valid email address' })
    .min(1, { error: 'Reply to email is required' }),

  // logging
});

type Env = z.infer<typeof schema>;

let env: Env;

try {
  env = schema.parse(process.env);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error(`Invalid env vars`);

    error.issues.forEach((e) => {
      console.log(`path: ${e.path.join('.')} : ${e.message}`);
    });

    process.exit(1);
  }

  throw error;
}

export const isProd = () => process.env.APP_STAGE === 'prod';
export const isTest = () => process.env.APP_STAGE === 'test';
export const isDev = () => process.env.APP_STAGE === 'dev';

export default env;
