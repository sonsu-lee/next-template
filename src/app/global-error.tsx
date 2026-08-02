'use client';

import './globals.css';
import { FallbackView, RetryButton } from './fallback-view';

type GlobalErrorProps = Readonly<{
  error: Error & { digest?: string };
  retry: () => void;
}>;

export default function GlobalError({ retry }: GlobalErrorProps) {
  return (
    <html lang="en">
      <title>Something went wrong</title>
      <body>
        <FallbackView
          label="Error"
          title="Something went wrong"
          description="The application could not recover. Try loading it again."
          action={<RetryButton label="Try again" retry={retry} />}
        />
      </body>
    </html>
  );
}
