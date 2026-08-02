import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
  reactCompiler: true,
  experimental: {
    useTypeScriptCli: true,
  },
};

export default nextConfig;
