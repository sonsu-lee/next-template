'use client';

import { FallbackView, RetryButton } from './fallback-view';

type ErrorProps = Readonly<{
  error: Error & { digest?: string };
  retry: () => void;
}>;

export default function Error({ retry }: ErrorProps) {
  return (
    <FallbackView
      label="Error"
      title="Something went wrong"
      description="The request could not be completed. Try it again, or return in a moment."
      action={<RetryButton label="Try again" retry={retry} />}
    />
  );
}
