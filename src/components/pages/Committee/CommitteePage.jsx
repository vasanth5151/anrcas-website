import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Seo, { breadcrumbSchema } from '../../../lib/Seo'
import PageHero from '../../ui/PageHero'
import Button from '../../ui/Button'
import Icon from '../../ui/Icon'
import { fadeUp, stagger, viewportOnce } from '../../../lib/motion'
import { committees } from '../../../data/committee'
import committeeHero from '../../../assets/images/17.webp'

const trail = [{ label: 'Committee', href: '/committee' }]

export default function CommitteePage() {
  return (
    <>
      <Seo
        title="Committees"
        description="The committees and clubs of A.N. Radhakrishnan College of Arts and Science, Vadamavandal, anti-ragging, anti-drugs, discipline, academic, placement, women welfare, internal complaints, NIRF, Red Ribbon Club, cultural and SC/ST scholarship."
        schema={breadcrumbSchema(trail)}
      />

      <PageHero
        title="Committee"
        description="Each committee has a clear remit and a named point of contact, so students and parents know exactly who to approach."
        trail={trail}
        image={{ src: committeeHero, alt: 'A college function under way in the seminar hall' }}
        meta={[
          { label: 'Committees', value: `${committees.length} constituted` },
          { label: 'Review', value: 'Reconstituted each academic year' },
        ]}
      />

      <section className="section relative overflow-hidden bg-white">
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
            className="mx-auto max-w-3xl text-center"
          >
            <motion.h2 variants={fadeUp} className="display text-[30px] sm:text-[38px] lg:text-[44px]">
              College of Arts &amp; Science,
              <span className="mt-2 block text-brand-600">Vadamavandal</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="lead mx-auto mt-6">
              Our college is home to diverse committees dedicated to fostering students’ personal and professional
              growth.
            </motion.p>
          </motion.div>

          <motion.div
            variants={stagger(0.06)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {committees.map((committee) => (
              <motion.article
                key={committee.slug}
                variants={fadeUp}
                className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-ink-100 bg-white p-7 transition-all duration-500 ease-premium hover:-translate-y-1.5 hover:border-brand-300 hover:shadow-lift"
              >
                <span
                  className="pointer-events-none absolute -right-14 -top-14 h-36 w-36 rounded-full bg-brand-100/60 opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100"
                  aria-hidden="true"
                />

                <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-600 transition-colors duration-500 group-hover:bg-brand-500 group-hover:text-white">
                  <Icon name={committee.icon} className="h-6 w-6" strokeWidth={1.5} />
                </span>

                <h3 className="relative mt-6 text-[17px] font-semibold leading-snug tracking-tight text-ink-900">
                  <Link
                    to={`/committees/${committee.slug}`}
                    className="after:absolute after:inset-0 hover:text-brand-600"
                  >
                    {committee.name}
                  </Link>
                </h3>

                <p className="relative mt-3 flex-1 text-[14px] leading-relaxed text-ink-500">{committee.summary}</p>

                <span className="relative mt-6 inline-flex items-center gap-1.5 border-t border-ink-100 pt-4 text-[13px] font-semibold text-brand-600">
                  Read more
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </span>
              </motion.article>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-16 flex flex-col items-center gap-4 rounded-2xl border border-ink-100 bg-ink-50/70 px-8 py-10 text-center"
          >
            <h3 className="text-[22px] font-semibold tracking-tight text-ink-900">Need to reach a committee?</h3>
            <p className="max-w-xl text-[14.5px] text-ink-500">
              The college office will put you in touch with the convenor of any committee listed here.
            </p>
            <div className="mt-2 flex flex-wrap justify-center gap-3">
              <Button to="/contact" variant="primary" icon>
                Contact the office
              </Button>
              <Button to="/about" variant="outline">
                About the college
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
