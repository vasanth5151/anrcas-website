import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ZoomIn } from 'lucide-react'
import SmartImage from './SmartImage'
import { useLightbox } from './Lightbox'
import { fadeUp, stagger, viewportOnce } from '../../lib/motion'
import { cx } from '../../lib/cx'

const ratioClass = {
  tall: 'aspect-[4/5]',
  wide: 'aspect-[16/11]',
  square: 'aspect-square',
  // `natural` lets each photograph keep its own proportions in the masonry.
  natural: '',
}

/** Masonry gallery with category filters and a keyboard-navigable lightbox. */
export default function GalleryGrid({ items, filters, className }) {
  const [active, setActive] = useState(filters?.[0] ?? 'All')

  const visible = useMemo(
    () => (active === 'All' ? items : items.filter((item) => item.category === active)),
    [items, active],
  )

  const lightbox = useLightbox(visible)

  return (
    <div className={className}>
      {filters?.length ? (
        <div className="no-scrollbar -mx-5 mb-10 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => {
                setActive(filter)
                lightbox.close()
              }}
              aria-pressed={active === filter}
              className={cx(
                'shrink-0 rounded-lg border px-4 py-2 text-[13px] font-medium transition-all duration-300',
                active === filter
                  ? 'border-brand-500 bg-brand-500 text-white shadow-[0_10px_24px_-14px_rgba(23,155,215,.9)]'
                  : 'border-ink-200 bg-white text-ink-600 hover:border-brand-300 hover:text-brand-600',
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      ) : null}

      <motion.div
        key={active}
        variants={stagger(0.05)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4 [&>*]:mb-4"
      >
        {visible.map((item, index) => (
          <motion.button
            key={item.id}
            variants={fadeUp}
            type="button"
            onClick={() => lightbox.open(index)}
            className="group relative block w-full break-inside-avoid overflow-hidden rounded-2xl border border-ink-100 bg-ink-50 text-left"
            aria-label={`View image: ${item.alt}`}
          >
            <SmartImage
              src={item.src}
              alt={item.alt}
              ratio={item.ratio === 'natural' ? 'natural' : 'auto'}
              className={cx('w-full', ratioClass[item.ratio] ?? ratioClass.wide)}
              imgClassName="transition-transform duration-[900ms] ease-premium group-hover:scale-[1.06]"
              sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
            />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/75 via-ink-950/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <span className="pointer-events-none absolute inset-x-4 bottom-4 flex translate-y-2 items-end justify-between gap-3 opacity-0 transition-all duration-500 ease-premium group-hover:translate-y-0 group-hover:opacity-100">
              {/* Only captioned frames print their text; the rest just show the zoom cue. */}
              {item.caption ? (
                <span className="text-[13px] font-medium leading-snug text-white">{item.caption}</span>
              ) : (
                <span />
              )}
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/15 text-white backdrop-blur">
                <ZoomIn className="h-4 w-4" strokeWidth={1.8} />
              </span>
            </span>
          </motion.button>
        ))}
      </motion.div>

      {visible.length === 0 ? (
        <p className="py-20 text-center text-sm text-ink-400">No photographs in this category yet.</p>
      ) : null}

      {lightbox.render}
    </div>
  )
}
