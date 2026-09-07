/**
 * Shared Framer Motion vocabulary.
 *
 * Durations sit between 0.4s and 0.8s and every scroll-triggered variant uses
 * `viewportOnce` so sections animate a single time. Reduced motion is honoured
 * globally by <MotionConfig reducedMotion="user"> in App.jsx.
 */
export const ease = [0.22, 1, 0.36, 1]

export const viewportOnce = { once: true, amount: 0.25, margin: '0px 0px -80px 0px' }

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease } },
}

export const slideInLeft = {
  hidden: { opacity: 0, x: -36 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease } },
}

export const slideInRight = {
  hidden: { opacity: 0, x: 36 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease } },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease } },
}

export const imageReveal = {
  hidden: { opacity: 0, scale: 1.06, y: 18 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease } },
}

export const stagger = (staggerChildren = 0.09, delayChildren = 0.04) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
})

/** Word-by-word headline reveal. Use with <motion.span variants={wordChild}>. */
export const wordParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.06 } },
}

export const wordChild = {
  hidden: { opacity: 0, y: '0.6em' },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
}

export const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.25, ease } },
}
