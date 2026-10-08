import { SendEmailCommand } from '@aws-sdk/client-ses';
import { emailClient } from '../../lib/emailClient.js';
import type { CreateNewsletterType } from '../../lib/types.js';
import { newsletterRepository } from './newsletter.repository.js';
import env from '../../lib/env.js';
import { renderNewsletterEmail } from '@mns/email';

export const newsletterService = () => {
  const repository = newsletterRepository();

  return {
    create: async ({ email }: CreateNewsletterType) => {
      const data = await repository.insertNewsletter({ email });

      const html = await renderNewsletterEmail({ email });

      await emailClient.send(
        new SendEmailCommand({
          Source: env.NO_REPLY_EMAIL,

          Destination: {
            ToAddresses: [email],
          },

          Message: {
            Subject: {
              Data: `You’re subscribed!`,
              Charset: 'utf-8',
            },

            Body: {
              Html: {
                Data: html,
              },
            },
          },
        }),
      );

      return data;
    },
  };
};
