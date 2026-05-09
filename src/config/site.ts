const DEFAULT_SITE_URL = 'https://infinityfront.vercel.app';
const GITHUB_PAGES_BASE_PATH = '/infinity_front';

function normalizeUrl(value: string | undefined): string {
  return (value || '').replace(/\/$/, '');
}

const githubRepository: string = process.env.GITHUB_REPOSITORY || '';
const [githubOwner, githubRepo] = githubRepository.split('/');
const githubPagesUrl = githubOwner && githubRepo ? `https://${githubOwner}.github.io/${githubRepo}` : DEFAULT_SITE_URL;

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || (process.env.GITHUB_ACTIONS === 'true' ? GITHUB_PAGES_BASE_PATH : '');
export const SITE_URL = normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL || (process.env.GITHUB_ACTIONS === 'true' ? githubPagesUrl : DEFAULT_SITE_URL));

export function withBasePath(path: string = '/'): string {
  if (!BASE_PATH) {
    return path;
  }

  if (path.startsWith('/')) {
    return `${BASE_PATH}${path}`;
  }

  return `${BASE_PATH}/${path}`;
}