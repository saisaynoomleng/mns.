import db, {
  AccountTable,
  RateLimitTable,
  SessionTable,
  UserTable,
  VerificationTable,
} from '../db/index.js';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';
import { admin, emailOTP } from 'better-auth/plugins';
import env from './env.js';

export const auth = betterAuth({
  plugins: [
    admin(),
    emailOTP({
      expiresIn: 60 * 5,
      async sendVerificationOTP({ email, otp, type }) {
        if (type === 'change-email') {
          // change email
        }
        if (type === 'forget-password') {
          // forget password
        }
      },
      disableSignUp: true,
    }),
    nextCookies(),
  ],

  appName: env.APP_NAME,

  baseURL: env.BETTER_AUTH_URL,

  trustedOrigins: [
    'localhost:3000',
    'localhost:3001',
    'localhost:4000',
    '*.mnsart.com',
  ],

  basePath: '/api/auth',

  secret: env.BETTER_AUTH_SECRET,

  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      users: UserTable,
      sessions: SessionTable,
      accounts: AccountTable,
      verifications: VerificationTable,
      rateLimits: RateLimitTable,
    },
  }),

  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }) => {
      //  sign up verification
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 60 * 5,
  },

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    autoSignIn: true,
    onExistingUserSignUp: async ({ user }) => {
      // alert email
    },
  },

  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },

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
    deleteUser: {
      enabled: true,
      sendDeleteAccountVerification: async ({ user, url }) => {},
    },
  },

  session: {
    modelName: 'sessions',
    fields: {
      userId: 'userId',
    },
    expiresIn: env.SESSION_EXPIRES_IN,
    updateAge: env.SESSION_UPDATE_AGE,
    cookieCache: {
      enabled: true,
      maxAge: env.SESSION_COOKIE_CACHE_MAX_AGE,
    },
  },

  account: {
    modelName: 'accounts',
    fields: {
      userId: 'userId',
    },
    encryptOAuthTokens: true,
    storeStateStrategy: 'database',
    storeAccountCookie: true,
    accountLinking: {
      enabled: true,
      trustedProviders: ['google', 'email-password', 'linkedin', 'tiktok'],
      allowDifferentEmails: false,
    },
  },

  verification: {
    modelName: 'verifications',
    disableCleanup: false,
    storeIdentifier: 'hashed',
    storeInDatabase: true,
  },

  rateLimit: {
    modelName: 'rateLimits',
    enabled: true,
    window: env.RATE_LIMIT_WINDOW,
    max: env.RATE_LIMIT_MAX_REQUESTS,
    storage: 'database',
  },

  advanced: {
    database: {
      generateId: 'uuid',
    },
    ...(env.NODE_ENV === 'production'
      ? {
          crossSubDomainCookies: {
            enabled: true,
            domain: '.mnsart.com',
          },
        }
      : {}),
  },
});
