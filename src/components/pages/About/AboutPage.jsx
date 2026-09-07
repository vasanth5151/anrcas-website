import { useState } from 'react'
import { motion } from 'framer-motion'
import Seo, { breadcrumbSchema } from '../../../lib/Seo'
import PageHero from '../../ui/PageHero'
import SectionHeading from '../../ui/SectionHeading'
import SmartImage from '../../ui/SmartImage'
import Button from '../../ui/Button'
import Icon from '../../ui/Icon'
import FAQ from '../../ui/FAQ'
import { fadeUp, imageReveal, stagger, viewportOnce } from '../../../lib/motion'
import {
  admissionProcedureNote,
  authorities,
  collegeRules,
  founders,
  trustFounders,
  trustHistory,
  trustInstitutions,
  visionMissionGoals,
} from '../../../data/about'
import aboutPrimary from '../../../assets/images/22.webp'
import aboutSecondary from '../../../assets/images/17.webp'
import { site } from '../../../data/site'
import { cx } from '../../../lib/cx'

const trail = [{ label: 'About Us', href: '/about' }]

export default function AboutPage() {
  return (
    <>
      <Seo
        title="About the Institution"
        description="A.N. Radhakrishnan College of Arts and Science, Vadamavandal, our founders, authorities, vision and mission, the Meenakshi Group of Institutions and the college regulations."
        schema={breadcrumbSchema(trail)}
      />

      <PageHero
        title="About Us"
        description="A.N. Radhakrishnan College of Arts and Science, Vadamavandal, founded so that a degree does not depend on how far a student can afford to travel."
        trail={trail}
        image={{ src: aboutPrimary, alt: 'Faculty and students during a computer laboratory session' }}
        meta={[
          { label: 'Established', value: site.established },
          { label: 'Affiliation', value: 'Thiruvalluvar University' },
          { label: 'Approval', value: 'Government of Tamil Nadu' },
        ]}
      />

      <Founders />
      <AboutCollege />
      <Authorities />
      <AdmissionProcedure />
      <VisionMissionGoals />
      <GroupOfInstitutions />
      <RulesAndRegulations />
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Portrait, photograph if the college has supplied one, else a monogram */
/* ------------------------------------------------------------------ */

function initialsOf(name) {
  return name
    .replace(/(Late|Shri|Smt\.?|Mrs\.?|Mr\.?|Dr\.?|Prof\.?)/g, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase()
}

function Portrait({ name, photo, className, tone = 'light' }) {
  if (photo) {
    return (
      <img
        src={photo}
        alt={name}
        loading="lazy"
        decoding="async"
        className={cx('h-full w-full object-cover object-top', className)}
      />
    )
  }

  return (
    <span
      className={cx(
        'grid h-full w-full place-items-center text-[28px] font-semibold tracking-tight',
        tone === 'dark' ? 'bg-white/[0.06] text-white/70' : 'bg-brand-50 text-brand-500',
        className,
      )}
      aria-hidden="true"
    >
      {initialsOf(name)}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/* Founders                                                            */
/* ------------------------------------------------------------------ */

function Founders() {
  return (
    <section className="section bg-white">
      <div className="shell">
        <SectionHeading
          title="Our beloved founders"
          description="The trust that built this college, and the family that still runs it."
          align="center"
        />

        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 grid gap-7 md:grid-cols-3"
        >
          {founders.map((person) => (
            <motion.article
              key={person.name}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-[24px] border border-ink-100 bg-white p-8 text-center transition-all duration-500 ease-premium hover:-translate-y-1.5 hover:border-brand-300 hover:shadow-lift"
            >
              <span
                className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-brand-50 to-transparent"
                aria-hidden="true"
              />

              <div className="relative mx-auto h-[200px] w-[200px] overflow-hidden rounded-full ring-4 ring-white shadow-card sm:h-[224px] sm:w-[224px]">
                <Portrait name={person.name} photo={person.photo} />
              </div>

              <h3 className="relative mt-7 text-[18px] font-semibold leading-snug tracking-tight text-ink-900 sm:text-[19px]">
                {person.name}
              </h3>
              <p className="relative mt-3 inline-flex rounded-full bg-brand-50 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-600">
                {person.role}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* About the college                                                   */
/* ------------------------------------------------------------------ */

function AboutCollege() {
  return (
    <section className="section bg-ink-50/70">
      <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-16">
        <motion.div
          variants={stagger(0.09)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="lg:col-span-6"
        >
          <motion.h2 variants={fadeUp} className="display text-[28px] sm:text-[36px] lg:text-[42px]">
            About ANR College of Arts &amp; Science
            <span className="mt-2 block text-[18px] font-medium tracking-tight text-brand-600 sm:text-[20px]">
              Vadamavandal, Thiruvannamalai
            </span>
          </motion.h2>

          <motion.p variants={fadeUp} className="lead mt-7">
            ANR College of Arts and Science was established in the year 2022, located at Vadamavandal near
            Vembakkam, 15 kms from Kanchipuram city, on a sprawling 10-acre campus, by a socially conscious eminent
            personality with a service motive, who named the college in honour of A.N. Radhakrishnan, the then
            Chairman of the Institution.
          </motion.p>

          <motion.p variants={fadeUp} className="mt-5 text-[15px] leading-relaxed text-ink-500">
            The college began by offering a three-year Bachelor’s degree programme, and currently offers
            undergraduate courses in five different disciplines, with plans to introduce PG courses in future. All
            courses are of three-year duration and follow a semester pattern in accordance with the guidelines of
            Thiruvalluvar University, which conducts the semester-end theory and practical examinations and issues
            the degrees.
          </motion.p>

          <motion.p variants={fadeUp} className="mt-5 text-[15px] leading-relaxed text-ink-500">
            The undergraduate programme is divided into two divisions for academic functions: Commerce &amp;
            Management, covering B.Com, B.Com (CS) and BBA; and Arts &amp; Sciences, covering B.Sc. (CS) and B.Sc.
            (Mathematics). The college has excellent infrastructure and state-of-the-art equipment in its
            laboratories, alongside seminar halls, libraries and playfields, and places strong emphasis on sports,
            NCC and NSS. Its Skill Development Centre trains students in the social and employable skills needed
            for placements and competitive exams, and the college is working towards offering placement services to
            students.
          </motion.p>

        </motion.div>

        <motion.div
          variants={imageReveal}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="lg:col-span-6 lg:col-start-7"
        >
          <SmartImage
            src={aboutSecondary}
            alt="Inauguration of a college programme by the management and faculty"
            ratio="portrait"
            className="rounded-[24px] border border-ink-100 shadow-card"
            sizes="(max-width: 1024px) 92vw, 620px"
          />
        </motion.div>
      </div>
    </section>
  )
}


/* ------------------------------------------------------------------ */
/* Authorities                                                         */
/* ------------------------------------------------------------------ */

function Authorities() {
  return (
    <section className="dark-section section relative overflow-hidden bg-ink-900">
      <div className="pointer-events-none absolute inset-0 grid-bg-dark opacity-40" aria-hidden="true" />

      <div className="shell relative">
        <SectionHeading
          title="Messages from the authorities"
          description="The people who carry responsibility for this college, in their own words."
          tone="dark"
          align="center"
        />

        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 flex flex-col gap-6"
        >
          {authorities.map((person, index) => (
            <motion.article
              key={person.name}
              variants={fadeUp}
              className="grid gap-8 rounded-[26px] border border-white/10 bg-white/[0.035] p-7 transition-colors duration-500 hover:border-brand-400/40 sm:p-9 lg:grid-cols-12 lg:gap-12"
            >
              {/* Identity rail, alternates side so the column does not read as a list. */}
              <div className={cx('lg:col-span-3', index % 2 ? 'lg:order-2' : 'lg:order-1')}>
                <div className="flex items-center gap-4 lg:flex-col lg:items-start">
                  <div className="h-[120px] w-[120px] shrink-0 overflow-hidden rounded-2xl ring-1 ring-white/15 lg:h-[200px] lg:w-[200px]">
                    <Portrait name={person.name} photo={person.photo} tone="dark" />
                  </div>
                  <div className="lg:mt-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-300">
                      {person.role}
                    </p>
                    <h3 className="mt-2 text-[20px] font-semibold tracking-tight text-white">{person.name}</h3>
                  </div>
                </div>
              </div>

              <div className={cx('lg:col-span-9', index % 2 ? 'lg:order-1' : 'lg:order-2')}>
                <Icon name="Quote" className="h-7 w-7 text-brand-400/60" strokeWidth={1.5} aria-hidden="true" />
                <p className="mt-4 text-[15px] font-medium text-white">{person.salutation}</p>
                {person.message.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="mt-4 text-[14.5px] leading-relaxed text-white/55">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Admission procedure                                                 */
/* ------------------------------------------------------------------ */

function AdmissionProcedure() {
  return (
    <section className="section bg-white">
      <div className="shell max-w-4xl">
        <SectionHeading title="Admission procedure" align="center" />
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-8 text-center text-[15px] leading-relaxed text-ink-500"
        >
          {admissionProcedureNote}
        </motion.p>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Vision, mission and goals                                           */
/* ------------------------------------------------------------------ */

function VisionMissionGoals() {
  const [active, setActive] = useState(visionMissionGoals[0].key)
  const panel = visionMissionGoals.find((item) => item.key === active) ?? visionMissionGoals[0]

  return (
    <section className="section relative overflow-hidden bg-ink-50/70">
      <div
        className="pointer-events-none absolute -right-40 top-1/4 h-[420px] w-[420px] rounded-full bg-brand-100/60 blur-[130px]"
        aria-hidden="true"
      />

      <div className="shell relative">
        <SectionHeading
          title="Vision, mission and goals"
          description="Three commitments that decide how we teach, who we admit and what we measure ourselves against."
          align="center"
        />

        <div className="mx-auto mt-12 max-w-4xl">
          {/* Segmented control instead of a stacked accordion. */}
          <div
            role="tablist"
            aria-label="Vision, mission and goals"
            className="mx-auto flex w-full max-w-md gap-1 rounded-full border border-ink-100 bg-white p-1.5 shadow-card"
          >
            {visionMissionGoals.map((item) => (
              <button
                key={item.key}
                type="button"
                role="tab"
                id={`vmg-tab-${item.key}`}
                aria-selected={active === item.key}
                aria-controls={`vmg-panel-${item.key}`}
                onClick={() => setActive(item.key)}
                className={cx(
                  'flex-1 rounded-full px-4 py-2.5 text-[13px] font-semibold tracking-tight transition-all duration-300 ease-premium',
                  active === item.key
                    ? 'bg-brand-500 text-white shadow-[0_10px_24px_-12px_rgba(23,155,215,.9)]'
                    : 'text-ink-500 hover:text-brand-600',
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          <motion.div
            key={panel.key}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            role="tabpanel"
            id={`vmg-panel-${panel.key}`}
            aria-labelledby={`vmg-tab-${panel.key}`}
            className="mt-8 rounded-[26px] border border-ink-100 bg-white p-8 shadow-card sm:p-10"
          >
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-500 text-white">
              <Icon name={panel.icon} className="h-5 w-5" strokeWidth={1.7} />
            </span>
            <h3 className="mt-6 text-[22px] font-semibold tracking-tight text-ink-900">{panel.label}</h3>
            <p className="mt-3 text-[15.5px] leading-relaxed text-ink-500">{panel.body}</p>

            <ul className="mt-7 grid gap-3 border-t border-ink-100 pt-7 sm:grid-cols-3">
              {panel.points.map((point) => (
                <li key={point} className="flex gap-2.5 text-[13.5px] leading-relaxed text-ink-600">
                  <Icon
                    name="CheckCircle2"
                    className="mt-0.5 h-4 w-4 shrink-0 text-brand-500"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Meenakshi Group of Institutions                                     */
/* ------------------------------------------------------------------ */

function GroupOfInstitutions() {
  return (
    <section className="section bg-white">
      <div className="shell">
        <SectionHeading
          title="About the trust"
          description="Meenakshi Ammal Trust"
          align="center"
        />

        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mx-auto mt-10 flex max-w-3xl flex-col gap-5"
        >
          {trustHistory.map((paragraph) => (
            <motion.p
              key={paragraph.slice(0, 40)}
              variants={fadeUp}
              className="text-[15px] leading-relaxed text-ink-500"
            >
              {paragraph}
            </motion.p>
          ))}

          <motion.ul variants={fadeUp} className="mt-2 grid gap-2 border-t border-ink-100 pt-6 sm:grid-cols-2">
            {trustFounders.map((person) => (
              <li key={person.name} className="text-[13.5px] leading-relaxed text-ink-600">
                <span className="font-semibold text-ink-900">{person.name}</span> &mdash; {person.role}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <SectionHeading
          title="Meenakshi Group of Institutions"
          description="This college is one of fourteen institutions run by the trust across Kanchipuram, Chennai and Tiruvannamalai."
          align="center"
          className="mt-16"
        />

        <motion.div
          variants={stagger(0.05)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {trustInstitutions.map((institution) => (
            <motion.article
              key={institution.name + institution.year}
              variants={fadeUp}
              className="group flex min-h-[232px] flex-col items-center justify-between rounded-2xl border-2 border-dashed border-brand-300/60 bg-white p-6 text-center shadow-sm transition-all duration-500 ease-premium hover:-translate-y-1 hover:border-brand-500 hover:shadow-lift"
            >
              <div className="mb-3 flex h-16 w-16 items-center justify-center">
                <img
                  src={institution.logo}
                  alt={institution.name}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-contain transition-transform duration-500 ease-premium group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col justify-center">
                <p className="text-[15px] font-bold tracking-tight text-brand-600">Since {institution.year}</p>
                <p className="mt-1.5 text-[12.5px] font-semibold leading-snug text-ink-900">{institution.name}</p>
                <p className="mt-1 text-[11.5px] leading-snug text-ink-400">{institution.place}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Rules and regulations                                               */
/* ------------------------------------------------------------------ */

function RulesAndRegulations() {
  const items = collegeRules.map((rule) => ({ question: rule.title, answer: rule.detail }))

  return (
    <section className="section bg-ink-50/70">
      <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            title="Rules and regulations"
            description="The standards every student accepts on the day they join the college. The full handbook is issued at admission."
          />

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <Button to="/admission" variant="dark" icon>
              Admission procedure
            </Button>
            <Button to="/contact" variant="outline" icon>
              Contact the office
            </Button>
          </motion.div>
        </div>

        <div className="lg:col-span-7">
          <FAQ items={items} defaultOpen={-1} />
        </div>
      </div>
    </section>
  )
}
