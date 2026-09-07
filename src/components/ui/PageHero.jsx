import { motion } from 'framer-motion'
import Breadcrumbs from './Breadcrumbs'
import SmartImage from './SmartImage'
import { ease, fadeUp, stagger } from '../../lib/motion'
import defaultHero from '../../assets/images/22.webp'
import { cx } from '../../lib/cx'

/**
 * Shared banner for every internal page: image, dark wash, title, lede,
 * breadcrumbs and an optional meta row.
 */
export default function PageHero({
  title,
  description,
  image = { src: defaultHero, alt: 'Students at work in the college computer laboratory' },
  trail = [],
  meta,
  children,
  align = 'left',
  className,
}) {
  return (
    <section
      className={cx(
        'dark-section relative isolate flex min-h-[52vh] items-end overflow-hidden bg-ink-900 pb-14 pt-[168px] sm:min-h-[58vh] sm:pb-16 lg:pt-[200px]',
        className,
      )}
    >
      <div className="absolute inset-0 -z-10">
        <SmartImage
          src={image.src}
          alt={image.alt}
          ratio="auto"
          priority
          className="h-full w-full"
          imgClassName="scale-105"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/50" />
        <div className="absolute inset-0 grid-bg-dark opacity-30" aria-hidden="true" />
      </div>

      <motion.div
        variants={stagger(0.08)}
        initial="hidden"
        animate="show"
        className={cx('shell relative', align === 'center' && 'flex flex-col items-center text-center')}
      >
        {trail.length ? (
          <motion.div variants={fadeUp}>
            <Breadcrumbs trail={trail} tone="dark" className="mb-7" />
          </motion.div>
        ) : null}

        <motion.h1
          variants={fadeUp}
          className="display max-w-4xl text-[36px] text-white sm:text-[48px] lg:text-[62px]"
        >
          {title}
        </motion.h1>

        {description ? (
          <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-[16px] leading-relaxed text-white/65 sm:text-lg">
            {description}
          </motion.p>
        ) : null}

        {children ? (
          <motion.div variants={fadeUp} transition={{ ease }} className="mt-9">
            {children}
          </motion.div>
        ) : null}
      </motion.div>
    </section>
  )
}
