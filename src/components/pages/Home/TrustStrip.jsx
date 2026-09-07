import { motion } from 'framer-motion'
import Icon from '../../ui/Icon'
import { fadeUp, stagger, viewportOnce } from '../../../lib/motion'
import { trustPoints } from '../../../data/content'

export default function TrustStrip() {
  return (
    <section id="trust" className="relative border-b border-ink-100 bg-white">
      <motion.ul
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="shell grid grid-cols-1 divide-y divide-ink-100 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x"
      >
        {trustPoints.map((point) => (
          <motion.li
            key={point.label}
            variants={fadeUp}
            className="group flex items-center gap-4 py-7 sm:py-8 lg:px-8 lg:first:pl-0 lg:last:pr-0"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 transition-colors duration-500 group-hover:bg-brand-500 group-hover:text-white">
              <Icon name={point.icon} className="h-5 w-5" strokeWidth={1.6} />
            </span>
            <span className="flex flex-col">
              <span className="text-[14.5px] font-semibold tracking-tight text-ink-900">{point.label}</span>
              <span className="mt-0.5 text-[12.5px] text-ink-400">{point.detail}</span>
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  )
}
