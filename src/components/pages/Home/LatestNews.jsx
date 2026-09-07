import { motion } from 'framer-motion'
import BlogCard from '../../ui/BlogCard'
import Button from '../../ui/Button'
import SectionHeading from '../../ui/SectionHeading'
import { BlogCardSkeleton, ErrorState } from '../../ui/Loading'
import { fadeUp, stagger, viewportOnce } from '../../../lib/motion'
import { fetchFeaturedPosts } from '../../../lib/sanity/queries'
import { useSanity } from '../../../lib/sanity/useSanity'

/** Content for this section is managed in Sanity (falls back to mock posts). */
export default function LatestNews() {
  const { data, loading, error } = useSanity(() => fetchFeaturedPosts(3), [])
  const posts = data?.posts ?? []

  return (
    <section className="section bg-ink-50/70">
      <div className="shell">
        <SectionHeading
          title="Latest News & Insights"
          description="Events, achievements and announcements from across the departments."
        />

        {loading ? (
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((key) => (
              <BlogCardSkeleton key={key} />
            ))}
          </div>
        ) : error ? (
          <ErrorState
            title="News could not be loaded"
            description="Our newsroom is temporarily unavailable. Please try again in a moment."
            action={
              <Button to="/blogs" variant="outline" icon>
                Go to the blog
              </Button>
            }
          />
        ) : (
          <motion.div
            variants={stagger(0.09)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {posts.map((post) => (
              <motion.div key={post._id} variants={fadeUp}>
                <BlogCard post={post} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
