import { Container, Link, Section } from 'react-email';

export const UnsubscribeEmail = ({ email }: { email: string }) => {
  return (
    <Container className="max-w-160 text-center mt-6">
      <Section className="bg-black-950/50 w-[50%] h-px mx-auto" />

      <Section className="mt-4">
        <Link
          href={`https://mnsart.com/unsubscribe?email=${encodeURIComponent(email)}`}
          className="text-sm text-center"
        >
          Unsubscribe
        </Link>
      </Section>
    </Container>
  );
};
