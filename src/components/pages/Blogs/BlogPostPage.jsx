import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, CalendarDays, Clock, User } from 'lucide-react'
import Seo, { articleSchema, breadcrumbSchema } from '../../../lib/Seo'
import Breadcrumbs from '../../ui/Breadcrumbs'
import BlogCard from '../../ui/BlogCard'
import PortableText from '../../ui/PortableText'
import SmartImage from '../../ui/SmartImage'
import SectionHeading from '../../ui/SectionHeading'
import Button from '../../ui/Button'
import Loading, { ErrorState } from '../../ui/Loading'
import { fadeUp, stagger, viewportOnce } from '../../../lib/motion'
import { fetchPost } from '../../../lib/sanity/queries'
import { formatDate, readingTime, useSanity } from '../../../lib/sanity/useSanity'
import { urlForImage } from '../../../lib/sanity/image'
import blogFallback from '../../../assets/images/17.webp'

export default function BlogPostPage() {
  const { slug } = useParams()
  const { data, loading, error } = useSanity(() => fetchPost(slug), [slug])

  if (loading) return <Loading label="Loading article" />

  if (error || !data?.post) {
    return (
      <div className="shell py-40">
        <ErrorState
          title="Post not found"
          description="The article you are looking for may have been moved or removed."
          action={
            <Button to="/blogs" variant="primary" icon>
              Back to all posts
            </Button>
          }
        />
      </div>
    )
  }

  const { post, related } = data
  const heroImage = urlForImage(post.mainImage, { width: 1000 }) || blogFallback
  const minutes = post.readingTime ?? readingTime(post.body)
  const trail = [
    { label: 'Blogs', href: '/blogs' },
    { label: post.title, href: `/blogs/${post.slug}` },
  ]

  return (
    <>
      <Seo
        title={post.seoTitle || post.title}
        description={post.seoDescription || post.excerpt}
        image={heroImage}
        type="article"
        publishedAt={post.publishedAt}
        author={post.author}
        schema={{
          '@context': 'https://schema.org',
          '@graph': [articleSchema(post, heroImage), breadcrumbSchema(trail)],
        }}
      />

      <article>
        {/* Header */}
        <header className="border-b border-ink-100 bg-white pb-14 pt-[132px] lg:pt-[168px]">
          <div className="shell">
            <Breadcrumbs trail={trail} className="mb-8" />

            <motion.div variants={stagger(0.08)} initial="hidden" animate="show" className="max-w-3xl">
              {post.category ? (
                <motion.span
                  variants={fadeUp}
                  className="inline-flex rounded-md bg-brand-50 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600"
                >
                  {post.category}
                </motion.span>
              ) : null}

              <motion.h1 variants={fadeUp} className="display mt-6 font-bold text-[32px] text-ink-900 sm:text-[44px] lg:text-[52px]">
                {post.title}
              </motion.h1>

              {post.excerpt ? (
                <motion.p variants={fadeUp} className="lead mt-6">
                  {post.excerpt}
                </motion.p>
              ) : null}

              <motion.div
                variants={fadeUp}
                className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-ink-100 pt-6 text-[13px] text-ink-400"
              >
                <span className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-brand-500" strokeWidth={1.7} aria-hidden="true" />
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                </span>
                {post.author ? (
                  <span className="flex items-center gap-2">
                    <User className="h-4 w-4 text-brand-500" strokeWidth={1.7} aria-hidden="true" />
                    {post.author}
                  </span>
                ) : null}
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-brand-500" strokeWidth={1.7} aria-hidden="true" />
                  {minutes} min read
                </span>
              </motion.div>
            </motion.div>
          </div>
        </header>

        {/* Body & Sidebar */}
        <div className="bg-white pb-20 pt-10 sm:pt-14">
          <div className="shell">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
              {/* Main Article Content (Left) */}
              <div className="lg:col-span-8">
                <motion.div variants={fadeUp} initial="hidden" animate="show">
                  <SmartImage
                    src={heroImage}
                    alt={post.mainImage?.alt || post.title}
                    ratio="wide"
                    priority
                    className="max-h-[420px] w-full rounded-[20px] border border-ink-100 shadow-sm"
                    sizes="(max-width: 1024px) 100vw, 800px"
                  />
                </motion.div>

                <div className="mt-10">
                  <PortableText value={post.body} />

                  <div className="mt-14 flex flex-col gap-4 border-t border-ink-100 pt-8 sm:flex-row sm:items-center sm:justify-between">
                    <Link
                      to="/blogs"
                      className="inline-flex items-center gap-2 text-[14px] font-medium text-brand-600 hover:text-brand-700"
                    >
                      <ArrowLeft className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
                      All news &amp; insights
                    </Link>
                    <Button to="/admission" variant="outline" size="sm" icon>
                      Admission enquiry
                    </Button>
                  </div>
                </div>
              </div>

              {/* Right Sidebar Column - Recent Blogs */}
              <aside className="lg:col-span-4 lg:sticky lg:top-28">
                <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-sm sm:p-7">
                  <h3 className="border-b border-ink-100 pb-4 text-[18px] font-bold tracking-tight text-ink-900">
                    Recent Blogs
                  </h3>

                  <div className="mt-6 flex flex-col gap-5">
                    {related?.slice(0, 4).map((item) => {
                      const itemImg = urlForImage(item.mainImage, { width: 300 }) || blogFallback
                      return (
                        <article key={item._id} className="group flex gap-3.5 items-start">
                          <Link
                            to={`/blogs/${item.slug}`}
                            className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl border border-ink-100 bg-ink-100"
                          >
                            <img
                              src={itemImg}
                              alt={item.title}
                              className="h-full w-full object-cover transition-transform duration-500 ease-premium group-hover:scale-105"
                            />
                          </Link>
                          <div className="flex-1 min-w-0">
                            {item.category ? (
                              <span className="text-[10.5px] font-semibold uppercase tracking-wider text-brand-600">
                                {item.category}
                              </span>
                            ) : null}
                            <h4 className="mt-0.5 text-[13.5px] font-bold leading-snug text-ink-900 transition-colors group-hover:text-brand-600 line-clamp-2">
                              <Link to={`/blogs/${item.slug}`}>{item.title}</Link>
                            </h4>
                            <p className="mt-1 flex items-center gap-1.5 text-[11.5px] text-ink-400">
                              <CalendarDays className="h-3 w-3 text-brand-500" />
                              <time dateTime={item.publishedAt}>{formatDate(item.publishedAt)}</time>
                            </p>
                          </div>
                        </article>
                      )
                    })}
                  </div>

                  <div className="mt-7 border-t border-ink-100 pt-5">
                    <Button to="/blogs" variant="dark" size="sm" className="w-full justify-center" icon>
                      Browse all blogs
                    </Button>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </article>

      {/* Related */}
      {related?.length ? (
        <section className="section bg-ink-50/70">
          <div className="shell">
            <SectionHeading
              title="More from the college"
              action={
                <Button to="/blogs" variant="outline" icon>
                  All posts
                </Button>
              }
            />

            <motion.div
              variants={stagger(0.08)}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {related.map((item) => (
                <motion.div key={item._id} variants={fadeUp}>
                  <BlogCard post={item} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      ) : null}
    </>
  )
}
