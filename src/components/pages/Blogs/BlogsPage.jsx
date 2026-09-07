import { motion } from 'framer-motion'
import Seo, { breadcrumbSchema } from '../../../lib/Seo'
import PageHero from '../../ui/PageHero'
import BlogCard from '../../ui/BlogCard'
import SectionHeading from '../../ui/SectionHeading'
import Button from '../../ui/Button'
import { BlogCardSkeleton, ErrorState } from '../../ui/Loading'
import { fadeUp, stagger, viewportOnce } from '../../../lib/motion'
import { fetchPosts } from '../../../lib/sanity/queries'
import { useSanity } from '../../../lib/sanity/useSanity'
import blogsHero from '../../../assets/images/17.webp'

const trail = [{ label: 'Blogs', href: '/blogs' }]

export default function BlogsPage() {
  const { data, loading, error } = useSanity(() => fetchPosts({ limit: 24 }), [])
  const posts = data?.posts ?? []

  return (
    <>
      <Seo
        title="Blogs"
        description="Blogs from A.N. Radhakrishnan College of Arts and Science, Vadamavandal, campus stories, department features and student writing."
        schema={breadcrumbSchema(trail)}
      />

      <PageHero
        title="Blogs"
        description="Campus stories, department features and student writing, published by the college office."
        trail={trail}
        image={{ src: blogsHero, alt: 'Inauguration of a college programme by the management and faculty' }}
      />

      <section className="section bg-white">
        <div className="shell">
          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2, 3, 4, 5].map((key) => (
                <BlogCardSkeleton key={key} />
              ))}
            </div>
          ) : error ? (
            <ErrorState
              title="Blogs could not be loaded"
              description="The blog is temporarily unavailable. Please refresh the page in a moment."
              action={
                <Button to="/" variant="outline" icon>
                  Back to home
                </Button>
              }
            />
          ) : (
            <>
              <motion.div
                variants={stagger(0.08)}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              >
                {posts.map((post) => (
                  <motion.div key={post._id} variants={fadeUp}>
                    <BlogCard post={post} />
                  </motion.div>
                ))}
              </motion.div>

              {!posts.length ? (
                <p className="py-20 text-center text-sm text-ink-400">No blogs have been published yet.</p>
              ) : null}
            </>
          )}
        </div>
      </section>

      <section className="section bg-ink-50/70">
        <div className="shell">
          <SectionHeading
            title="Have a story worth publishing?"
            description="Department heads and class mentors can send write-ups, event reports and student features to the college office."
            align="center"
            action={null}
          />
          <div className="mt-10 flex justify-center">
            <Button to="/contact" variant="dark" icon>
              Contact the college office
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
