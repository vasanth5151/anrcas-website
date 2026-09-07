import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Seo, { breadcrumbSchema } from '../../../lib/Seo'
import PageHero from '../../ui/PageHero'
import ProgrammeCard from '../../ui/ProgrammeCard'
import SectionHeading from '../../ui/SectionHeading'
import Button from '../../ui/Button'
import Icon from '../../ui/Icon'
import { fadeUp, stagger, viewportOnce } from '../../../lib/motion'
import { categories, programmeImage, programmes, programmesByCategory } from '../../../data/programmes'

const trail = [{ label: 'Programmes', href: '/programmes' }]

export default function ProgrammesPage() {
  return (
    <>
      <Seo
        title="Programmes"
        description="Undergraduate and postgraduate programmes at A.N. Radhakrishnan College of Arts and Science, B.Sc Computer Science, B.Sc Mathematics, B.Com, Corporate Secretaryship, M.Com, BBA, Tamil and English."
        schema={breadcrumbSchema(trail)}
      />

      <PageHero
        title="Explore Our Programmes"
        description="Choose a programme that prepares you for tomorrow, across science, commerce, management and languages."
        trail={trail}
        image={programmeImage('computer-science')}
        meta={[
          { label: 'Undergraduate', value: '6 programmes' },
          { label: 'Postgraduate', value: 'M.Com' },
          { label: 'Languages', value: 'Tamil & English' },
        ]}
      />

      {/* Stream overview */}
      <section className="border-b border-ink-100 bg-white py-14">
        <div className="shell">
          <motion.div
            variants={stagger(0.07)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {categories.map((category) => (
              <motion.div key={category.slug} variants={fadeUp}>
                <Link
                  to={`/programmes/${category.slug}`}
                  className="group flex h-full items-start gap-4 rounded-2xl border border-ink-100 p-5 transition-all duration-500 ease-premium hover:border-brand-300 hover:shadow-card"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 transition-colors duration-500 group-hover:bg-brand-500 group-hover:text-white">
                    <Icon name={category.icon} className="h-[18px] w-[18px]" strokeWidth={1.6} />
                  </span>
                  <span className="flex flex-col">
                    <span className="flex items-center gap-1.5 text-[15px] font-semibold tracking-tight text-ink-900">
                      {category.label}
                      <ArrowUpRight
                        className="h-3.5 w-3.5 text-brand-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </span>
                    <span className="mt-1 text-[12.5px] text-ink-400">
                      {programmesByCategory(category.slug).length} programmes
                    </span>
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Programmes by stream */}
      {categories.map((category, index) => (
        <section
          key={category.slug}
          className={index % 2 === 0 ? 'section bg-white' : 'section bg-ink-50/70'}
        >
          <div className="shell">
            <SectionHeading
              title={category.headline}
              description={category.description}
              action={
                <Button to={`/programmes/${category.slug}`} variant="outline" icon>
                  {category.label} overview
                </Button>
              }
            />

            <motion.div
              variants={stagger(0.08)}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {programmesByCategory(category.slug).map((programme) => (
                <motion.div key={programme.slug} variants={fadeUp}>
                  <ProgrammeCard programme={programme} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      ))}

      <section className="dark-section relative overflow-hidden bg-ink-900 py-20">
        <div className="pointer-events-none absolute inset-0 grid-bg-dark opacity-40" aria-hidden="true" />
        <div className="shell relative flex flex-col items-center gap-6 text-center">
          <h2 className="display max-w-2xl text-[30px] text-white sm:text-[40px]">
            {programmes.length} programmes. One admission office.
          </h2>
          <p className="max-w-xl text-[15px] text-white/55">
            Tell us your marks and what you would like to do after graduation, and we will help you choose.
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <Button to="/admission" size="lg" variant="primary" icon>
              Admission Enquiry
            </Button>
            <Button to="/contact" size="lg" variant="light">
              Talk to Us
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
