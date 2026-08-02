import 'server-only';

const LOCAL_SITE_URL = 'http://localhost:3000';

const siteConfig = {
  description: 'A focused Next.js foundation for small products.',
  name: 'Next Template',
} as const;

const parseSiteOrigin = (value: string, source: 'SITE_URL' | 'VERCEL_PROJECT_PRODUCTION_URL') => {
  const url = (() => {
    try {
      return new URL(value);
    } catch {
      throw new Error(`${source} must be a valid absolute URL.`);
    }
  })();

  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new Error(`${source} must use http or https.`);
  }

  if (url.username || url.password || url.pathname !== '/' || url.search || url.hash) {
    throw new Error(
      `${source} must contain only an origin, without credentials, a path, or query data.`,
    );
  }

  return new URL(url.origin);
};

const getSiteUrl = () => {
  const configuredUrl = process.env.SITE_URL?.trim();

  if (configuredUrl !== undefined && configuredUrl !== '') {
    return parseSiteOrigin(configuredUrl, 'SITE_URL');
  }

  const vercelProductionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();

  if (vercelProductionHost !== undefined && vercelProductionHost !== '') {
    const vercelProductionUrl = /^https?:\/\//iu.test(vercelProductionHost)
      ? vercelProductionHost
      : `https://${vercelProductionHost}`;

    return parseSiteOrigin(vercelProductionUrl, 'VERCEL_PROJECT_PRODUCTION_URL');
  }

  return new URL(LOCAL_SITE_URL);
};

const isIndexableDeployment = () => {
  const vercelEnvironment = process.env.VERCEL_ENV?.trim();

  if (vercelEnvironment !== undefined && vercelEnvironment !== '') {
    return vercelEnvironment === 'production';
  }

  return process.env.NODE_ENV === 'production';
};

export { getSiteUrl, isIndexableDeployment, siteConfig };
