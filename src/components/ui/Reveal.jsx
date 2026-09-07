import { motion } from 'framer-motion'
import { fadeUp, stagger, viewportOnce } from '../../lib/motion'

/**
 * Scroll-triggered wrapper. `Reveal` animates once; `RevealGroup` staggers its
 * `Reveal` children. Keeps `whileInView` boilerplate out of every section.
 */
export default function Reveal({
  children,
  variants = fadeUp,
  delay = 0,
  className,
  as = 'div',
  group = false,
  ...rest
}) {
  const Component = motion[as] ?? motion.div

  if (group) {
    return (
      <Component
        variants={variants}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className={className}
        {...rest}
      >
        {children}
      </Component>
    )
  }

  return (
    <Component
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={variants}
      transition={delay ? { delay } : undefined}
      className={className}
      {...rest}
    >
      {children}
    </Component>
  )
}

export function RevealGroup({ children, className, gap = 0.09, as = 'div', ...rest }) {
  const Component = motion[as] ?? motion.div
  return (
    <Component
      variants={stagger(gap)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={className}
      {...rest}
    >
      {children}
    </Component>
  )
}

export function RevealItem({ children, className, variants = fadeUp, as = 'div', ...rest }) {
  const Component = motion[as] ?? motion.div
  return (
    <Component variants={variants} className={className} {...rest}>
      {children}
    </Component>
  )
}
