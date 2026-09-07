import { useState } from 'react'
import { motion } from 'framer-motion'
import Button from '../../ui/Button'
import ProgrammeCard from '../../ui/ProgrammeCard'
import SectionHeading from '../../ui/SectionHeading'
import { fadeUp, stagger, viewportOnce } from '../../../lib/motion'
import { categories, programmes } from '../../../data/programmes'
import { cx } from '../../../lib/cx'

const filters = ['All', ...categories.map((category) => category.label)]

export default function ProgrammesShowcase() {
  const [active, setActive] = useState('All')

  const visible =
    active === 'All'
      ? programmes
      : programmes.filter((programme) => programme.category === active.toLowerCase())

  return (
    <section className="section bg-white">
      <div className="shell">
        <SectionHeading
          title="Explore Our Programmes"
          description="Choose a programme that prepares you for tomorrow, across science, commerce, management and languages."
          action={
            <Button to="/programmes" variant="outline" size="md" icon>
              View all programmes
            </Button>
          }
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="no-scrollbar -mx-5 mt-12 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0"
        >
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
              aria-pressed={active === filter}
              className={cx(
                'shrink-0 rounded-lg border px-4 py-2 text-[13px] font-medium transition-all duration-300',
                active === filter
                  ? 'border-brand-500 bg-brand-500 text-white shadow-[0_10px_24px_-14px_rgba(23,155,215,.9)]'
                  : 'border-ink-200 bg-white text-ink-600 hover:border-brand-300 hover:text-brand-600',
              )}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        <motion.div
          key={active}
          variants={stagger(0.07)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="no-scrollbar -mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3"
        >
          {visible.map((programme) => (
            <motion.div
              key={programme.slug}
              variants={fadeUp}
              className="w-[80vw] shrink-0 snap-start sm:w-auto sm:shrink"
            >
              <ProgrammeCard programme={programme} />
            </motion.div>
          ))}
        </motion.div>

        <p className="mt-6 text-[12.5px] text-ink-400 sm:hidden">Swipe to see more programmes →</p>
      </div>
    </section>
  )
}
