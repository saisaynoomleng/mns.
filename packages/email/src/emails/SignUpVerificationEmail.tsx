import {
  Tailwind,
  Section,
  Text,
  Html,
  render,
  Body,
  Preview,
  Container,
  Link,
} from 'react-email';
import type { SignUpVerificationProps } from '@mns/utils';
import tailwindConfig from '../lib/tailwind.config.js';
import { EmailFont } from '../lib/Font.js';
import { EmailLogo } from '../lib/EmailLogo.js';
import { EmailFooter } from '../lib/EmailFooter.js';

const SignUpVerificationEmail = ({
  email,
  url,
  expiresAt = 15,
  name,
}: SignUpVerificationProps) => {
  return (
    <Tailwind config={tailwindConfig}>
      <Html>
        <EmailFont />
        <title>Verify your email address</title>
      </Html>

      <Body className="overflow-hidden">
        <Preview>One click to finish creating your account.</Preview>

        <Container className="max-w-160 mx-auto">
          <EmailLogo />

          <Section>
            <Text>Hello, {name}</Text>
            <Text>Thanks for signing up with {email}.</Text>
            <Text>
              Confirm your email address by opening this{' '}
              <Link href={url} className="font-semibold text-primary-400">
                link.
              </Link>
            </Text>
            <Text>
              If you didn&apos;t create an account, you can ignore this email.
            </Text>
            <Text>
              This link will be expires in{' '}
              <span className="font-semibold text-primary-400">
                {expiresAt}
              </span>{' '}
              minutes.
            </Text>
          </Section>

          <EmailFooter />
        </Container>
      </Body>
    </Tailwind>
  );
};

export default SignUpVerificationEmail;
export const renderSignUpVerificationEmail = async ({
  name,
  email,
  expiresAt,
  url,
}: SignUpVerificationProps) => {
  return await render(
    SignUpVerificationEmail({ name, email, expiresAt: 15, url }),
  );
};
