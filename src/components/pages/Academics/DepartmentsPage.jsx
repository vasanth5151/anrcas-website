import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Seo, { breadcrumbSchema } from '../../../lib/Seo'
import PageHero from '../../ui/PageHero'
import SmartImage from '../../ui/SmartImage'
import Button from '../../ui/Button'
import Icon from '../../ui/Icon'
import { fadeUp, stagger, viewportOnce } from '../../../lib/motion'
import { departments } from '../../../data/content'
import { categoryLabel, getProgramme, programmeImage, programmePath } from '../../../data/programmes'
import departmentsHero from '../../../assets/images/22.webp'

const trail = [
  { label: 'Academics', href: '/academics' },
  { label: 'Departments', href: '/departments' },
]

export default function DepartmentsPage() {
  return (
    <>
      <Seo
        title="Departments"
        description="The seven academic departments of A.N. Radhakrishnan College of Arts and Science, computer science, mathematics, commerce, corporate secretaryship, business administration, Tamil and English."
        schema={breadcrumbSchema(trail)}
      />

      <PageHero
        title="Departments"
        description="Each department runs its own association, seminars and project work, and shares the same commitment to the students in front of it."
        trail={trail}
        image={{ src: departmentsHero, alt: 'Faculty and students during a computer laboratory session' }}
      />

      <section className="section bg-white">
        <div className="shell">
          {/* Page title, centred like the reference but set in the site's own type scale. */}
          <motion.div
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mx-auto max-w-3xl text-center"
          >
            <motion.h2 variants={fadeUp} className="display text-[30px] sm:text-[38px] lg:text-[44px]">
              Our academic departments
              <span className="mt-3 block text-[17px] font-medium tracking-tight text-brand-600 sm:text-[19px]">
                ANR College of Arts &amp; Science, Vadamavandal
              </span>
            </motion.h2>
            <motion.p variants={fadeUp} className="lead mx-auto mt-6">
              Seven departments across science, commerce, management and languages. Select one to read the programme
              it offers, its curriculum and where its graduates go.
            </motion.p>
          </motion.div>

          <motion.div
            variants={stagger(0.07)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {departments.map((department) => (
              <DepartmentCard key={department.slug} department={department} />
            ))}
          </motion.div>

          <div className="mt-14 flex flex-col items-center gap-4 rounded-2xl border border-ink-100 bg-ink-50/70 px-8 py-10 text-center">
            <h3 className="text-[22px] font-semibold tracking-tight text-ink-900">
              Not sure which department suits you?
            </h3>
            <p className="max-w-xl text-[14.5px] text-ink-500">
              The admission office will talk through your marks, interests and the career you have in mind before you
              choose.
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

function DepartmentCard({ department }) {
  const programme = getProgramme(department.slug)
  const image = programmeImage(department.slug)
  const href = programme ? programmePath(programme) : null

  return (
    <motion.article
      variants={fadeUp}
      className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-ink-100 bg-white transition-all duration-500 ease-premium hover:-translate-y-1.5 hover:border-brand-300 hover:shadow-lift"
    >
      <SmartImage
        src={image.src}
        alt={image.alt}
        ratio="wide"
        imgClassName="transition-transform duration-[900ms] ease-premium group-hover:scale-[1.06]"
        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 400px"
      >
        <span
          className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/20 to-transparent"
          aria-hidden="true"
        />

        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-brand-600 backdrop-blur">
          <Icon name={programme?.icon ?? 'BookOpen'} className="h-3.5 w-3.5" strokeWidth={1.9} aria-hidden="true" />
          {categoryLabel(department.category)}
        </span>

        {programme ? (
          <span className="absolute inset-x-4 bottom-4 text-[17px] font-semibold leading-snug tracking-tight text-white">
            {programme.name}
          </span>
        ) : null}
      </SmartImage>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-[16px] font-semibold leading-snug tracking-tight text-ink-900">
          {href ? (
            <Link to={href} className="after:absolute after:inset-0 hover:text-brand-600">
              {department.name}
            </Link>
          ) : (
            department.name
          )}
        </h3>

        <p className="mt-3 flex-1 text-[14px] leading-relaxed text-ink-500">{department.summary}</p>

        <div className="mt-6 border-t border-ink-100 pt-4">
          <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-600">
            View more
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2}
              aria-hidden="true"
            />
          </span>
        </div>
      </div>
    </motion.article>
  )
}
