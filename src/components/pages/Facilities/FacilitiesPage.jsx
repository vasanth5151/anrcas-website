import { motion } from 'framer-motion'
import { Check, ZoomIn } from 'lucide-react'
import Seo, { breadcrumbSchema } from '../../../lib/Seo'
import PageHero from '../../ui/PageHero'
import SmartImage from '../../ui/SmartImage'
import Button from '../../ui/Button'
import Icon from '../../ui/Icon'
import { useLightbox } from '../../ui/Lightbox'
import { fadeUp, stagger, viewportOnce } from '../../../lib/motion'
import { facilities } from '../../../data/facilities'
import { cx } from '../../../lib/cx'

const trail = [{ label: 'Facilities', href: '/facilities' }]

const photoCount = facilities.reduce((total, facility) => total + facility.photos.length, 0)

export default function FacilitiesPage() {
  return (
    <>
      <Seo
        title="Facilities"
        description="Facilities and infrastructure at A.N. Radhakrishnan College of Arts and Science, Vadamavandal, classrooms, hostel, computer laboratory, library, sports, transport, dining hall, reception and campus temple."
        schema={breadcrumbSchema(trail)}
      />

      <PageHero
        title="Facilities"
        description="Everything the academic day needs, on one campus, from the reading hall in the morning to the transport that takes students home."
        trail={trail}
        image={facilities[0].photos[0]}
        meta={[
          { label: 'Facilities', value: `${facilities.length} on campus` },
          { label: 'Photographs', value: `${photoCount}` },
          { label: 'Campus', value: 'Vadamavandal' },
        ]}
      />

      {/* Title + jump index */}
      <section className="relative overflow-hidden border-b border-ink-100 bg-white pb-12 pt-20 sm:pt-24">
        <div
          className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-brand-100/50 blur-[130px]"
          aria-hidden="true"
        />

        <div className="shell relative">
          <motion.div
            variants={stagger(0.09)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="max-w-3xl"
          >
            <motion.h2 variants={fadeUp} className="display text-[30px] sm:text-[38px] lg:text-[44px]">
              Facilities &amp; Infrastructure
              <span className="mt-2 block text-brand-600">ANR College of Arts &amp; Science, Vadamavandal</span>
            </motion.h2>
          </motion.div>

          <motion.ul
            variants={stagger(0.04)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-10 flex flex-wrap gap-2.5"
          >
            {facilities.map((facility) => (
              <motion.li key={facility.slug} variants={fadeUp}>
                <a
                  href={`#${facility.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-4 py-2.5 text-[13px] font-medium text-ink-600 transition-all duration-300 hover:border-brand-400 hover:bg-brand-50 hover:text-brand-600"
                >
                  <Icon name={facility.icon} className="h-4 w-4 text-brand-500" strokeWidth={1.7} aria-hidden="true" />
                  {facility.name}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {facilities.map((facility, index) => (
        <FacilityBlock key={facility.slug} facility={facility} flipped={index % 2 === 1} />
      ))}

      <section className="section bg-white">
        <div className="shell">
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-ink-100 bg-ink-50/70 px-8 py-10 text-center">
            <h3 className="text-[22px] font-semibold tracking-tight text-ink-900">Come and see the campus</h3>
            <p className="max-w-xl text-[14.5px] text-ink-500">
              Photographs only go so far. The college office will arrange a visit on any working day.
            </p>
            <div className="mt-2 flex flex-wrap justify-center gap-3">
              <Button to="/admission" variant="primary" icon>
                Admission enquiry
              </Button>
              <Button to="/contact" variant="outline">
                Contact the office
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

/**
 * One facility: the write-up on one side, its photographs on the other, with
 * the sides alternating down the page so the sections do not read as a list.
 */
function FacilityBlock({ facility, flipped }) {
  const lightbox = useLightbox(facility.photos)
  const [lead, ...rest] = facility.photos

  return (
    <section
      id={facility.slug}
      className={cx('section scroll-mt-32', flipped ? 'bg-ink-50/70' : 'bg-white')}
    >
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Write-up */}
        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className={cx('lg:col-span-4', flipped ? 'lg:order-2 lg:col-start-9' : 'lg:order-1')}
        >
          <motion.span
            variants={fadeUp}
            className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-500 text-white shadow-[0_14px_30px_-16px_rgba(23,155,215,.95)]"
          >
            <Icon name={facility.icon} className="h-6 w-6" strokeWidth={1.5} />
          </motion.span>

          <motion.h2 variants={fadeUp} className="display mt-6 text-[26px] sm:text-[32px]">
            {facility.name}
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-[15px] leading-relaxed text-ink-500">
            {facility.description}
          </motion.p>

          <motion.ul variants={stagger(0.05)} className="mt-7 flex flex-col gap-2.5">
            {facility.points.map((point) => (
              <motion.li key={point} variants={fadeUp} className="flex gap-3">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-500 text-white">
                  <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                </span>
                <span className="text-[13.5px] leading-relaxed text-ink-600">{point}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Photographs: one lead frame, the rest in a grid beneath it. */}
        <motion.div
          variants={stagger(0.05)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className={cx('lg:col-span-7', flipped ? 'lg:order-1 lg:col-start-1' : 'lg:order-2 lg:col-start-6')}
        >
          <motion.div variants={fadeUp}>
            <PhotoButton photo={lead} onOpen={() => lightbox.open(0)} className="w-full" />
          </motion.div>

          {rest.length ? (
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {rest.map((photo, index) => (
                <motion.div key={photo.id} variants={fadeUp}>
                  <PhotoButton photo={photo} onOpen={() => lightbox.open(index + 1)} />
                </motion.div>
              ))}
            </div>
          ) : null}
        </motion.div>
      </div>

      {lightbox.render}
    </section>
  )
}

function PhotoButton({ photo, onOpen, className }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`View photograph: ${photo.alt}`}
      className={cx(
        'group relative block w-full overflow-hidden rounded-2xl border border-ink-100 bg-ink-50 text-left',
        className,
      )}
    >
      <SmartImage
        src={photo.src}
        alt={photo.alt}
        ratio="natural"
        imgClassName="transition-transform duration-[900ms] ease-premium group-hover:scale-[1.06]"
        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
      />
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <span className="pointer-events-none absolute bottom-3 right-3 grid h-8 w-8 translate-y-2 place-items-center rounded-lg bg-white/20 text-white opacity-0 backdrop-blur transition-all duration-500 ease-premium group-hover:translate-y-0 group-hover:opacity-100">
        <ZoomIn className="h-4 w-4" strokeWidth={1.8} />
      </span>
    </button>
  )
}
