const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production'
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2024-10-01'

/**
 * The site is fully functional before Sanity is connected: with no project id
 * we fall back to the curated posts in `mockPosts.js`, so the News & Insights
 * section, /blogs and /blogs/:slug all still render.
 */
export const isSanityConfigured = Boolean(projectId)

export const sanityConfig = { projectId, dataset, apiVersion }

let clientPromise = null

/**
 * The Sanity client is imported dynamically so its ~100 kB of JavaScript is
 * only downloaded when the CMS is actually configured.
 */
export async function getSanityClient() {
  if (!isSanityConfigured) return null
  if (!clientPromise) {
    clientPromise = import('@sanity/client').then(({ createClient }) =>
      createClient({
        projectId,
        dataset,
        apiVersion,
        useCdn: true,
        perspective: 'published',
      }),
    )
  }
  return clientPromise
}
