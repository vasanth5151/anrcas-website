import { getSanityClient, isSanityConfigured } from './client'
import { mockPosts } from './mockPosts'

const postFields = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  category,
  publishedAt,
  "author": coalesce(author->name, author, "College Office"),
  "mainImage": { "url": mainImage.asset->url, "alt": coalesce(mainImage.alt, title) },
  seoTitle,
  seoDescription
`

export const queries = {
  posts: `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) [$from...$to] { ${postFields} }`,
  featured: `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) [0...$limit] { ${postFields} }`,
  bySlug: `*[_type == "post" && slug.current == $slug][0] { ${postFields}, body }`,
  related: `*[_type == "post" && slug.current != $slug] | order(publishedAt desc) [0...3] { ${postFields} }`,
  categories: `array::unique(*[_type == "post" && defined(category)].category)`,
}

const sortByDate = (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
const mockSorted = () => mockPosts.slice().sort(sortByDate)

/** Latest posts for the homepage and the /blogs index. */
export async function fetchPosts({ limit = 12, offset = 0 } = {}) {
  if (!isSanityConfigured) {
    return { posts: mockSorted().slice(offset, offset + limit), isMock: true }
  }

  const client = await getSanityClient()
  const posts = await client.fetch(queries.posts, { from: offset, to: offset + limit })

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
  const post = await client.fetch(queries.bySlug, { slug })
  if (!post) return fromMock()

  const related = await client.fetch(queries.related, { slug })
  return { post, related: related ?? [], isMock: false }
}

export async function fetchCategories() {
  const mockCategories = [...new Set(mockPosts.map((post) => post.category))].filter(Boolean)
  if (!isSanityConfigured) return mockCategories

  const client = await getSanityClient()
  const categories = await client.fetch(queries.categories)
  return categories?.filter(Boolean)?.length ? categories.filter(Boolean) : mockCategories
}

export class NotFoundError extends Error {
  constructor(slug) {
    super(`No post found for slug "${slug}".`)
    this.name = 'NotFoundError'
    this.status = 404
  }
}
