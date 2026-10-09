import type { Metadata } from 'next';
import './globals.css';
import { Fraunces, Sora, Nothing_You_Could_Do } from 'next/font/google';
import { Toaster } from '@mns/ui';

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
});

const sora = Sora({
  variable: '--font-sora',
  subsets: ['latin'],
});

const nothingYouCanDo = Nothing_You_Could_Do({
  variable: '--font-nothing-you-can-do',
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | mns',
    default: 'mns',
  },
  description: 'mns. admin app for controlling and managing the mns. web app',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${nothingYouCanDo.variable} ${fraunces.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full">
        {children}

        <Toaster
          richColors
          closeButton
          duration={3000}
          position="bottom-center"
        />
      </body>
    </html>
  );
}
