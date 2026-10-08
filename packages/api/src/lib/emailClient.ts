import { SESClient } from '@aws-sdk/client-ses';
import env from './env.js';

export const emailClinet = new SESClient({
  region: env.AWS_REGION,
  ...(env.NODE_ENV === 'production'
    ? {}
    : {
        credentials: {
          accessKeyId: env.AWS_ACCESS_KEY,
          secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
        },
      }),
});
