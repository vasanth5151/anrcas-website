import { Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import Seo, { breadcrumbSchema } from '../../../lib/Seo'
import PageHero from '../../ui/PageHero'
import ProgrammeCard from '../../ui/ProgrammeCard'
import SectionHeading from '../../ui/SectionHeading'
import Button from '../../ui/Button'
import Icon from '../../ui/Icon'
import { fadeUp, stagger, viewportOnce } from '../../../lib/motion'
import { getCategory, programmeImage, programmesByCategory } from '../../../data/programmes'
import { departments } from '../../../data/content'

export default function ProgrammeCategoryPage() {
  const { category: slug } = useParams()
  const category = getCategory(slug)

  if (!category) return <Navigate to="/programmes" replace />

  const list = programmesByCategory(slug)
  const related = departments.filter((department) => department.category === slug)
  const trail = [
    { label: 'Programmes', href: '/programmes' },
    { label: category.label, href: `/programmes/${slug}` },
  ]

  return (
    <>
      <Seo
        title={`${category.label} Programmes`}
        description={category.description}
        schema={breadcrumbSchema(trail)}
      />

      <PageHero
        title={category.headline}
        description={category.description}
        trail={trail}
        image={programmeImage(list[0]?.slug)}
        meta={[
          { label: 'Programmes', value: `${list.length} offered` },
          { label: 'Departments', value: `${related.length}` },
          { label: 'Mode', value: 'Full time' },
        ]}
      />

      <section className="section bg-white">
        <div className="shell">
          <SectionHeading
            title={`Programmes in ${category.label}`}
            description="Every programme below follows the Thiruvalluvar University curriculum, taught with continuous internal assessment and practical work."
          />

          <motion.div
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {list.map((programme) => (
              <motion.div key={programme.slug} variants={fadeUp}>
                <ProgrammeCard programme={programme} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section bg-ink-50/70">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              title={`The ${category.label.toLowerCase()} departments`}
              description="The faculty who teach these programmes, run the associations and supervise project work."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/departments" variant="dark" icon>
                All departments
              </Button>
              <Button to="/admission" variant="outline" icon>
                Admission enquiry
              </Button>
            </div>
          </div>

          <motion.div
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="flex flex-col gap-4 lg:col-span-6 lg:col-start-7"
          >
            {related.map((department) => (
              <motion.article
                key={department.slug}
                variants={fadeUp}
                className="flex gap-5 rounded-2xl border border-ink-100 bg-white p-6 transition-colors duration-500 hover:border-brand-300"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon name={category.icon} className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <div>
                  <h3 className="text-[17px] font-semibold tracking-tight text-ink-900">{department.name}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-ink-500">{department.summary}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  )
}
