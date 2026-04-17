export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard/', '/api/', '/login'],
      },
    ],
    sitemap: 'https://www.drkpsmoga.com/sitemap.xml',
  }
}
