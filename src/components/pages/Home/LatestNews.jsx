import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'
import Button from '../../ui/Button'
import SectionHeading from '../../ui/SectionHeading'
import SmartImage from '../../ui/SmartImage'
import { ErrorState, Skeleton } from '../../ui/Loading'
import { fadeUp, stagger, viewportOnce } from '../../../lib/motion'
import { fetchNews } from '../../../lib/sanity/queries'
import { useSanity } from '../../../lib/sanity/useSanity'
import { urlForImage } from '../../../lib/sanity/image'

const formatNewsDate = (value) =>
  value ? new Date(value).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }) : ''

function NewsCardSkeleton() {
  return (
    <div className="w-[78vw] shrink-0 snap-start overflow-hidden rounded-2xl border border-ink-100 bg-white sm:w-[320px]">
      <Skeleton className="aspect-[4/3] rounded-none" />
      <div className="p-5">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="mt-2 h-5 w-3/5" />
      </div>
    </div>
  )
}

function NewsCard({ post }) {
  const image = urlForImage(post.mainImage, { width: 600 })

  return (
    <motion.article
      variants={fadeUp}
      className="w-[78vw] shrink-0 snap-start overflow-hidden rounded-2xl border border-ink-100 bg-white sm:w-[320px]"
    >
      <SmartImage
        src={image}
        alt={post.mainImage?.alt || post.title}
        ratio="wide"
        sizes="(max-width: 768px) 78vw, 320px"
      >
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-brand-500 px-3 py-1.5 text-[12px] font-semibold text-white shadow-sm">
          <CalendarDays className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
          {formatNewsDate(post.publishedAt)}
        </span>
      </SmartImage>

      <div className="p-5">
        <h3 className="text-[16.5px] font-bold leading-snug text-ink-900 line-clamp-2">{post.title}</h3>
      </div>
    </motion.article>
  )
}

/** Content for this section is managed in Sanity (falls back to mock posts). */
export default function LatestNews() {
  const { data, loading, error } = useSanity(() => fetchNews(), [])
  const posts = data?.posts ?? []

  const scrollerRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const updateScrollState = () => {
    const el = scrollerRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 8)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8)
  }

  useEffect(() => {
    updateScrollState()
  }, [posts])

  const scrollByCard = (direction) => {
    const el = scrollerRef.current
    if (!el) return
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: 'smooth' })
  }

  return (
    <section className="section bg-ink-50/70">
      <div className="shell">
        <SectionHeading
          title="Latest News & Insights"
          description="Events, achievements and announcements from across the departments."
        />

        {error ? (
          <ErrorState
            title="News could not be loaded"
            description="Our newsroom is temporarily unavailable. Please try again in a moment."
            action={
              <Button to="/blogs" variant="outline" icon>
                Go to the blog
              </Button>
            }
          />
        ) : !loading && !posts.length ? null : (
          <div className="relative mt-14">
            <motion.div
              ref={scrollerRef}
              onScroll={updateScrollState}
              variants={stagger(0.08)}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0"
            >
              {loading
                ? [0, 1, 2].map((key) => <NewsCardSkeleton key={key} />)
                : posts.map((post) => <NewsCard key={post._id} post={post} />)}
            </motion.div>

            {canScrollLeft ? (
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                aria-label="Show previous news"
                className="absolute left-0 top-[38%] hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-600 shadow-lift transition-all duration-300 hover:border-brand-300 hover:text-brand-600 sm:flex"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
              </button>
            ) : null}

            {canScrollRight ? (
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                aria-label="Show more news"
                className="absolute right-0 top-[38%] hidden h-11 w-11 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-600 shadow-lift transition-all duration-300 hover:border-brand-300 hover:text-brand-600 sm:flex"
              >
                <ChevronRight className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
              </button>
            ) : null}
          </div>
        )}
      </div>
    </section>
  )
}
