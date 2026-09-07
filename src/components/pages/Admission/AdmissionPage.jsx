import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, FileText } from 'lucide-react'
import Seo, { breadcrumbSchema } from '../../../lib/Seo'
import PageHero from '../../ui/PageHero'
import SectionHeading from '../../ui/SectionHeading'
import AdmissionForm from '../../ui/AdmissionForm'
import Button from '../../ui/Button'
import Icon from '../../ui/Icon'
import { ease, fadeUp, stagger, viewportOnce } from '../../../lib/motion'
import { admissionCouncil, admissionIntro, coursesOffered, eligibilityCriteria } from '../../../data/admission'
import { site } from '../../../data/site'
import { cx } from '../../../lib/cx'
import admissionHero from '../../../assets/facilities/reception1.webp'

const trail = [{ label: 'Admission', href: '/admission' }]

const steps = [
  {
    title: 'Submit an enquiry',
    detail: 'Complete the enquiry form below or call the office. We record your marks and the programme you have in mind.',
  },
  {
    title: 'Counselling call',
    detail: 'A member of the admission team calls you back to confirm eligibility and talk through the options.',
  },
  {
    title: 'Application & documents',
    detail: 'Collect the application form at the office, complete it and submit it with attested copies of your certificates.',
  },
  {
    title: 'Verification & admission',
    detail: 'Originals are verified, the fee is paid at the office and your admission is confirmed with a receipt.',
  },
]

const documents = [
  'Higher Secondary (+2) mark statement, original and two copies',
  'Transfer Certificate from the previous institution',
  'Conduct Certificate',
  'Community Certificate (where applicable)',
  'Income Certificate for scholarship applications',
  'Aadhaar card copy and four passport-size photographs',
  'Degree certificate and consolidated marksheet (for M.Com applicants)',
]

