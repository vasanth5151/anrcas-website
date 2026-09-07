import { motion } from 'framer-motion'
import { Clock, Headset, Mail, MapPin, Navigation } from 'lucide-react'
import Seo, { breadcrumbSchema } from '../../../lib/Seo'
import PageHero from '../../ui/PageHero'
import Button from '../../ui/Button'
import Icon from '../../ui/Icon'
import { fadeUp, stagger, viewportOnce } from '../../../lib/motion'
import { site } from '../../../data/site'
import contactHero from '../../../assets/images/22.webp'

const trail = [{ label: 'Contact', href: '/contact' }]

const channels = [
  {
    icon: Headset,
    label: 'Call us',
    values: site.phones,
    hrefs: site.phones.map((phone) => `tel:${phone.replace(/[\s-]/g, '')}`),
  },
  {
    icon: Mail,
    label: 'Email address',
    values: [site.email],
    hrefs: [`mailto:${site.email}`],
  },
  {
    icon: MapPin,
    label: 'Location',
    values: [site.address.lines[1], site.address.lines[2]],
  },
]

export default function ContactPage() {
  return (
    <>
      <Seo
        title="Contact"
        description="Contact A.N. Radhakrishnan College of Arts and Science, Vadamavandal, Thiruvannamalai District, phone 04182-247518, +91 8939804020, email admin@anrcas.edu.in."
        schema={breadcrumbSchema(trail)}
      />

      <PageHero
        title="Contact"
        description="Admissions, academics, transport or anything else, the college office will answer."
        trail={trail}
        image={{ src: contactHero, alt: 'Students at work in the college computer laboratory' }}
      />

      <section className="section relative overflow-hidden bg-white pb-0">
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
            className="max-w-3xl"
          >
            <motion.h2 variants={fadeUp} className="display text-[30px] sm:text-[38px] lg:text-[44px]">
              Contact ANR College of Arts &amp; Science
              <span className="mt-2 block text-brand-600">Vadamavandal, Thiruvannamalai</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="lead mt-6">
              The office is open through the working week. Call, write, or come to the campus, directions are on
              the map below.
            </motion.p>
          </motion.div>

          {/* Contact channels */}
          <motion.div
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-14 grid gap-5 md:grid-cols-3"
          >
            {channels.map((channel) => (
              <motion.div
                key={channel.label}
                variants={fadeUp}
                className="group relative overflow-hidden rounded-[22px] border border-ink-100 bg-white p-7 shadow-card transition-all duration-500 ease-premium hover:-translate-y-1.5 hover:border-brand-300 hover:shadow-lift sm:p-8"
              >
                <span
                  className="absolute inset-x-0 top-0 h-1 scale-x-0 bg-gradient-to-r from-brand-600 via-brand-500 to-brand-400 transition-transform duration-500 ease-premium group-hover:scale-x-100"
                  aria-hidden="true"
                />

                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-600 transition-colors duration-500 group-hover:bg-brand-500 group-hover:text-white">
                  <channel.icon className="h-6 w-6" strokeWidth={1.6} aria-hidden="true" />
                </span>

                <h3 className="mt-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-600">
                  {channel.label}
                </h3>

                <div className="mt-3 flex flex-col gap-1">
                  {channel.values.map((value, index) =>
                    channel.hrefs?.[index] ? (
                      <a
                        key={value}
                        href={channel.hrefs[index]}
                        className="text-[17px] font-semibold tracking-tight text-ink-900 transition-colors hover:text-brand-600"
                      >
                        {value}
                      </a>
                    ) : (
                      <p key={value} className="text-[17px] font-semibold leading-snug tracking-tight text-ink-900">
                        {value}
                      </p>
                    ),
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Office hours + enquiry */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-5 flex flex-col items-start justify-between gap-6 rounded-[22px] border border-ink-100 bg-ink-50/70 p-7 sm:flex-row sm:items-center sm:p-8"
          >
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white text-brand-600 shadow-card">
                <Clock className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-600">Office hours</p>
                <p className="mt-1.5 text-[15px] font-medium tracking-tight text-ink-900">
                  Monday to Saturday · 9:00 am to 4:00 pm
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button to="/admission" variant="primary" icon>
                Admission enquiry
              </Button>
              <Button href={site.mapLink} variant="outline" iconNode={<Navigation className="h-4 w-4" />} icon>
                Get directions
              </Button>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-10 flex items-center gap-3"
          >
            {site.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={social.label}
                className="grid h-11 w-11 place-items-center rounded-xl border border-ink-200 text-ink-500 transition-all duration-300 hover:border-brand-400 hover:bg-brand-50 hover:text-brand-600"
              >
                <Icon name={social.icon} className="h-4 w-4" strokeWidth={1.7} />
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Map, full bleed, with the address card riding over it. */}
      <section className="relative mt-20 sm:mt-24">
        <div className="relative h-[420px] w-full sm:h-[520px]">
          <iframe
            title={`Map showing ${site.name}`}
            src={site.mapEmbed}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="h-full w-full border-0"
          />

          <div className="pointer-events-none absolute inset-0 flex items-start">
            <div className="shell w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-auto mt-8 max-w-sm rounded-[22px] border border-ink-100 bg-white/95 p-7 shadow-lift backdrop-blur sm:mt-10"
              >
                <h3 className="text-[17px] font-semibold leading-snug tracking-tight text-ink-900">{site.name}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-ink-500">
                  {site.address.lines[1]}, {site.address.lines[2]}
                </p>
                <p className="mt-3 text-[12.5px] leading-relaxed text-ink-400">
                  {site.approvals[0]} · {site.approvals[1]}
                </p>
                <Button
                  href={site.mapLink}
                  variant="primary"
                  size="sm"
                  icon
                  iconNode={<Navigation className="h-3.5 w-3.5" />}
                  className="mt-6"
                >
                  Open in Google Maps
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
