import { create, props as stylexProps } from '@stylexjs/stylex';
import type { ReactNode } from 'react';

const styles = create({
  page: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    minHeight: '100dvh',
    paddingBlock: '64px',
    paddingInline: '24px',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    maxWidth: '520px',
    width: '100%',
  },
  label: {
    color: 'var(--muted)',
    fontSize: '14px',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: {
      default: '44px',
      '@media (max-width: 600px)': '36px',
    },
    fontWeight: 600,
    letterSpacing: '-0.03em',
    lineHeight: 1.1,
  },
  description: {
    color: 'var(--muted)',
    fontSize: '17px',
    lineHeight: 1.65,
  },
  action: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'var(--foreground)',
    borderColor: 'var(--foreground)',
    borderRadius: '999px',
    borderStyle: 'solid',
    borderWidth: '1px',
    color: 'var(--background)',
    cursor: 'pointer',
    display: 'inline-flex',
    fontFamily: 'inherit',
    fontSize: '14px',
    fontWeight: 600,
    justifyContent: 'center',
    minHeight: '44px',
    paddingInline: '20px',
  },
});

// oxlint-disable-next-line eslint/func-style -- React components are function declarations.
function FallbackView({
  action,
  description,
  label,
  title,
}: Readonly<{
  action: ReactNode;
  description: string;
  label: string;
  title: string;
}>) {
  return (
    <main {...stylexProps(styles.page)}>
      <div {...stylexProps(styles.content)}>
        <p {...stylexProps(styles.label)}>{label}</p>
        <h1 {...stylexProps(styles.title)}>{title}</h1>
        <p {...stylexProps(styles.description)}>{description}</p>
        {action}
      </div>
    </main>
  );
}

// oxlint-disable-next-line eslint/func-style -- React components are function declarations.
function FallbackLink({ href, label }: Readonly<{ href: string; label: string }>) {
  return (
    <a {...stylexProps(styles.action)} href={href}>
      {label}
    </a>
  );
}

// oxlint-disable-next-line eslint/func-style -- React components are function declarations.
function RetryButton({ label, retry }: Readonly<{ label: string; retry: () => void }>) {
  return (
    <button {...stylexProps(styles.action)} type="button" onClick={retry}>
      {label}
    </button>
  );
}

export { FallbackLink, FallbackView, RetryButton };
