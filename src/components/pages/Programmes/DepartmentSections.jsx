import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import SectionHeading from '../../ui/SectionHeading'
import Icon from '../../ui/Icon'
import { ease, fadeUp, stagger, viewportOnce } from '../../../lib/motion'
import { cx } from '../../../lib/cx'

/**
 * Default section labels. A department may override any of them through its
 * `labels` object, the Tamil department, for instance, runs entirely in Tamil.
 */
const defaultLabels = {
  departments: 'Departments',
  overview: 'Course overview',
  goals: 'Goals of the department',
  coursesOffered: 'Courses offered',
  higherEducation: 'Scope for higher education',
  visionMission: 'Vision & mission',
  visionMissionNote: 'What the department sets out to do, and how it measures itself.',
  vision: 'Our vision',
  mission: 'Our mission',
  programmeOutcomes: 'Programme outcomes',
  programmeOutcomesNote: 'What a graduate of this programme is expected to be able to do.',
  programmeSpecificOutcomes: 'Programme specific outcomes',
  programmeSpecificOutcomesNote:
    'What this department expects of its own graduates, beyond the common programme outcomes.',
  courseOutcomes: 'Course outcomes',
  courseOutcomesNote: 'Semester by semester, what each paper is expected to leave a student able to do.',
  semester: 'Semester',
  objectives: 'Learning objectives',
  outcomes: 'Course outcomes',
  faculty: 'Faculty',
  facultyNote: 'The teachers who run this department, with their designation and qualification.',
}

/**
 * The department write-up shown above the programme detail: overview, vision,
 * programme outcomes, semester-wise course outcomes and faculty. Each section
 * renders only when the department has supplied that content.
 */
