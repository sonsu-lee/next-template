import type { Metadata } from 'next';
import { Geist } from 'next/font/google';

import './globals.css';
import { Providers } from './providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Next Template',
  description: 'A focused Next.js foundation for small products.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.variable}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
