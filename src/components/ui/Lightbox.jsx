import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { ease } from '../../lib/motion'
import { useEscapeKey, useLockBodyScroll } from '../../lib/hooks'

/**
 * Shared image viewer used by the gallery page and the campus section.
 * Arrow keys step through the set; Escape or a click on the backdrop closes.
 */
export default function Lightbox({ items, index, onClose, onStep }) {
  const item = items[index]
  useLockBodyScroll(true)
  useEscapeKey(onClose)

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'ArrowRight') onStep(1)
      if (event.key === 'ArrowLeft') onStep(-1)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onStep])

  if (!item) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-950/92 p-4 backdrop-blur-sm sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close image viewer"
        className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-lg border border-white/15 text-white transition-colors hover:bg-white/10 sm:right-8 sm:top-8"
      >
        <X className="h-5 w-5" strokeWidth={1.7} />
      </button>

      {items.length > 1 ? (
        <>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              onStep(-1)
            }}
            aria-label="Previous image"
            className="absolute left-3 grid h-11 w-11 place-items-center rounded-lg border border-white/15 text-white transition-colors hover:bg-white/10 sm:left-8"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={1.7} />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              onStep(1)
            }}
            aria-label="Next image"
            className="absolute right-3 grid h-11 w-11 place-items-center rounded-lg border border-white/15 text-white transition-colors hover:bg-white/10 sm:right-8"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={1.7} />
          </button>
        </>
      ) : null}

      <motion.figure
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.35, ease }}
        className="max-h-full w-full max-w-4xl"
        onClick={(event) => event.stopPropagation()}
      >
        <img
          src={item.full ?? item.src}
          alt={item.alt}
          className="max-h-[76vh] w-full rounded-xl object-contain"
          decoding="async"
        />
        <figcaption className="mt-4 flex items-center justify-between gap-6 text-[13px] text-white/60">
          <span>{item.alt}</span>
          <span className="shrink-0 tabular-nums">
            {index + 1} / {items.length}
          </span>
        </figcaption>
      </motion.figure>
    </motion.div>
  )
}

/** Open/close/step state for a set of images. */
export function useLightbox(items) {
  const [index, setIndex] = useState(-1)

  const close = useCallback(() => setIndex(-1), [])
  const open = useCallback((next) => setIndex(next), [])
  const step = useCallback(
    (direction) => setIndex((current) => (current + direction + items.length) % items.length),
    [items.length],
  )

  const render = (
    <AnimatePresence>
      {index > -1 ? <Lightbox items={items} index={index} onClose={close} onStep={step} /> : null}
    </AnimatePresence>
  )

  return { index, open, close, step, render }
}
