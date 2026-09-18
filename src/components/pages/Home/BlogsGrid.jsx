import { motion } from 'framer-motion'
import BlogCard from '../../ui/BlogCard'
import Button from '../../ui/Button'
import SectionHeading from '../../ui/SectionHeading'
import { BlogCardSkeleton } from '../../ui/Loading'
import { fadeUp, stagger, viewportOnce } from '../../../lib/motion'
import { fetchPosts } from '../../../lib/sanity/queries'
import { useSanity } from '../../../lib/sanity/useSanity'

const SHOW = 3

/**
 * Secondary blog grid, shown below the <LatestNews /> notices strip. Content
 * is managed in Sanity and falls back to the mock posts.
 */
export default function BlogsGrid() {
  const { data, loading, error } = useSanity(() => fetchPosts({ limit: SHOW }), [])
  const posts = data?.posts ?? []

  // Nothing published yet, stay out of the way entirely.
  if (error || (!loading && !posts.length)) return null

  return (
    <section className="section bg-white">
      <div className="shell">
        <SectionHeading
          title="Latest Blogs"
          description="Department updates, student achievements and features published by the college office."
          action={
            <Button to="/blogs" variant="outline" icon>
              Browse all blogs
            </Button>
          }
        />

        {loading ? (
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((key) => (
              <BlogCardSkeleton key={key} />
            ))}
          </div>
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
