import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { site } from '../data/site'
import ogDefault from '../assets/images/img-02.webp'

const MANAGED = 'data-seo-managed'

function upsertMeta(selector, attrs) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(MANAGED, 'true')
    document.head.appendChild(el)
  }
  Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value))
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    el.setAttribute(MANAGED, 'true')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Head management for every route: title, description, canonical URL,
 * Open Graph, Twitter cards and optional JSON-LD structured data.
 */
export default function Seo({
  title,
  description,
  image,
  type = 'website',
  noindex = false,
  schema,
  publishedAt,
  author,
}) {
  const { pathname } = useLocation()

  const fullTitle = title
    ? `${title} | ${site.shortName}`
    : `${site.name} | Vadamavandal`
  const metaDescription =
    description ||
    'Discover A.N. Radhakrishnan College of Arts and Science in Vadamavandal, Thiruvannamalai. Explore programmes, academics, campus life, admissions and student opportunities.'
  const canonical = `${site.url.replace(/\/$/, '')}${pathname === '/' ? '' : pathname}`
  const ogImage = image || ogDefault

  useEffect(() => {
    document.title = fullTitle

    upsertMeta('meta[name="description"]', { name: 'description', content: metaDescription })
    upsertMeta('meta[name="robots"]', {
      name: 'robots',
      content: noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large',
    })
    upsertLink('canonical', canonical)

    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: site.name })
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: fullTitle })
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: metaDescription })
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: type })
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonical })
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: ogImage })
    upsertMeta('meta[property="og:locale"]', { property: 'og:locale', content: 'en_IN' })

    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: fullTitle })
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: metaDescription })
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: ogImage })

    if (type === 'article') {
      if (publishedAt) {
        upsertMeta('meta[property="article:published_time"]', {
          property: 'article:published_time',
          content: new Date(publishedAt).toISOString(),
        })
      }
      if (author) {
        upsertMeta('meta[property="article:author"]', { property: 'article:author', content: author })
      }
    }
  }, [fullTitle, metaDescription, canonical, ogImage, type, noindex, publishedAt, author])

  useEffect(() => {
    if (!schema) return
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute(MANAGED, 'true')
    script.textContent = JSON.stringify(schema)
    document.head.appendChild(script)
    return () => script.remove()
  }, [schema])

  return null
}

/** Breadcrumb structured data helper, pairs with the <Breadcrumbs /> UI. */
export function breadcrumbSchema(trail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.label,
      item: `${site.url.replace(/\/$/, '')}${crumb.href}`,
    })),
  }
}

export function articleSchema(post, imageUrl) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    image: imageUrl ? [imageUrl] : undefined,
    datePublished: post.publishedAt,
    dateModified: post._updatedAt || post.publishedAt,
    author: { '@type': 'Person', name: post.author || site.shortName },
    publisher: {
      '@type': 'CollegeOrUniversity',
      name: site.name,
      url: site.url,
    },
    mainEntityOfPage: `${site.url.replace(/\/$/, '')}/blogs/${post.slug}`,
  }
}