export default function DepartmentSections({ detail, programme }) {
  if (!detail) return null

  const t = { ...defaultLabels, ...(detail.labels ?? {}) }
  const groups = detail.courseGroups ?? (detail.courseOutcomes?.length ? [{ items: detail.courseOutcomes }] : [])

  return (
    <>
      <Intro detail={detail} programme={programme} t={t} />
      {detail.overview?.length ? <Overview detail={detail} t={t} /> : null}
      {detail.visionPillars?.length || detail.visionStatements?.length || detail.missionStatements?.length ? (
        <VisionMission detail={detail} t={t} />
      ) : null}
      {detail.programmeOutcomes?.length ? (
        <Outcomes
          title={t.programmeOutcomes}
          description={t.programmeOutcomesNote}
          prefix="PO"
          items={detail.programmeOutcomes}
        />
      ) : null}
      {detail.programmeSpecificOutcomes?.length ? (
        <Outcomes
          title={t.programmeSpecificOutcomes}
          description={t.programmeSpecificOutcomesNote}
          prefix="PSO"
          items={detail.programmeSpecificOutcomes}
          tone="tinted"
        />
      ) : null}
      {groups.length ? <CourseOutcomes groups={groups} t={t} /> : null}
      {detail.faculty?.length ? <Faculty members={detail.faculty} t={t} /> : null}
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Intro                                                               */
/* ------------------------------------------------------------------ */

function Intro({ detail, programme, t }) {
  return (
    <section className="relative overflow-hidden bg-white pt-20 sm:pt-24">
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-brand-100/50 blur-[130px]"
        aria-hidden="true"
      />

      <motion.div
        variants={stagger(0.09)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="shell relative mx-auto max-w-4xl text-center"
      >
        {detail.heading ? (
          <motion.h2 variants={fadeUp} className="display text-[26px] leading-tight sm:text-[34px] lg:text-[40px]">
            {detail.heading}
          </motion.h2>
        ) : null}

        <motion.span
          variants={fadeUp}
          className="mt-8 inline-flex rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-600"
        >
          {t.departments}
        </motion.span>

        <motion.p
          variants={fadeUp}
          className="mt-5 text-[24px] font-semibold tracking-tight text-ink-900 sm:text-[30px]"
        >
          {detail.name ?? programme.name}
        </motion.p>

        {detail.tagline ? (
          <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-400">
            {detail.tagline}
          </motion.p>
        ) : null}

        <motion.span
          variants={fadeUp}
          className="mx-auto mt-10 block h-px w-24 bg-gradient-to-r from-transparent via-brand-400 to-transparent"
          aria-hidden="true"
        />
      </motion.div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Course overview                                                     */
/* ------------------------------------------------------------------ */

function Overview({ detail, t }) {
  return (
    <section className="section bg-white">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHeading title={t.overview} />
          {detail.coursesOffered?.length ? (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="mt-8 rounded-2xl border border-ink-100 bg-ink-50/70 p-6"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-600">
                {t.coursesOffered}
              </p>
              <ul className="mt-4 flex flex-col gap-2">
                {detail.coursesOffered.map((course) => (
                  <li key={course} className="text-[15px] font-medium tracking-tight text-ink-900">
                    {course}
                  </li>
                ))}
              </ul>
            </motion.div>
          ) : null}

          {detail.higherEducation?.length ? (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="mt-4 rounded-2xl border border-ink-100 bg-white p-6"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-600">
                {t.higherEducation}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {detail.higherEducation.map((qualification) => (
                  <li
                    key={qualification}
                    className="rounded-full border border-ink-100 bg-ink-50/70 px-3 py-1.5 text-[12.5px] font-medium text-ink-700"
                  >
                    {qualification}
                  </li>
                ))}
              </ul>
            </motion.div>
          ) : null}
        </div>

        <div className="lg:col-span-8">
          <motion.ul
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="flex flex-col gap-4"
          >
            {detail.overview.map((paragraph, index) => (
              <motion.li
                key={paragraph.slice(0, 40)}
                variants={fadeUp}
                className="flex gap-5 rounded-2xl border border-ink-100 bg-white p-6 transition-colors duration-500 hover:border-brand-300 sm:p-7"
              >
                <span className="text-[15px] font-semibold tabular-nums text-brand-300">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="text-[14.5px] leading-relaxed text-ink-600">{paragraph}</p>
              </motion.li>
            ))}
          </motion.ul>

          {detail.goals?.length ? (
            <motion.div
              variants={stagger(0.05)}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="mt-10 rounded-[26px] border border-ink-100 bg-ink-50/70 p-7 sm:p-9"
            >
              <motion.h3 variants={fadeUp} className="text-[19px] font-semibold tracking-tight text-ink-900">
                {t.goals}
              </motion.h3>
              <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {detail.goals.map((goal) => (
                  <motion.li key={goal.slice(0, 40)} variants={fadeUp} className="flex gap-3">
                    <Icon
                      name="CheckCircle2"
                      className="mt-0.5 h-4 w-4 shrink-0 text-brand-500"
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                    <span className="text-[13.5px] leading-relaxed text-ink-600">{goal}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Vision                                                              */
/* ------------------------------------------------------------------ */

function VisionMission({ detail, t }) {
  const { visionStatements, missionStatements, visionPillars } = detail

  return (
    <section className="dark-section section relative overflow-hidden bg-ink-900">
      <div className="pointer-events-none absolute inset-0 grid-bg-dark opacity-40" aria-hidden="true" />

      <div className="shell relative">
        <SectionHeading
          title={t.visionMission}
          description={t.visionMissionNote}
          tone="dark"
          align="center"
        />

        {/* Statement form, a vision panel beside a numbered mission list. */}
        {visionStatements?.length || missionStatements?.length ? (
          <motion.div
            variants={stagger(0.09)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-14 grid gap-5 lg:grid-cols-2"
          >
            {visionStatements?.length ? (
              <motion.div
                variants={fadeUp}
                className="rounded-[26px] border border-white/10 bg-white/[0.035] p-8 sm:p-9"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-500/15 text-brand-300">
                  <Icon name="Eye" className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <h3 className="mt-5 text-[20px] font-semibold tracking-tight text-white">{t.vision}</h3>
                {visionStatements.map((statement) => (
                  <p key={statement.slice(0, 40)} className="mt-4 text-[14.5px] leading-relaxed text-white/55">
                    {statement}
                  </p>
                ))}
              </motion.div>
            ) : null}

            {missionStatements?.length ? (
              <motion.div
                variants={fadeUp}
                className="rounded-[26px] border border-white/10 bg-white/[0.035] p-8 sm:p-9"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-500/15 text-brand-300">
                  <Icon name="Flag" className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <h3 className="mt-5 text-[20px] font-semibold tracking-tight text-white">{t.mission}</h3>
                <ol className="mt-5 flex flex-col divide-y divide-white/10 border-t border-white/10">
                  {missionStatements.map((statement, index) => (
                    <li key={statement.slice(0, 40)} className="flex gap-4 py-4">
                      <span className="text-[12px] font-semibold tabular-nums text-brand-300">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[14px] leading-relaxed text-white/55">{statement}</span>
                    </li>
                  ))}
                </ol>
              </motion.div>
            ) : null}
          </motion.div>
        ) : null}

        {/* Pillar form, a titled commitment per card. */}
        {visionPillars?.length ? (
          <motion.div
            variants={stagger(0.06)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {visionPillars.map((item) => (
              <motion.article
                key={item.title}
                variants={fadeUp}
                className="group rounded-2xl border border-white/10 bg-white/[0.035] p-6 transition-colors duration-500 hover:border-brand-400/45 hover:bg-white/[0.06]"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-500/15 text-brand-300 transition-colors duration-500 group-hover:bg-brand-500 group-hover:text-white">
                  <Icon name={item.icon ?? 'Sparkles'} className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <h3 className="mt-5 text-[17px] font-semibold tracking-tight text-white">{item.title}</h3>
                <p className="mt-2.5 text-[14px] leading-relaxed text-white/55">{item.detail}</p>
              </motion.article>
            ))}
          </motion.div>
        ) : null}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Programme outcomes                                                  */
/* ------------------------------------------------------------------ */

function Outcomes({ title, description, prefix, items, tone = 'plain' }) {
  return (
    <section className={cx('section', tone === 'tinted' ? 'bg-white' : 'bg-ink-50/70')}>
      <div className="shell">
        <SectionHeading title={title} description={description} />

        <motion.ol
          variants={stagger(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((outcome, index) => (
            <motion.li
              key={outcome.slice(0, 40)}
              variants={fadeUp}
              className={cx(
                'group relative flex flex-col rounded-2xl border p-7 transition-all duration-500 ease-premium hover:-translate-y-1 hover:border-brand-300 hover:shadow-lift',
                tone === 'tinted' ? 'border-ink-100 bg-ink-50/70' : 'border-ink-100 bg-white',
              )}
            >
              <span className="inline-flex w-fit rounded-lg bg-brand-500 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
                {prefix}
                {index + 1}
              </span>
              <p className="mt-5 text-[14px] leading-relaxed text-ink-600">{outcome}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Course outcomes                                                     */
/* ------------------------------------------------------------------ */

function CourseOutcomes({ groups, t }) {
  return (
    <section className="section bg-white">
      <div className="shell">
        <SectionHeading title={t.courseOutcomes} description={t.courseOutcomesNote} />

        <div className="mt-12 flex flex-col gap-16">
          {groups.map((group, index) => (
            <CourseGroup key={group.title ?? index} group={group} t={t} />
          ))}
        </div>
      </div>
    </section>
  )
}

/** One course table: its own semester selector and accordion of papers. */
function CourseGroup({ group, t }) {
  const semesters = useMemo(() => [...new Set(group.items.map((item) => item.semester))], [group.items])
  const [semester, setSemester] = useState(semesters[0])
  const [open, setOpen] = useState(0)

  const visible = group.items.filter((item) => item.semester === semester)

  return (
    <div>
      {group.title ? (
        <div className="flex flex-wrap items-center gap-3 border-b border-ink-100 pb-5">
          <h3 className="text-[20px] font-semibold tracking-tight text-ink-900 sm:text-[22px]">{group.title}</h3>
          {group.code ? (
            <span className="rounded-full bg-brand-50 px-3 py-1 text-[11.5px] font-semibold text-brand-600">
              {group.code}
            </span>
          ) : null}
        </div>
      ) : null}

      {/* Semester selector, the reference used one long table. */}
      <div className="no-scrollbar -mx-5 mt-8 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0">
        {semesters.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => {
              setSemester(item)
              setOpen(0)
            }}
            aria-pressed={semester === item}
            className={cx(
              'shrink-0 rounded-full border px-5 py-2.5 text-[13px] font-semibold tracking-tight transition-all duration-300',
              semester === item
                ? 'border-brand-500 bg-brand-500 text-white shadow-[0_10px_24px_-14px_rgba(23,155,215,.95)]'
                : 'border-ink-200 bg-white text-ink-600 hover:border-brand-300 hover:text-brand-600',
            )}
          >
            {t.semester} {item}
          </button>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-3">
        {visible.map((course, index) => {
          const expandable = Boolean(course.outcomes?.length)
          const isOpen = expandable && open === index

          return (
            <div
              key={`${semester}-${course.code ?? ''}-${course.title}`}
              className={cx(
                'overflow-hidden rounded-2xl border transition-colors duration-300',
                isOpen ? 'border-brand-300 bg-white shadow-card' : 'border-ink-100 bg-white',
              )}
            >
              <h4>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : index)}
                  aria-expanded={expandable ? isOpen : undefined}
                  disabled={!expandable}
                  className={cx(
                    'flex w-full items-center gap-4 px-5 py-4 text-left transition-colors duration-300 sm:px-6',
                    expandable ? 'hover:bg-brand-50/60' : 'cursor-default',
                  )}
                >
                  <span
                    className={cx(
                      'grid h-9 min-w-[36px] shrink-0 place-items-center rounded-lg px-2 text-[11.5px] font-semibold transition-colors duration-300',
                      isOpen ? 'bg-brand-500 text-white' : 'bg-brand-50 text-brand-600',
                    )}
                    aria-hidden="true"
                  >
                    {course.code ?? semester}
                  </span>
                  <span className="flex-1 text-[15px] font-semibold leading-snug tracking-tight text-ink-900 sm:text-[16px]">
                    {course.title}
                  </span>
                  {expandable ? (
                    <ChevronDown
                      className={cx(
                        'h-4 w-4 shrink-0 text-ink-400 transition-transform duration-300',
                        isOpen && 'rotate-180 text-brand-600',
                      )}
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  ) : null}
                </button>
              </h4>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease }}
                    className="overflow-hidden"
                  >
                    <div className="mx-5 border-t border-ink-100 pb-6 pt-5 sm:mx-6 sm:pl-[52px]">
                      {course.objectives?.length ? (
                        <>
                          <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-brand-600">
                            {t.objectives}
                          </p>
                          <ul className="mt-3 flex flex-col gap-2.5">
                            {course.objectives.map((objective) => (
                              <li key={objective.slice(0, 40)} className="flex gap-3">
                                <span
                                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-300"
                                  aria-hidden="true"
                                />
                                <span className="text-[14px] leading-relaxed text-ink-500">{objective}</span>
                              </li>
                            ))}
                          </ul>
                          <p className="mt-6 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-brand-600">
                            {t.outcomes}
                          </p>
                        </>
                      ) : null}

                      <ul className={cx('flex flex-col gap-3', course.objectives?.length && 'mt-3')}>
                        {course.outcomes.map((outcome) => {
                          const text = typeof outcome === 'string' ? outcome : outcome.text
                          const mapping = typeof outcome === 'string' ? null : outcome.mapping

                          return (
                            <li key={text.slice(0, 40)} className="flex gap-3">
                              <span
                                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"
                                aria-hidden="true"
                              />
                              <span className="text-[14px] leading-relaxed text-ink-500">
                                {text}
                                {mapping ? (
                                  <span className="ml-2 inline-block rounded bg-brand-50 px-2 py-0.5 align-middle text-[11px] font-semibold text-brand-600">
                                    {mapping}
                                  </span>
                                ) : null}
                              </span>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Faculty                                                             */
/* ------------------------------------------------------------------ */

function Faculty({ members, t }) {
  return (
    <section className="section bg-ink-50/70">
      <div className="shell">
        <SectionHeading
          title={t.faculty} description={t.facultyNote} />

        <motion.div
          variants={stagger(0.07)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {members.map((member, index) => (
            <motion.article
              key={member.name}
              variants={fadeUp}
              className="flex gap-4 rounded-2xl border border-ink-100 bg-white p-6 transition-colors duration-500 hover:border-brand-300"
            >
              <span
                className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-[13px] font-semibold text-brand-600"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="min-w-0">
                <h3 className="text-[16px] font-semibold leading-snug tracking-tight text-ink-900">{member.name}</h3>
                <p className="mt-1.5 text-[13px] font-medium text-brand-600">{member.designation}</p>
                <p className="mt-1 text-[12.5px] leading-relaxed text-ink-400">{member.qualification}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
