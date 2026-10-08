import { emailClient } from '../../lib/emailClient.js';
import { SendEmailCommand } from '@aws-sdk/client-ses';
import env from '../../lib/env.js';
import type { SignUpVerificationProps } from '@mns/utils';
import { renderSignUpVerificationEmail } from '@mns/email';

export const sendSignUpVerificationEmail = async ({
  name,
  email,
  expiresAt = 15,
  url,
}: SignUpVerificationProps) => {
  try {
    const html = await renderSignUpVerificationEmail({
      name,
      email,
      expiresAt,
      url,
    });

    await emailClient.send(
      new SendEmailCommand({
        Source: env.NO_REPLY_EMAIL,

        Destination: {
          ToAddresses: [email],
        },

        Message: {
          Subject: {
            Data: `Verify your email address`,
            Charset: 'utf-8',
          },

          Body: {
            Html: {
              Data: html,
              Charset: 'utf-8',
            },
          },
        },
      }),
    );
  } catch (error) {
    console.error('Sign Up verification email api error', error);
  }
};
