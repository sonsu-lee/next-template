import type { MetadataRoute } from 'next';

import { getSiteUrl, isIndexableDeployment } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  const indexable = isIndexableDeployment();

  return {
    rules: {
      userAgent: '*',
      ...(indexable ? { allow: '/' } : { disallow: '/' }),
    },
    sitemap: new URL('/sitemap.xml', getSiteUrl()).toString(),
  };
}
