import { FallbackLink, FallbackView } from './fallback-view';

export default function NotFound() {
  return (
    <FallbackView
      label="404"
      title="Page not found"
      description="The page you requested does not exist or has moved."
      action={<FallbackLink href="/" label="Return home" />}
    />
  );
}
