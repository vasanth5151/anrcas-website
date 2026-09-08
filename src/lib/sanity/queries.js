import { getSanityClient, isSanityConfigured } from './client'
import { mockPosts } from './mockPosts'
import { sanityConfig } from './client'

const postFields = `
  _id,
  title,
  "slug": coalesce(slug.current, _id),
  "excerpt": coalesce(excerpt, desc),
  "category": coalesce(category, select(_type == "schoolNews" => "Campus News", "Blogs")),
  "publishedAt": coalesce(publishedAt, date),
  "author": coalesce(author->name, author, "College Office"),
  "mainImage": { "url": coalesce(mainImage.asset->url, image.asset->url), "alt": coalesce(mainImage.alt, image.alt, title) },
  seoTitle,
  "seoDescription": coalesce(seoDescription, desc)
`

export const queries = {
  posts: `*[_type in ["blogPost", "schoolNews"] && site == $siteId] | order(coalesce(publishedAt, date) desc) [$from...$to] { ${postFields} }`,
  featured: `*[_type in ["blogPost", "schoolNews"] && site == $siteId] | order(coalesce(publishedAt, date) desc) [0...$limit] { ${postFields} }`,
  bySlug: `*[_type in ["blogPost", "schoolNews"] && site == $siteId && (_id == $slug || slug.current == $slug)][0] { ${postFields}, body }`,
  related: `*[_type in ["blogPost", "schoolNews"] && site == $siteId && (_id != $slug && slug.current != $slug)] | order(coalesce(publishedAt, date) desc) [0...3] { ${postFields} }`,
  categories: `array::unique(*[_type in ["blogPost", "schoolNews"] && site == $siteId].category)`,
}

const sortByDate = (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
const mockSorted = () => mockPosts.slice().sort(sortByDate)

/** Latest posts for the homepage and the /blogs index. */
export async function fetchPosts({ limit = 12, offset = 0 } = {}) {
  if (!isSanityConfigured) {
    return { posts: mockSorted().slice(offset, offset + limit), isMock: true }
  }

  const client = await getSanityClient()
  const posts = await client.fetch(queries.posts, { from: offset, to: offset + limit, siteId: sanityConfig.siteId })

  // A freshly created, still-empty dataset should not render an empty section.
  if (!posts?.length && offset === 0) {
    return { posts: mockSorted().slice(0, limit), isMock: true }
  }
  return { posts: posts ?? [], isMock: false }
}

export async function fetchFeaturedPosts(limit = 3) {
  return fetchPosts({ limit })
}

/** A single post plus three related items, for /blogs/:slug. */
export async function fetchPost(slug) {
  const fromMock = () => {
    const post = mockPosts.find((item) => item.slug === slug)
    if (!post) throw new NotFoundError(slug)
    return {
      post,
      related: mockSorted().filter((item) => item.slug !== slug).slice(0, 3),
      isMock: true,
    }
  }

  if (!isSanityConfigured) return fromMock()

  const client = await getSanityClient()
  const post = await client.fetch(queries.bySlug, { slug, siteId: sanityConfig.siteId })
  if (!post) return fromMock()

  const related = await client.fetch(queries.related, { slug, siteId: sanityConfig.siteId })
  return { post, related: related ?? [], isMock: false }
}

export async function fetchCategories() {
  const mockCategories = [...new Set(mockPosts.map((post) => post.category))].filter(Boolean)
  if (!isSanityConfigured) return mockCategories

  const client = await getSanityClient()
  const categories = await client.fetch(queries.categories, { siteId: sanityConfig.siteId })
  return categories?.filter(Boolean)?.length ? categories.filter(Boolean) : mockCategories
}

export class NotFoundError extends Error {
  constructor(slug) {
    super(`No post found for slug "${slug}".`)
    this.name = 'NotFoundError'
    this.status = 404
  }
}
