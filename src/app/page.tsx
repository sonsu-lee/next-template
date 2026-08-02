import { create, props } from '@stylexjs/stylex';
import type { Metadata } from 'next';

import { siteConfig } from '@/lib/site';

const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
  openGraph: {
    description: siteConfig.description,
    siteName: siteConfig.name,
    title: siteConfig.name,
    type: 'website',
    url: '/',
  },
};

const styles = create({
  page: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    paddingBlock: {
      default: '96px',
      '@media (max-width: 600px)': '64px',
    },
    paddingInline: '24px',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    maxWidth: '640px',
    width: '100%',
  },
  eyebrow: {
    color: 'var(--muted)',
    fontSize: '14px',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: {
      default: '56px',
      '@media (max-width: 600px)': '40px',
    },
    fontWeight: 600,
    letterSpacing: {
      default: '-0.04em',
      '@media (max-width: 600px)': '-0.03em',
    },
    lineHeight: 1.05,
    textWrap: 'balance',
  },
  description: {
    color: 'var(--muted)',
    fontSize: '18px',
    lineHeight: 1.7,
    maxWidth: '560px',
    textWrap: 'pretty',
  },
  path: {
    backgroundColor: 'var(--surface)',
    borderColor: 'var(--border)',
    borderRadius: '6px',
    borderStyle: 'solid',
    borderWidth: '1px',
    color: 'var(--foreground)',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    fontSize: '0.9em',
    paddingBlock: '2px',
    paddingInline: '6px',
  },
});

export default function Home() {
  return (
    <main {...props(styles.page)}>
      <div {...props(styles.content)}>
        <p {...props(styles.eyebrow)}>Next.js foundation</p>
        <h1 {...props(styles.title)}>Start with the product.</h1>
        <p {...props(styles.description)}>
          The application boundary is ready. Build the first product surface in{' '}
          <code {...props(styles.path)}>src/app/page.tsx</code>, then add platform features only
          when the product needs them.
        </p>
      </div>
    </main>
  );
}

export { metadata };
