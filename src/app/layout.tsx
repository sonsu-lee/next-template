import type { Metadata } from 'next';
import { Geist } from 'next/font/google';

import { getSiteUrl, isIndexableDeployment, siteConfig } from '@/lib/site';

import './globals.css';
import { Providers } from './providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    description: siteConfig.description,
    siteName: siteConfig.name,
    title: siteConfig.name,
    type: 'website',
  },
  robots: isIndexableDeployment() ? { follow: true, index: true } : { follow: false, index: false },
  twitter: {
    card: 'summary',
    description: siteConfig.description,
    title: siteConfig.name,
  },
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
