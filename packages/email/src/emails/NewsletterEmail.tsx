import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  render,
  Tailwind,
  Text,
} from 'react-email';
import tailwindConfig from '../lib/tailwind.config.js';
import { EmailFont } from '../lib/Font.js';

const NewsletterEmail = ({ email = 'sai@mail.com' }: { email: string }) => {
  return (
    <Tailwind config={tailwindConfig}>
      <Html>
        <Head>
          <EmailFont />

          <title>You're subscribed</title>
        </Head>

        <Body className="overflow-x-hidden leading-noraml tracking-normal">
          <Preview>Thanks for joining our newsletter.</Preview>

          <Container className="max-w-160 mx-auto space-y-10">
            <Text>Hello,</Text>
            <Text>
              <span className="font-semibold text-primary-400">{email} </span>
              is now subscribed to our newsletter. You&apos;ll get news and
              updates from us. You can unsubscribe at any time using the link
              below.
            </Text>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};

export default NewsletterEmail;

export const renderNewsletterEmail = async ({ email }: { email: string }) => {
  return await render(NewsletterEmail({ email }));
};
