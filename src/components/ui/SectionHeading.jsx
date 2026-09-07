import { motion } from 'framer-motion'
import { fadeUp, stagger, viewportOnce } from '../../lib/motion'
import { cx } from '../../lib/cx'

/**
 * Section header used across every page. `align` and `tone` keep the light and
 * dark sections visually consistent without duplicating markup.
 */
export default function SectionHeading({
  title,
  description,
  align = 'left',
  tone = 'light',
  size = 'md',
  className,
  action,
  as: Heading = 'h2',
}) {
  const dark = tone === 'dark'

  return (
    <motion.div
      variants={stagger(0.08)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={cx(
        'flex w-full gap-8',
        align === 'center'
          ? 'flex-col items-center text-center'
          : action
            ? 'flex-col items-start justify-between gap-6 md:flex-row md:items-end'
            : 'flex-col items-start',
        className,
      )}
    >
      <div className={cx('max-w-2xl', align === 'center' && 'flex flex-col items-center')}>
        <motion.div variants={fadeUp}>
          <Heading
            className={cx(
              'display',
              size === 'lg'
                ? 'text-[34px] sm:text-5xl lg:text-[56px]'
                : 'text-[30px] sm:text-[38px] lg:text-[46px]',
              dark && 'text-white',
            )}
          >
            {title}
          </Heading>
        </motion.div>

        {description ? (
          <motion.p
            variants={fadeUp}
            className={cx('lead mt-5', dark && 'text-white/60', align === 'center' && 'mx-auto')}
          >
            {description}
          </motion.p>
        ) : null}
      </div>

      {action ? (
        <motion.div variants={fadeUp} className="shrink-0">
          {action}
        </motion.div>
      ) : null}
    </motion.div>
  )
}
