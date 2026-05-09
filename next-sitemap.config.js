const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (process.env.GITHUB_ACTIONS === 'true' && process.env.GITHUB_REPOSITORY ? `https://${process.env.GITHUB_REPOSITORY.split('/')[0]}.github.io/${process.env.GITHUB_REPOSITORY.split('/')[1]}` : 'https://infinityfront.vercel.app');

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 0.7,
};
