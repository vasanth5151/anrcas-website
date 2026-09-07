import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useReducedMotion } from 'framer-motion'
import { fadeUp, stagger, viewportOnce } from '../../lib/motion'
import { cx } from '../../lib/cx'

/** Counts up once the number scrolls into view; static under reduced motion. */
export function Counter({ value, suffix = '', duration = 1.6, className }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduced = useReducedMotion()
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return undefined
    if (reduced) {
      setDisplay(value)
      return undefined
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    })
    return () => controls.stop()
  }, [inView, value, duration, reduced])

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  )
}

export default function Stats({ items, tone = 'light', columns = 4, className }) {
  const dark = tone === 'dark'

  return (
    <motion.dl
      variants={stagger(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={cx(
        'grid gap-px overflow-hidden rounded-2xl border',
        dark ? 'border-white/10 bg-white/10' : 'border-ink-100 bg-ink-100',
        columns === 4 ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-2 lg:grid-cols-3',
        className,
      )}
    >
      {items.map((item) => (
        <motion.div
          key={item.label}
          variants={fadeUp}
          className={cx('flex flex-col gap-1.5 px-5 py-7 sm:px-7 sm:py-9', dark ? 'bg-ink-900' : 'bg-white')}
        >
          <dd
            className={cx(
              'display text-[34px] leading-none sm:text-[42px]',
              dark ? 'text-white' : 'text-ink-900',
            )}
          >
            <Counter value={item.value} suffix={item.suffix} />
          </dd>
          <dt
            className={cx(
              'mt-2 text-[13px] font-semibold tracking-tight',
              dark ? 'text-brand-300' : 'text-brand-600',
            )}
          >
            {item.label}
          </dt>
          {item.caption ? (
            <p className={cx('text-[12.5px]', dark ? 'text-white/40' : 'text-ink-400')}>{item.caption}</p>
          ) : null}
        </motion.div>
      ))}
    </motion.dl>
  )
}
