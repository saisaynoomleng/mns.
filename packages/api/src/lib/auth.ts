import db from '@mns/db';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';
import { admin, emailOTP } from 'better-auth/plugins';

export const auth = betterAuth({
  plugins: [
    admin(),
    emailOTP({
      expiresIn: 60 * 5,
      async sendVerificationOTP({ email, otp, type }) {},
    }),
    nextCookies(),
  ],

  appName: 'mns.',

  baseURL: '',

  trustedOrigins: [],

  basePath: '',

  secret: '',

  user: {
    modelName: 'users',
    fields: {
      email: 'email',
      name: 'name',
      image: 'imageUrl',
    },
    additionalFields: {
      companyName: {
        type: 'string',
      },
      position: {
        type: 'string',
      },
      phone: {
        type: 'string',
      },
    },

    changeEmail: {
      enabled: true,
    },
    deleteUser: {
      enabled: true,
    },
  },

  session: {
    modelName: 'sessions',
    fields: {
      userId: 'userId',
    },
    expiresIn: 60 * 5,
    updateAge: 60 * 60 * 24,
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5,
    },
  },

  account: {
    modelName: 'accounts',
    fields: {
      userId: 'userId',
    },
  },

  verification: {
    modelName: 'verifications',
  },

  rateLimit: {
    modelName: 'rateLimits',
    enabled: true,
    window: 900,
    max: 10,
    storage: 'database',
  },

  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
});
