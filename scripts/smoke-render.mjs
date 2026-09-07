/**
 * Renders every route through Vite's SSR pipeline so component-level runtime
 * errors surface in CI — a production build alone only proves the modules
 * compile. Page modules are loaded eagerly here (the app lazy-loads them), so
 * each page component is actually executed.
 *
 *   npm run smoke
 */
import { createServer } from 'vite'

const pages = {
  Home: '/src/components/pages/Home/HomePage.jsx',
  About: '/src/components/pages/About/AboutPage.jsx',
  Academics: '/src/components/pages/Academics/AcademicsPage.jsx',
  Departments: '/src/components/pages/Academics/DepartmentsPage.jsx',
  Programmes: '/src/components/pages/Programmes/ProgrammesPage.jsx',
  ProgrammeCategory: '/src/components/pages/Programmes/ProgrammeCategoryPage.jsx',
  ProgrammeDetail: '/src/components/pages/Programmes/ProgrammeDetailPage.jsx',
  Gallery: '/src/components/pages/Gallery/GalleryPage.jsx',
  Committee: '/src/components/pages/Committee/CommitteePage.jsx',
  CommitteeDetail: '/src/components/pages/Committee/CommitteeDetailPage.jsx',
  Facilities: '/src/components/pages/Facilities/FacilitiesPage.jsx',
  Contact: '/src/components/pages/Contact/ContactPage.jsx',
  Admission: '/src/components/pages/Admission/AdmissionPage.jsx',
  Blogs: '/src/components/pages/Blogs/BlogsPage.jsx',
  BlogPost: '/src/components/pages/Blogs/BlogPostPage.jsx',
  NotFound: '/src/components/pages/NotFoundPage.jsx',
}

const routeTable = [
  ['/', 'Home'],
  ['/about', 'About'],
  ['/academics', 'Academics'],
  ['/departments', 'Departments'],
  ['/programmes', 'Programmes'],
  ['/programmes/:category', 'ProgrammeCategory'],
  ['/programmes/:category/:slug', 'ProgrammeDetail'],
  ['/gallery', 'Gallery'],
  ['/committee', 'Committee'],
  ['/committees/:slug', 'CommitteeDetail'],
  ['/facilities', 'Facilities'],
  ['/contact', 'Contact'],
  ['/admission', 'Admission'],
  ['/blogs', 'Blogs'],
  ['/blogs/:slug', 'BlogPost'],
  ['*', 'NotFound'],
]

const urls = [
  '/',
  '/about',
  '/academics',
  '/departments',
  '/programmes',
  '/programmes/science',
  '/programmes/science/computer-science',
  '/programmes/science/mathematics',
  '/programmes/commerce',
  '/programmes/commerce/bcom',
  '/programmes/commerce/corporate-secretaryship',
  '/programmes/commerce/mcom',
  '/programmes/humanities',
  '/programmes/humanities/bba',
  '/programmes/languages',
  '/programmes/languages/tamil',
  '/programmes/languages/english',
  '/gallery',
  '/committee',
  '/committees/anti-ragging-committee',
  '/committees/anti-drugs-committee',
  '/committees/discipline-committee',
  '/committees/academic-committee',
  '/committees/placement-committee',
  '/committees/women-welfare-committee',
  '/committees/internal-complaints-committee',
  '/committees/nirf-committee',
  '/committees/red-ribbon-club',
  '/committees/cultural-committee',
  '/committees/sc-st-scholarship-committee',
  '/facilities',
  '/contact',
  '/admission',
  '/blogs',
  '/blogs/womens-day-2026',
  '/nonexistent-page',
]

const server = await createServer({
  root: process.cwd(),
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
})

let failures = 0

try {
  // React, the server renderer and the router come through the same SSR module
  // graph as the components (see scripts/ssr-entry.js), so there is exactly one
  // React instance and router context always matches.
  const { React, renderToString, MemoryRouter, Routes, Route } =
    await server.ssrLoadModule('/scripts/ssr-entry.js')
  const { default: Navbar } = await server.ssrLoadModule('/src/components/ui/Navbar.jsx')
  const { default: Footer } = await server.ssrLoadModule('/src/components/ui/Footer.jsx')

  const loaded = {}
  for (const [name, path] of Object.entries(pages)) {
    loaded[name] = (await server.ssrLoadModule(path)).default
  }

  for (const url of urls) {
    try {
      const tree = React.createElement(
        MemoryRouter,
        { initialEntries: [url] },
        React.createElement(Navbar),
        React.createElement(
          Routes,
          null,
          ...routeTable.map(([path, name]) =>
            React.createElement(Route, {
              key: path,
              path,
              element: React.createElement(loaded[name]),
            }),
          ),
        ),
        React.createElement(Footer),
      )

      const html = renderToString(tree)
      const ok = html.length > 8000
      console.log(`${ok ? 'PASS' : 'THIN'}  ${url.padEnd(46)} ${html.length} chars`)
      if (!ok) failures += 1
    } catch (error) {
      failures += 1
      console.log(`FAIL  ${url}`)
      console.log(`      ${error.message}`)
      if (error.stack) console.log(error.stack.split('\n').slice(1, 4).join('\n'))
    }
  }
} finally {
  await server.close()
}

console.log(failures ? `\n${failures} route(s) failed` : '\nAll routes rendered')
process.exit(failures ? 1 : 0)
