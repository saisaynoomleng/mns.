import { Column, Img, Link, Row, Section, Text } from 'react-email';

const FACEBOOK_LOGO_URL =
  'https://cdn.sanity.io/images/qywv7pbh/production/ba72889b6d6280804c8bedbb0f841182320186bf-640x640.png';
const YOUTUBE_LOGO_URL =
  'https://cdn.sanity.io/images/qywv7pbh/production/315e14c6dd7e62f5d4f3cd2a5834e64c82913483-640x640.png';

export const EmailFooter = () => {
  return (
    <Section>
      <Section className="mt-2 w-fit" align="left">
        <Row>
          <Column className="w-5">
            <Link
              href="https://www.facebook.com"
              rel="noreferrer nofollow"
              target="_blank"
            >
              <Img
                src={FACEBOOK_LOGO_URL}
                alt="facebook logo"
                className="max-w-30"
                width={50}
                height={50}
              />
            </Link>
          </Column>

          <Column className="w-5">
            <Link
              href="https://www.youtube.com"
              rel="noreferrer nofollow"
              target="_blank"
            >
              <Img
                src={YOUTUBE_LOGO_URL}
                alt="facebook logo"
                className="max-w-30"
                width={50}
                height={50}
              />
            </Link>
          </Column>
        </Row>
      </Section>

      <Section className="text-black/80">
        <Text>
          5000 Euclid Ave
          <br />
          Cleveland, OH. 44103
          <br />
          United States
        </Text>
      </Section>

      <Section>
        <Link
          href="https://mnsart.com"
          className="font-semibold underline decoration-wavy underline-offset-4 text-primary-400 text-base"
        >
          Visit our website by clicking this link
        </Link>
      </Section>
    </Section>
  );
};
