import { motion } from 'framer-motion'
import Button from '../../ui/Button'
import FeatureCard from '../../ui/FeatureCard'
import { fadeUp, stagger, viewportOnce } from '../../../lib/motion'
import { whyChoose } from '../../../data/content'

export default function WhyChoose() {
  return (
    <section className="dark-section section relative overflow-hidden bg-ink-900">
      <div className="pointer-events-none absolute inset-0 grid-bg-dark opacity-40" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-48 top-0 h-[520px] w-[520px] rounded-full bg-brand-500/10 blur-[150px]"
        aria-hidden="true"
      />

      <div className="shell relative">
        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid gap-8 border-b border-white/10 pb-14 lg:grid-cols-12 lg:items-end"
        >
          <div className="lg:col-span-7">
            
            <motion.h2
              variants={fadeUp}
              className="display mt-6 text-[32px] text-white sm:text-[42px] lg:text-[52px]"
            >
              Why Students Choose ANR
            </motion.h2>
          </div>

          <motion.div variants={fadeUp} className="lg:col-span-5">
            <p className="text-[15px] leading-relaxed text-white/55">
              A college is judged by what its students become. Everything here the teaching, the facilities, the
              mentoring is arranged around that single measure.
            </p>
           
          </motion.div>
        </motion.div>

        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {whyChoose.map((feature) => (
            <FeatureCard key={feature.number} {...feature} tone="dark" />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
