/**
 * Writes public/sitemap.xml from the static route table plus the programme
 * data, so the sitemap can never drift from the router. Runs automatically
 * before `npm run build`.
 */
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { createServer } from 'vite'

// Loaded through Vite so the script reads exactly the same data module the app
// does, extensionless imports and all.
const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' })
const { categories, programmes } = await vite.ssrLoadModule('/src/data/programmes.js')
const { committees } = await vite.ssrLoadModule('/src/data/committee.js')
await vite.close()

const origin = (process.env.VITE_SITE_URL || 'https://www.anrcas.edu.in').replace(/\/$/, '')

const staticRoutes = [
  ['/', 1.0, 'weekly'],
  ['/about', 0.8, 'monthly'],
  ['/academics', 0.8, 'monthly'],
  ['/departments', 0.7, 'monthly'],
  ['/programmes', 0.9, 'monthly'],
  ['/gallery', 0.6, 'monthly'],
  ['/committee', 0.5, 'yearly'],
  ['/facilities', 0.7, 'monthly'],
  ['/contact', 0.7, 'yearly'],
  ['/admission', 0.9, 'weekly'],
  ['/blogs', 0.8, 'weekly'],
]

const routes = [
  ...staticRoutes,
  ...categories.map((category) => [`/programmes/${category.slug}`, 0.7, 'monthly']),
  ...programmes.map((programme) => [`/programmes/${programme.category}/${programme.slug}`, 0.7, 'monthly']),
  ...committees.map((committee) => [`/committees/${committee.slug}`, 0.5, 'yearly']),
]

const today = new Date().toISOString().split('T')[0]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    ([path, priority, changefreq]) => `  <url>
    <loc>${origin}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

const target = resolve(process.cwd(), 'public/sitemap.xml')
writeFileSync(target, xml, 'utf8')
console.log(`sitemap.xml written with ${routes.length} URLs`)
