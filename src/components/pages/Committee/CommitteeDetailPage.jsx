import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import Seo, { breadcrumbSchema } from '../../../lib/Seo'
import PageHero from '../../ui/PageHero'
import Button from '../../ui/Button'
import Icon from '../../ui/Icon'
import { fadeUp, stagger, viewportOnce } from '../../../lib/motion'
import { committees, getCommittee } from '../../../data/committee'
import { site } from '../../../data/site'
import committeeHero from '../../../assets/images/17.webp'

export default function CommitteeDetailPage() {
  const { slug } = useParams()
  const committee = getCommittee(slug)

  if (!committee) return <Navigate to="/committee" replace />

  const others = committees.filter((item) => item.slug !== committee.slug).slice(0, 3)

  const trail = [
    { label: 'Committee', href: '/committee' },
    { label: committee.name, href: `/committees/${committee.slug}` },
  ]

  return (
    <>
      <Seo
        title={committee.name}
        description={committee.summary}
        schema={breadcrumbSchema(trail)}
      />

      <PageHero
        title={committee.name}
        description={committee.summary}
        trail={trail}
        image={{ src: committeeHero, alt: 'A college function under way in the seminar hall' }}
      />

      <section className="section bg-white">
        <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-16">
          <motion.div
            variants={stagger(0.09)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="lg:col-span-7"
          >
            <motion.span
              variants={fadeUp}
              className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-500 text-white"
            >
              <Icon name={committee.icon} className="h-6 w-6" strokeWidth={1.5} />
            </motion.span>

            <motion.h2 variants={fadeUp} className="display mt-7 text-[28px] sm:text-[34px]">
              About the committee
            </motion.h2>
            <motion.p variants={fadeUp} className="lead mt-6">
              {committee.overview}
            </motion.p>

            {committee.responsibilities?.length ? (
              <>
                <motion.h3
                  variants={fadeUp}
                  className="mt-12 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-600"
                >
                  What the committee does
                </motion.h3>

                <motion.ul variants={stagger(0.06)} className="mt-6 flex flex-col gap-3">
                  {committee.responsibilities.map((item) => (
                    <motion.li
                      key={item.slice(0, 40)}
                      variants={fadeUp}
                      className="flex gap-3.5 rounded-xl border border-ink-100 bg-ink-50/60 p-4 sm:p-5"
                    >
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-500 text-white">
                        <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                      </span>
                      <span className="text-[14px] leading-relaxed text-ink-600">{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </>
            ) : null}

            {committee.members?.length ? (
              <>
                <motion.h3
                  variants={fadeUp}
                  className="mt-12 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-600"
                >
                  Members
                </motion.h3>

                <motion.div variants={stagger(0.06)} className="mt-6 grid gap-4 sm:grid-cols-2">
                  {committee.members.map((member) => (
                    <motion.div
                      key={member.name}
                      variants={fadeUp}
                      className="rounded-xl border border-ink-100 bg-white p-5"
                    >
                      <p className="text-[15px] font-semibold tracking-tight text-ink-900">{member.name}</p>
                      <p className="mt-1.5 text-[12.5px] font-medium text-brand-600">{member.role}</p>
                      <p className="mt-1 text-[12.5px] text-ink-400">{member.designation}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </>
            ) : null}
          </motion.div>

          {/* Contact card */}
          <motion.aside
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="lg:col-span-4 lg:col-start-9"
          >
            <div className="sticky top-28 overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-card">
              <div className="dark-section bg-ink-900 p-7">
                <h3 className="text-[19px] font-semibold text-white">Reach this committee</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-white/50">
                  The college office will put you in touch with the convenor.
                </p>
              </div>

              <dl className="divide-y divide-ink-100">
                <div className="px-7 py-4">
                  <dt className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-ink-400">Email</dt>
                  <dd className="mt-1.5 text-[14px] text-ink-800">
                    <a href={`mailto:${site.email}`} className="hover:text-brand-600">
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div className="px-7 py-4">
                  <dt className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-ink-400">Phone</dt>
                  <dd className="mt-1.5 text-[14px] text-ink-800">
                    <a href={`tel:${site.phones[1].replace(/\s/g, '')}`} className="hover:text-brand-600">
                      {site.phones[0]} / {site.phones[1]}
                    </a>
                  </dd>
                </div>
                <div className="px-7 py-4">
                  <dt className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-ink-400">Campus</dt>
                  <dd className="mt-1.5 text-[14px] leading-relaxed text-ink-800">{site.address.short}</dd>
                </div>
              </dl>

              <div className="border-t border-ink-100 p-7">
                <Button to="/contact" variant="primary" size="md" icon full>
                  Contact the office
                </Button>
              </div>
            </div>
          </motion.aside>
        </div>
      </section>

      {/* Other committees */}
      <section className="section bg-ink-50/70">
        <div className="shell">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <h2 className="display text-[26px] sm:text-[32px]">Other committees</h2>
            <Button to="/committee" variant="outline" icon>
              All committees
            </Button>
          </div>

          <motion.div
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {others.map((item) => (
              <motion.article
                key={item.slug}
                variants={fadeUp}
                className="group relative flex h-full flex-col rounded-2xl border border-ink-100 bg-white p-6 transition-all duration-500 ease-premium hover:-translate-y-1 hover:border-brand-300 hover:shadow-lift"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600 transition-colors duration-500 group-hover:bg-brand-500 group-hover:text-white">
                  <Icon name={item.icon} className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <h3 className="mt-5 text-[16px] font-semibold leading-snug tracking-tight text-ink-900">
                  <Link to={`/committees/${item.slug}`} className="after:absolute after:inset-0 hover:text-brand-600">
                    {item.name}
                  </Link>
                </h3>
                <p className="mt-2.5 flex-1 text-[13.5px] leading-relaxed text-ink-500">{item.summary}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-600">
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
        </div>
      </section>
    </>
  )
}
