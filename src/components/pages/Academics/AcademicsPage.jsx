import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Seo, { breadcrumbSchema } from '../../../lib/Seo'
import PageHero from '../../ui/PageHero'
import SectionHeading from '../../ui/SectionHeading'
import SmartImage from '../../ui/SmartImage'
import Button from '../../ui/Button'
import Icon from '../../ui/Icon'
import { fadeUp, imageReveal, stagger, viewportOnce } from '../../../lib/motion'
import { academicFramework } from '../../../data/content'
import { categories, programmes } from '../../../data/programmes'
import classroomsPhoto from '../../../assets/images/22.webp'

const libraryPhoto =
  'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1100&q=72'

const trail = [{ label: 'Academics', href: '/academics' }]

const calendar = [
  { term: 'Odd Semester', detail: 'June to November, instruction, internal tests and the end-semester examination.' },
  { term: 'Even Semester', detail: 'December to April, instruction, model examinations and practical assessment.' },
  { term: 'Internal Assessment', detail: 'Two cycle tests, assignments, a seminar and a model examination each semester.' },
  { term: 'Results & Review', detail: 'Departmental result analysis, remedial planning and parent communication.' },
]

export default function AcademicsPage() {
  return (
    <>
      <Seo
        title="Academics"
        description="Academic framework at A.N. Radhakrishnan College of Arts and Science, semester pattern, continuous assessment, mentoring, remedial coaching and quality assurance."
        schema={breadcrumbSchema(trail)}
      />

      <PageHero
        title="How teaching and learning work here."
        description="A university-prescribed curriculum, delivered with continuous assessment, close mentoring and structured support for every kind of learner."
        trail={trail}
        image={{ src: classroomsPhoto, alt: 'A classroom session under way at the college' }}
        meta={[
          { label: 'Pattern', value: 'Semester system' },
          { label: 'Departments', value: '7 academic departments' },
          { label: 'Programmes', value: `${programmes.length} programmes` },
        ]}
      />

      {/* Framework */}
      <section className="section bg-white">
        <div className="shell">
          <SectionHeading
            title="Structure that keeps every student moving forward"
            description="Six working parts of the academic system, from the semester calendar through to quality assurance."
          />

          <motion.div
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-ink-100 bg-ink-100 sm:grid-cols-2 lg:grid-cols-3"
          >
            {academicFramework.map((item) => (
              <motion.article key={item.title} variants={fadeUp} className="group bg-white p-8">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600 transition-colors duration-500 group-hover:bg-brand-500 group-hover:text-white">
                  <Icon name={item.icon} className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <h3 className="mt-7 text-[17.5px] font-semibold tracking-tight text-ink-900">{item.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-ink-500">{item.description}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Calendar */}
      <section className="section bg-ink-50/70">
        <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-16">
          <motion.div
            variants={imageReveal}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="lg:col-span-5"
          >
            <SmartImage
              src={libraryPhoto}
              alt="Reading hall of the college central library"
              ratio="portrait"
              className="rounded-[24px] border border-ink-100 shadow-card"
              sizes="(max-width: 1024px) 92vw, 460px"
            />
          </motion.div>

          <div className="lg:col-span-6 lg:col-start-7">
            <SectionHeading
              title="A calendar published before teaching begins"
              description="Students and parents know the examination and assessment schedule from the first week of the semester."
            />

            <motion.dl
              variants={stagger(0.08)}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="mt-10 divide-y divide-ink-200 border-y border-ink-200"
            >
              {calendar.map((entry) => (
                <motion.div key={entry.term} variants={fadeUp} className="grid gap-2 py-6 sm:grid-cols-3 sm:gap-6">
                  <dt className="text-[15px] font-semibold tracking-tight text-ink-900">{entry.term}</dt>
                  <dd className="text-[14px] leading-relaxed text-ink-500 sm:col-span-2">{entry.detail}</dd>
                </motion.div>
              ))}
            </motion.dl>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button to="/departments" variant="dark" icon>
                View departments
              </Button>
              <Button to="/programmes" variant="outline" icon>
                Browse programmes
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Streams */}
      <section className="section bg-white">
        <div className="shell">
          <SectionHeading
            title="Four streams, one standard"
            description="Whatever a student studies here, the expectations of attendance, assessment and conduct are the same."
            align="center"
          />

          <motion.div
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {categories.map((category) => (
              <motion.div key={category.slug} variants={fadeUp}>
                <Link
                  to={`/programmes/${category.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-ink-100 bg-white p-7 transition-all duration-500 ease-premium hover:-translate-y-1 hover:border-brand-300 hover:shadow-lift"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600 transition-colors duration-500 group-hover:bg-brand-500 group-hover:text-white">
                    <Icon name={category.icon} className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-6 text-[18px] font-semibold tracking-tight text-ink-900">{category.label}</h3>
                  <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-ink-500">{category.headline}</p>
                  <span className="mt-5 text-[13px] font-medium text-brand-600">
                    {programmes.filter((p) => p.category === category.slug).length} programmes
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  )
}
