# A.N. Radhakrishnan College of Arts and Science — Website

Marketing and information site for A.N. Radhakrishnan College of Arts and Science,
Vadamavandal, Thiruvannamalai District.

React + Vite + Tailwind CSS + Framer Motion + React Router, with blog content from
Sanity and form email delivery through Resend.

---

## Quick start

```bash
npm install
cp .env.example .env      # optional — the site runs without any keys
npm run dev               # http://localhost:5173
```

Nothing is required to see the full site: with no Sanity project configured the
blog falls back to curated mock posts, and the forms report a clear "email service
is not configured" message instead of failing silently.

### Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Vite dev server, including the `/api` routes (see below) |
| `npm run build` | Regenerates `public/sitemap.xml`, then builds to `dist/` |
| `npm run preview` | Serves the production build locally |
| `npm run smoke` | Server-renders every route to catch runtime errors |
| `npm run sitemap` | Regenerates `public/sitemap.xml` on its own |

---

## Environment variables

Copy `.env.example` to `.env`. Two groups, and the distinction matters:

**Public (browser) — must be prefixed `VITE_`**

```
VITE_SANITY_PROJECT_ID=
VITE_SANITY_DATASET=production
VITE_SANITY_SITE_ID=anrcas
VITE_SANITY_API_VERSION=2024-10-01
VITE_SITE_URL=https://www.anrcas.edu.in
```

**Server only — never prefixed, never imported from `src/`**

```
RESEND_API_KEY=re_xxxxxxxxxxxx
MAIL_FROM="ANR College Website <website@anrcas.edu.in>"
MAIL_TO=admin@anrcas.edu.in
```

`RESEND_API_KEY` is read exclusively inside `api/_lib/mail.js`, which only ever
runs on the server. Anything with a `VITE_` prefix is compiled into the client
bundle and is public — never put the Resend key there.

---

## Email (Resend)

Two serverless endpoints, written in the Vercel Node function format:

- `POST /api/send-admission-enquiry` — `{ name, email, phone, course, qualification, message }`
- `POST /api/send-contact` — `{ name, email, phone?, subject, message }`

Both validate server-side (the browser validation is a convenience, not the
authority), silently absorb honeypot submissions, and answer with
`{ ok: true }` or `{ ok: false, error, fields? }`.

In development these same handlers are mounted into the Vite dev server by the
`devApiRoutes` plugin in `vite.config.js`, so `npm run dev` behaves like
production.

To go live: create a Resend account, verify the sending domain, then set
`RESEND_API_KEY`, `MAIL_FROM` and `MAIL_TO` in the hosting environment.

---

## Content (Sanity)

Blogs, news and events are managed in Sanity. The schema lives in
[`sanity/schemaTypes`](sanity/schemaTypes) — copy it into a Sanity Studio project
(see [`sanity/README.md`](sanity/README.md)), then set `VITE_SANITY_PROJECT_ID`
and add the site's URL to the CORS origins in sanity.io/manage.

The data layer is in `src/lib/sanity/`:

- `client.js` — configuration; the client is imported dynamically so its
  JavaScript only downloads when a project id exists
- `queries.js` — GROQ queries and the fetch helpers, each with a mock fallback
- `mockPosts.js` — the posts used until the CMS is connected
- `useSanity.js` — loading/error state hook plus date and reading-time helpers

---

## Deployment (Vercel)

`vercel.json` is already configured: Vite build, SPA rewrites that exclude
`/api`, and immutable caching for hashed assets.

```bash
vercel            # preview
vercel --prod     # production
```

Set the environment variables in the Vercel project settings before the first
production deploy.

On any other host: serve `dist/` with an SPA fallback to `index.html`, and port
the two files in `api/` to that platform's function format.

---

## Project structure

```
api/                       Serverless email endpoints (server-only)
  _lib/mail.js             Validation, HTML template, Resend transport
scripts/                   Sitemap generation and the SSR smoke test
sanity/schemaTypes/        Sanity Studio schema (copy into a studio project)
src/
  components/
    pages/                 One folder per route area; Home holds the section files
    ui/                    Reusable components (Navbar, Footer, cards, forms, …)
  data/                    All site content: navigation, programmes, committees,
                           facilities, gallery, FAQs, images
  lib/                     Motion variants, hooks, SEO, validation, Sanity layer
```

### Where to edit content

| What | File |
| --- | --- |
| Address, phone, email, socials, navigation | `src/data/site.js` |
| Google Maps embed (`mapEmbed`) and directions link | `src/data/site.js` |
| Programmes and curricula | `src/data/programmes.js` |
| Stats, features, pathway, FAQs, departments, milestones | `src/data/content.js` |
| Committees and members | `src/data/committee.js` |
| Facilities | `src/data/facilities.js` |
| Gallery photographs | `src/data/gallery.js` |
| Every photograph on the site | `src/data/images.js` |

### Photography

`src/data/images.js` is the single registry for every image and for the brand
marks (`brand.logo`, `brand.groupLogo`, `brand.founder`, award icons).

The college's own photographs in `src/assets/images/` are already wired in — the
crest, the founder portrait, the group logo, the computer laboratory, the
inauguration, the campus ceremony and the group photographs. Slots the college
has not yet photographed (library, classrooms, laboratories, sports, transport,
canteen, most programme cards) use an optimised stock frame via `unsplash(...)`.

To replace one: drop the file in `src/assets/images/`, `import` it at the top of
`images.js`, and swap `photo('…', '…')` for `local(yourImport, 'alt text')`.
Update the alt text with the image — it is written for the real photograph, not
the placeholder.

`founder-anr.webp` is a 900px, 191 kB derivative of the supplied 3.8 MB
`anr.webp`; regenerate it if the original changes.

`<SmartImage />` handles lazy loading, the loading skeleton, and a branded
fallback if an image ever fails to load.

---

## Design system

- **Typeface** — Parkinsans, loaded non-blocking in `index.html`
- **Colours** — primary `#179BD7`, accent `#45AFDF`, surface `#1C1C1C`, muted
  `#7F8C8D`, exposed as the `brand` and `ink` scales in `tailwind.config.js`
- **Motion** — shared variants in `src/lib/motion.js`; durations 0.4–0.8s, all
  scroll animations fire once. `<MotionConfig reducedMotion="user">` plus a CSS
  media query honour `prefers-reduced-motion`
- **Layout** — `.shell` (max 1440px) and `.section` utilities in `src/index.css`

## Accessibility

Semantic landmarks, a skip link, visible focus rings on light and dark sections,
`aria-expanded` / `aria-controls` on the navigation and accordions, keyboard
support in the lightbox (arrows and Escape), labelled form fields with
`aria-invalid` and `role="alert"` messages, and alt text on every image.
