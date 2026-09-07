/**
 * Builds an optimised image URL.
 *
 * GROQ projections in `queries.js` already resolve `mainImage.asset->url`, so
 * what arrives here is a plain Sanity CDN URL, appending the transform
 * parameters directly avoids shipping the @sanity/image-url builder to the
 * browser. Non-Sanity URLs (the mock posts) are returned untouched.
 */
export function urlForImage(source, { width = 1200, height, quality = 75 } = {}) {
  if (!source) return null

  const url = typeof source === 'string' ? source : source.url
  if (!url) return null
  if (!url.includes('cdn.sanity.io')) return url

  const params = new URLSearchParams({ auto: 'format', fit: 'crop', q: String(quality), w: String(width) })
  if (height) params.set('h', String(height))
  return `${url}${url.includes('?') ? '&' : '?'}${params.toString()}`
}
