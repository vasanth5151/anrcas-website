import { motion } from 'framer-motion'
import Seo from '../../lib/Seo'
import Button from '../ui/Button'
import { fadeUp, stagger } from '../../lib/motion'

const suggestions = [
  { label: 'Programmes', href: '/programmes' },
  { label: 'Admission', href: '/admission' },
  { label: 'Facilities', href: '/facilities' },
  { label: 'Contact', href: '/contact' },
]

export default function NotFoundPage() {
  return (
    <>
      <Seo title="Page not found" noindex />

      <section className="dark-section relative flex min-h-[80vh] items-center overflow-hidden bg-ink-950 pt-32">
        <div className="pointer-events-none absolute inset-0 grid-bg-dark opacity-40" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -left-32 top-1/4 h-[420px] w-[420px] rounded-full bg-brand-600/20 blur-[130px]"
          aria-hidden="true"
        />

        <motion.div variants={stagger(0.09)} initial="hidden" animate="show" className="shell relative max-w-2xl">
          <motion.h1 variants={fadeUp} className="display text-[44px] text-white sm:text-[64px]">
            This page has moved on.
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 text-[16px] leading-relaxed text-white/60">
            The page you were looking for is not here. Try one of the sections below, or return to the homepage.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-3">
            <Button to="/" size="lg" variant="primary" icon>
              Back to home
            </Button>
            {suggestions.map((item) => (
              <Button key={item.href} to={item.href} size="lg" variant="light">
                {item.label}
              </Button>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </>
  )
}
