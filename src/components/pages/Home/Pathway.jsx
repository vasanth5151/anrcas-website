import { useState } from 'react'
import { motion } from 'framer-motion'
import Icon from '../../ui/Icon'
import SectionHeading from '../../ui/SectionHeading'
import SmartImage from '../../ui/SmartImage'
import { fadeUp, slideInLeft, slideInRight, stagger, viewportOnce } from '../../../lib/motion'
import { pathway } from '../../../data/content'
import pathwayIllustration from '../../../assets/images/middle-image.webp'
import { cx } from '../../../lib/cx'

/**
 * Roadmap rather than a card grid: on desktop six steps orbit a central
 * visual; on mobile the same steps become a vertical timeline.
 */
export default function Pathway() {
  const [active, setActive] = useState(0)
  const left = pathway.slice(0, 3)
  const right = pathway.slice(3)

  return (
    <section className="section relative overflow-hidden bg-ink-50/70">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" aria-hidden="true" />

      <div className="shell relative">
        <SectionHeading
          title="Your Pathway to Success"
          description="Six connected stages that carry a student from the first orientation session to a signed offer letter."
          align="center"
          className="mx-auto"
        />

        {/* Desktop roadmap */}
        <div className="mt-20 hidden items-center gap-6 lg:grid lg:grid-cols-12">
          <motion.div
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="flex flex-col gap-5 lg:col-span-4"
          >
            {left.map((step, index) => (
              <PathwayNode
                key={step.number}
                step={step}
                align="right"
                variants={slideInLeft}
                active={active === index}
                onActivate={() => setActive(index)}
              />
            ))}
          </motion.div>

          <div className="lg:col-span-4">
            <CentreVisual step={pathway[active]} />
          </div>

          <motion.div
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="flex flex-col gap-5 lg:col-span-4"
          >
            {right.map((step, index) => (
              <PathwayNode
                key={step.number}
                step={step}
                align="left"
                variants={slideInRight}
                active={active === index + 3}
                onActivate={() => setActive(index + 3)}
              />
            ))}
          </motion.div>
        </div>

        {/* Mobile timeline */}
        <motion.ol
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="relative mt-14 flex flex-col gap-8 border-l border-ink-200 pl-8 lg:hidden"
        >
          {pathway.map((step) => (
            <motion.li key={step.number} variants={fadeUp} className="relative">
              <span
                className="absolute -left-[41px] top-1 grid h-6 w-6 place-items-center rounded-full border border-brand-200 bg-white text-[10px] font-semibold text-brand-600"
                aria-hidden="true"
              >
                {step.number}
              </span>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white text-brand-600 shadow-sm">
                  <Icon name={step.icon} className="h-[18px] w-[18px]" strokeWidth={1.6} />
                </span>
                <div>
                  <h3 className="text-[16px] font-semibold tracking-tight text-ink-900">{step.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-ink-500">{step.description}</p>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  )
}

function PathwayNode({ step, align, variants, active, onActivate }) {
  return (
    <motion.button
      type="button"
      variants={variants}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      aria-pressed={active}
      className={cx(
        'group relative rounded-2xl border bg-white/80 p-5 text-left backdrop-blur transition-all duration-500 ease-premium',
        active
          ? 'border-brand-300 shadow-lift'
          : 'border-ink-100 hover:border-brand-200 hover:shadow-card',
        align === 'right' ? 'lg:text-right' : 'lg:text-left',
      )}
    >
      <span
        className={cx(
          'pointer-events-none absolute top-1/2 hidden h-px w-6 bg-gradient-to-r transition-opacity duration-500 lg:block',
          align === 'right'
            ? '-right-6 from-brand-300 to-transparent'
            : '-left-6 from-transparent to-brand-300',
          active ? 'opacity-100' : 'opacity-30',
        )}
        aria-hidden="true"
      />

      <span className={cx('flex items-center gap-3', align === 'right' && 'lg:flex-row-reverse')}>
        <span
          className={cx(
            'grid h-9 w-9 shrink-0 place-items-center rounded-lg transition-colors duration-500',
            active ? 'bg-brand-500 text-white' : 'bg-brand-50 text-brand-600',
          )}
        >
          <Icon name={step.icon} className="h-4 w-4" strokeWidth={1.7} />
        </span>
        <span className="flex flex-col">
          <span className="text-[10.5px] font-semibold tracking-[0.18em] text-ink-300">{step.number}</span>
          <span className="text-[15.5px] font-semibold tracking-tight text-ink-900">{step.title}</span>
        </span>
      </span>

      <p className="mt-3 text-[13.5px] leading-relaxed text-ink-500">{step.description}</p>
    </motion.button>
  )
}

function CentreVisual({ step }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={viewportOnce}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto aspect-square w-full max-w-[380px]"
    >
      <div className="absolute inset-0 rounded-full border border-brand-200/70" aria-hidden="true" />
      <div className="absolute inset-[7%] rounded-full border border-dashed border-brand-300/60" aria-hidden="true" />
      <div
        className="absolute inset-[7%] animate-orbit rounded-full border-t-2 border-brand-500/70"
        aria-hidden="true"
      />
      <div className="absolute inset-[15%] grid place-items-center overflow-hidden rounded-full border-8 border-white bg-white shadow-lift">
        <SmartImage
          src={pathwayIllustration}
          alt="Illustration of a student climbing a stack of books"
          ratio="square"
          sizes="320px"
          className="h-full w-full bg-white"
          imgClassName="object-contain p-6"
        />
      </div>

      <div className="absolute inset-x-8 bottom-[9%] rounded-xl border border-ink-100 bg-white/95 px-4 py-3 text-center shadow-card backdrop-blur">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-600">
          Step {step.number}
        </p>
        <p className="mt-1 text-[16px] font-semibold leading-tight text-ink-900">{step.title}</p>
      </div>

      <span
        className="absolute -right-1 top-[18%] grid h-11 w-11 place-items-center rounded-xl border border-ink-100 bg-white text-brand-600 shadow-card"
        aria-hidden="true"
      >
        <Icon name="GraduationCap" className="h-5 w-5" strokeWidth={1.6} />
      </span>
      <span
        className="absolute -left-1 bottom-[22%] grid h-11 w-11 place-items-center rounded-xl border border-ink-100 bg-white text-brand-600 shadow-card"
        aria-hidden="true"
      >
        <Icon name="Target" className="h-5 w-5" strokeWidth={1.6} />
      </span>
    </motion.div>
  )
}
