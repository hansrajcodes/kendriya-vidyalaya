export default function sitemap() {
  const baseUrl = 'https://www.drkpsmoga.com'

  const routes = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/about', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/admission', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/admission/apply', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/faculty', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/infrastructure', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/gallery', priority: 0.6, changeFrequency: 'weekly' },
    { path: '/examination', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/general-info', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/academics', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/academics/fee-structure', priority: 0.7, changeFrequency: 'yearly' },
    { path: '/academics/calendar', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/academics/circulars', priority: 0.7, changeFrequency: 'weekly' },
    { path: '/academics/homework', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/academics/book-list', priority: 0.6, changeFrequency: 'yearly' },
    { path: '/academics/careers', priority: 0.6, changeFrequency: 'monthly' },
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
