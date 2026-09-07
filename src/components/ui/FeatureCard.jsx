import { motion } from 'framer-motion'
import Icon from './Icon'
import { fadeUp } from '../../lib/motion'
import { cx } from '../../lib/cx'

/**
 * Numbered feature block. `tone="dark"` is used by the Why Choose ANR section;
 * the light tone is reused on the academics and facilities pages.
 */
export default function FeatureCard({ number, icon, title, description, tone = 'dark', className }) {
  const dark = tone === 'dark'

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cx(
        'group relative flex h-full flex-col overflow-hidden rounded-2xl border p-7 transition-colors duration-500 sm:p-8',
        dark
          ? 'border-white/10 bg-white/[0.03] hover:border-brand-400/45 hover:bg-white/[0.055]'
          : 'border-ink-100 bg-white hover:border-brand-300',
        className,
      )}
    >
      <span
        className={cx(
          'pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full blur-3xl transition-opacity duration-700',
          dark ? 'bg-brand-500/25 opacity-0 group-hover:opacity-100' : 'bg-brand-200/50 opacity-0 group-hover:opacity-100',
        )}
        aria-hidden="true"
      />

      <div className="relative flex items-start justify-between gap-4">
        <span
          className={cx(
            'grid h-11 w-11 place-items-center rounded-xl transition-colors duration-500',
            dark
              ? 'bg-brand-500/12 text-brand-300 group-hover:bg-brand-500/20'
              : 'bg-brand-50 text-brand-600 group-hover:bg-brand-100',
          )}
        >
          <Icon name={icon} className="h-5 w-5" strokeWidth={1.6} />
        </span>

        {number ? (
          <span
            className={cx(
              'font-semibold tracking-tight',
              dark ? 'text-[38px] text-white/12' : 'text-[38px] text-ink-100',
            )}
            aria-hidden="true"
          >
            {number}
          </span>
        ) : null}
      </div>

      <h3
        className={cx(
          'relative mt-7 text-[18px] font-semibold tracking-tight',
          dark ? 'text-white' : 'text-ink-900',
        )}
      >
        {title}
      </h3>
      <p className={cx('relative mt-3 text-[14px] leading-relaxed', dark ? 'text-white/55' : 'text-ink-500')}>
        {description}
      </p>

      <span
        className={cx(
          'absolute inset-x-0 bottom-0 h-px w-0 transition-all duration-700 ease-premium group-hover:w-full',
          dark ? 'bg-gradient-to-r from-brand-400 to-transparent' : 'bg-brand-500',
        )}
        aria-hidden="true"
      />
    </motion.div>
  )
}
