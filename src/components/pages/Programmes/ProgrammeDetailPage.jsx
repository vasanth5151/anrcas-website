import { Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import Seo from '../../../lib/Seo'
import PageHero from '../../ui/PageHero'
import DepartmentSections from './DepartmentSections'
import SectionHeading from '../../ui/SectionHeading'
import SmartImage from '../../ui/SmartImage'
import Button from '../../ui/Button'
import Icon from '../../ui/Icon'
import { fadeUp, imageReveal, stagger, viewportOnce } from '../../../lib/motion'
import { getCategory, getProgramme, programmeImage } from '../../../data/programmes'
import { getDepartmentDetail } from '../../../data/departmentDetails'
import { site } from '../../../data/site'

export default function ProgrammeDetailPage() {
  const { category: categorySlug, slug } = useParams()
  const programme = getProgramme(slug)
  const category = getCategory(categorySlug)

  if (!programme || !category || programme.category !== categorySlug) {
    return <Navigate to="/programmes" replace />
  }

  const image = programmeImage(programme.slug)
  const detail = getDepartmentDetail(programme.slug)

  const trail = [
    { label: 'Programmes', href: '/programmes' },
    { label: category.label, href: `/programmes/${categorySlug}` },
    { label: programme.name, href: `/programmes/${categorySlug}/${slug}` },
  ]

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: programme.name,
    description: programme.excerpt,
    provider: { '@type': 'CollegeOrUniversity', name: site.name, sameAs: site.url },
    educationalCredentialAwarded: programme.degree,
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'onsite',
      courseWorkload: programme.duration,
    },
  }

  return (
    <>
      <Seo title={programme.name} description={programme.excerpt} schema={schema} image={image.src} />

      <PageHero
        title={programme.name}
        description={programme.tagline}
        trail={trail}
        image={image}
        meta={[
          { label: 'Duration', value: programme.duration },
          { label: 'Mode', value: programme.mode },
          { label: 'Intake', value: programme.intake },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <Button to="/admission" size="lg" variant="primary" icon>
            Apply for this programme
          </Button>
          <Button to="/contact" size="lg" variant="light">
            Ask a question
          </Button>
        </div>
      </PageHero>

      <DepartmentSections detail={detail} programme={programme} />

      {/* Overview */}
      <section className="section bg-white">
        <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-16">
          <motion.div
            variants={stagger(0.09)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="lg:col-span-7"
          >
            <motion.h2 variants={fadeUp} className="display text-[28px] sm:text-[36px]">
              What you will study
            </motion.h2>
            <motion.p variants={fadeUp} className="lead mt-6">
              {programme.description}
            </motion.p>

            <motion.ul variants={stagger(0.06)} className="mt-10 grid gap-4 sm:grid-cols-2">
              {programme.highlights.map((highlight) => (
                <motion.li
                  key={highlight}
                  variants={fadeUp}
                  className="flex gap-3 rounded-xl border border-ink-100 bg-ink-50/60 p-4"
                >
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-500 text-white">
                    <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                  </span>
                  <span className="text-[13.5px] leading-relaxed text-ink-600">{highlight}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Facts card */}
          <motion.aside
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="lg:col-span-4 lg:col-start-9"
          >
            <div className="sticky top-28 overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-card">
              <div className="dark-section bg-ink-900 p-7">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/[0.06] text-brand-300">
                  <Icon name={programme.icon} className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <h3 className="mt-5 text-[19px] font-semibold text-white">Programme at a glance</h3>
              </div>

              <dl className="divide-y divide-ink-100">
                {[
                  { label: 'Award', value: programme.degree },
                  { label: 'Duration', value: programme.duration },
                  { label: 'Mode', value: programme.mode },
                  { label: 'Intake', value: programme.intake },
                  { label: 'Stream', value: category.label },
                  { label: 'Eligibility', value: programme.eligibility },
                ].map((row) => (
                  <div key={row.label} className="px-7 py-4">
                    <dt className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-ink-400">
                      {row.label}
                    </dt>
                    <dd className="mt-1.5 text-[14px] leading-relaxed text-ink-800">{row.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="border-t border-ink-100 p-7">
                <Button to="/admission" variant="primary" size="md" icon full>
                  Admission Enquiry
                </Button>
              </div>
            </div>
          </motion.aside>
        </div>
      </section>

      {/* Curriculum + careers */}
      <section className="section bg-ink-50/70">
        <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading
              title="Core areas of study"
              description="Indicative papers across the programme. The prescribed syllabus is issued by Thiruvalluvar University each academic year."
            />

            <motion.ol
              variants={stagger(0.05)}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-ink-200 bg-ink-200 sm:grid-cols-2"
            >
              {programme.subjects.map((subject, index) => (
                <motion.li
                  key={subject}
                  variants={fadeUp}
                  className="flex items-start gap-3 bg-white px-6 py-5 text-[14px] text-ink-700"
                >
                  <span className="mt-0.5 text-[11px] font-semibold tabular-nums text-brand-500">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {subject}
                </motion.li>
              ))}
            </motion.ol>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <motion.div variants={imageReveal} initial="hidden" whileInView="show" viewport={viewportOnce}>
              <SmartImage
                src={image.src}
                alt={image.alt}
                ratio="square"
                className="rounded-[22px] border border-ink-100 shadow-card"
                sizes="(max-width: 1024px) 92vw, 360px"
              />
            </motion.div>

            <h3 className="mt-10 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-600">
              Where graduates go
            </h3>
            <motion.ul
              variants={stagger(0.06)}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="mt-5 flex flex-col divide-y divide-ink-200 border-y border-ink-200"
            >
              {programme.careers.map((career) => (
                <motion.li key={career} variants={fadeUp} className="py-3.5 text-[14.5px] text-ink-700">
                  {career}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </section>

    </>
  )
}
