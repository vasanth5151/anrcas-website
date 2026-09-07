import { Link } from 'react-router-dom'
import { ArrowUpRight, CalendarDays } from 'lucide-react'
import SmartImage from './SmartImage'
import { formatDate } from '../../lib/sanity/useSanity'
import { urlForImage } from '../../lib/sanity/image'
import blogFallback from '../../assets/images/17.webp'
import { cx } from '../../lib/cx'

export default function BlogCard({ post, variant = 'default', className }) {
  const image = urlForImage(post.mainImage, { width: variant === 'featured' ? 1200 : 800 })
  const alt = post.mainImage?.alt || post.title
  const featured = variant === 'featured'

  return (
    <article
      className={cx(
        'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white transition-all duration-500 ease-premium hover:-translate-y-1 hover:border-brand-300 hover:shadow-lift',
        className,
      )}
    >
      <SmartImage
        src={image || blogFallback}
        alt={alt}
        ratio={featured ? 'video' : 'wide'}
        imgClassName="transition-transform duration-[900ms] ease-premium group-hover:scale-[1.06]"
        sizes="(max-width: 768px) 90vw, (max-width: 1280px) 45vw, 400px"
      >
        {post.category ? (
          <span className="absolute left-4 top-4 rounded-md bg-brand-500 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white">
            {post.category}
          </span>
        ) : null}
      </SmartImage>

      <div className={cx('flex flex-1 flex-col p-6', featured && 'sm:p-8')}>
        <div className="flex items-center gap-2 text-[12px] font-medium text-ink-400">
          <CalendarDays className="h-3.5 w-3.5 text-brand-500" strokeWidth={1.8} aria-hidden="true" />
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        </div>

        <h3
          className={cx(
            'mt-3 font-semibold leading-snug tracking-tight text-ink-900 transition-colors duration-300 group-hover:text-brand-600',
            featured ? 'text-[24px] sm:text-[28px]' : 'text-[18px]',
          )}
        >
          <Link to={`/blogs/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>

        {post.excerpt ? (
          <p
            className={cx(
              'mt-3 flex-1 leading-relaxed text-ink-500',
              featured ? 'text-[15px]' : 'text-[14px] line-clamp-3',
            )}
          >
            {post.excerpt}
          </p>
        ) : null}

        <span className="mt-6 inline-flex items-center gap-2 text-[13.5px] font-medium text-brand-600">
          Read More
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={1.8}
            aria-hidden="true"
          />
        </span>
      </div>
    </article>
  )
}