export default function AdmissionPage() {
  return (
    <>
      <Seo
        title="Admission"
        description="Admission process at A.N. Radhakrishnan College of Arts and Science, Vadamavandal, courses offered, sanctioned strength, eligibility criteria and the admission council."
        schema={breadcrumbSchema(trail)}
      />

      <PageHero
        title="Admission"
        description="Admissions are open for all first year undergraduate courses. The college office will guide you through every step."
        trail={trail}
        image={{ src: admissionHero, alt: 'The reception at the entrance to the college' }}
        meta={[
          { label: 'Phone', value: site.phones.join(' / ') },
          { label: 'Email', value: site.email },
          { label: 'Office hours', value: 'Mon–Sat, 9 am to 4 pm' },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <Button href="#enquiry-form" size="lg" variant="primary" icon>
            Start an enquiry
          </Button>
          <Button href={`tel:${site.phones[1].replace(/\s/g, '')}`} size="lg" variant="light">
            Call the office
          </Button>
        </div>
      </PageHero>

      <Intro />
      <Process />
      <Courses />
      <Eligibility />
      <AdmissionCouncil />
      <EnquiryForm />
    </>
  )
}

/* ------------------------------------------------------------------ */

function Intro() {
  return (
    <section className="section relative overflow-hidden bg-white pb-0">
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-brand-100/50 blur-[130px]"
        aria-hidden="true"
      />

      <div className="shell relative">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="display max-w-3xl text-[30px] sm:text-[38px] lg:text-[44px]"
        >
          Admission process
          <span className="mt-2 block text-brand-600">ANR College of Arts &amp; Science, Vadamavandal</span>
        </motion.h2>

        <motion.div
          variants={stagger(0.09)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-12 grid gap-5 lg:grid-cols-2"
        >
          {admissionIntro.map((block) => (
            <motion.article
              key={block.title}
              variants={fadeUp}
              className="rounded-[24px] border border-ink-100 bg-white p-8 shadow-card sm:p-9"
            >
              <h3 className="text-[19px] font-semibold leading-snug tracking-tight text-ink-900">{block.title}</h3>
              <p className="mt-4 text-[14.5px] leading-relaxed text-ink-500">{block.body}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function Process() {
  return (
    <section className="section bg-white">
      <div className="shell">
        <SectionHeading
          title="Four steps from enquiry to admission"
          description="The whole process, start to finish. The office will help with any of it."
        />

        <motion.ol
          variants={stagger(0.09)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map((step, index) => (
            <motion.li
              key={step.title}
              variants={fadeUp}
              className="group relative flex flex-col rounded-2xl border border-ink-100 bg-white p-7 transition-all duration-500 ease-premium hover:-translate-y-1 hover:border-brand-300 hover:shadow-lift"
            >
              <span className="text-[34px] font-semibold leading-none tracking-tightest text-brand-100 transition-colors duration-500 group-hover:text-brand-300">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-5 text-[17px] font-semibold tracking-tight text-ink-900">{step.title}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-ink-500">{step.detail}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  )
}

function Courses() {
  return (
    <section className="section bg-ink-50/70">
      <div className="shell">
        <SectionHeading
          title="Courses offered"
          description="A wide stream of undergraduate courses, with a postgraduate pathway in commerce. Sanctioned strength is shown against each."
          action={
            <Button to="/programmes" variant="outline" icon>
              View courses
            </Button>
          }
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          <CourseTable
            label="Courses at undergraduate level"
            courses={coursesOffered.undergraduate}
            className="lg:col-span-7"
          />
          <CourseTable
            label="Courses at postgraduate level"
            courses={coursesOffered.postgraduate}
            className="lg:col-span-5"
          />
        </div>
      </div>
    </section>
  )
}

function CourseTable({ label, courses, className }) {
  return (
    <motion.div
      variants={stagger(0.06)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={cx('overflow-hidden rounded-[22px] border border-ink-100 bg-white shadow-card', className)}
    >
      <div className="border-b border-ink-100 bg-brand-50/60 px-7 py-5">
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-600">{label}</h3>
      </div>

      <ul className="divide-y divide-ink-100">
        {courses.map((course) => (
          <motion.li
            key={course.name}
            variants={fadeUp}
            className="flex flex-wrap items-center justify-between gap-3 px-7 py-5 transition-colors duration-300 hover:bg-brand-50/40"
          >
            <span className="text-[15px] font-semibold tracking-tight text-ink-900">{course.name}</span>
            <span className="rounded-full bg-ink-50 px-3 py-1.5 text-[12.5px] font-medium text-ink-500">
              {course.strength}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}

function Eligibility() {
  const [open, setOpen] = useState(0)

  return (
    <section className="section bg-white">
      <div className="shell">
        <SectionHeading
          title="Eligibility criteria"
          description="The standards for selection, prescribed by Thiruvalluvar University. Select a programme to read its criteria."
        />

        <div className="mt-14 flex flex-col gap-3">
          {eligibilityCriteria.map((row, index) => {
            const isOpen = open === index

            return (
              <div
                key={row.department}
                className={cx(
                  'overflow-hidden rounded-2xl border transition-colors duration-300',
                  isOpen ? 'border-brand-300 bg-white shadow-card' : 'border-ink-100 bg-white',
                )}
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors duration-300 hover:bg-brand-50/60 sm:px-6"
                  >
                    <span
                      className={cx(
                        'grid h-9 w-9 shrink-0 place-items-center rounded-lg text-[12px] font-semibold tabular-nums transition-colors duration-300',
                        isOpen ? 'bg-brand-500 text-white' : 'bg-brand-50 text-brand-600',
                      )}
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="flex-1 text-[15px] font-semibold leading-snug tracking-tight text-ink-900 sm:text-[16px]">
                      {row.department}
                    </span>
                    <ChevronDown
                      className={cx(
                        'h-4 w-4 shrink-0 text-ink-400 transition-transform duration-300',
                        isOpen && 'rotate-180 text-brand-600',
                      )}
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease }}
                      className="overflow-hidden"
                    >
                      <p className="mx-5 border-t border-ink-100 pb-6 pt-5 text-[14px] leading-relaxed text-ink-500 sm:mx-6 sm:pl-[52px]">
                        {row.criteria}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function AdmissionCouncil() {
  return (
    <section className="dark-section section relative overflow-hidden bg-ink-900">
      <div className="pointer-events-none absolute inset-0 grid-bg-dark opacity-40" aria-hidden="true" />

      <div className="shell relative">
        <SectionHeading
          title="Admission council"
          description={admissionCouncil.intro}
          tone="dark"
          align="center"
        />

        <h3 className="mt-16 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-300">
          Key functions
        </h3>

        <motion.div
          variants={stagger(0.05)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {admissionCouncil.functions.map((item) => (
            <motion.article
              key={item.title}
              variants={fadeUp}
              className="group rounded-2xl border border-white/10 bg-white/[0.035] p-6 transition-colors duration-500 hover:border-brand-400/45 hover:bg-white/[0.06]"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-500/15 text-brand-300 transition-colors duration-500 group-hover:bg-brand-500 group-hover:text-white">
                <Icon name={item.icon} className="h-5 w-5" strokeWidth={1.6} />
              </span>
              <h4 className="mt-5 text-[16px] font-semibold leading-snug tracking-tight text-white">{item.title}</h4>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-white/55">{item.detail}</p>
            </motion.article>
          ))}
        </motion.div>

        <h3 className="mt-20 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-300">
          Composition
        </h3>
        <p className="mx-auto mt-4 max-w-xl text-center text-[14.5px] text-white/55">
          An admission council typically consists of:
        </p>

        <motion.div
          variants={stagger(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {admissionCouncil.composition.map((item) => (
            <motion.article
              key={item.title}
              variants={fadeUp}
              className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.035] p-6"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/[0.06] text-brand-300">
                <Icon name={item.icon} className="h-5 w-5" strokeWidth={1.6} />
              </span>
              <div>
                <h4 className="text-[15px] font-semibold leading-snug tracking-tight text-white">{item.title}</h4>
                <p className="mt-2 text-[13px] leading-relaxed text-white/50">{item.detail}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function EnquiryForm() {
  return (
    <section id="enquiry-form" className="section scroll-mt-32 bg-white">
      <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            title="Tell us about yourself"
            description="Send your details and the admission office will call you back to confirm eligibility and answer your questions."
          />

          <h3 className="mt-12 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-600">
            Documents to bring
          </h3>

          <motion.ul
            variants={stagger(0.05)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-6 flex flex-col gap-3"
          >
            {documents.map((document) => (
              <motion.li
                key={document}
                variants={fadeUp}
                className="flex gap-3 rounded-xl border border-ink-100 bg-ink-50/60 p-4"
              >
                <FileText className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" strokeWidth={1.7} aria-hidden="true" />
                <span className="text-[13.5px] leading-relaxed text-ink-600">{document}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="lg:col-span-6 lg:col-start-7"
        >
          <div className="rounded-[24px] border border-ink-100 bg-white p-8 shadow-card sm:p-10">
            <AdmissionForm />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
