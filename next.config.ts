import type { NextConfig } from 'next';

const isGithubPages = process.env.GITHUB_PAGES === 'true';
const repoBasePath = isGithubPages ? '/portfolio' : '';

const nextConfig: NextConfig = {
  ...(isGithubPages && {
    output: 'export',
    trailingSlash: true,
  }),
  basePath: repoBasePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: repoBasePath,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
