import { Img, Section } from 'react-email';

export const EmailLogo = () => {
  return (
    <Section>
      <Img
        src="https://cdn.sanity.io/images/qywv7pbh/production/171c83028375cf96f5e68f651425dadbf2b5492f-804x226.png"
        alt="main logo"
        loading="lazy"
        className="max-w-50 mx-auto"
      />
    </Section>
  );
};
