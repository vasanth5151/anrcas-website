import { motion } from 'framer-motion'
import { Mail, MapPin, Navigation, Phone } from 'lucide-react'
import Button from './Button'
import SectionHeading from './SectionHeading'
import { fadeUp, viewportOnce } from '../../lib/motion'
import { site } from '../../data/site'

/** Map + address block, shared by the homepage and the contact page. */
export default function LocationSection({ showHeading = true, className }) {
  return (
    <section className={className ?? 'section bg-white'}>
      <div className="shell">
        {showHeading ? (
          <SectionHeading
            title="Our Location"
            description="On the Vadamavandal road in Thiruvannamalai District, with college transport serving the surrounding villages."
            align="center"
          />
        ) : null}

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className={`grid overflow-hidden rounded-[28px] border border-ink-100 shadow-card lg:grid-cols-12 ${
            showHeading ? 'mt-14' : ''
          }`}
        >
          <div className="min-h-[320px] lg:col-span-7 lg:min-h-[460px]">
            <iframe
              title={`Map showing ${site.name}`}
              src={site.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="h-full min-h-[320px] w-full border-0"
            />
          </div>

          <div className="flex flex-col justify-center gap-8 bg-white p-8 sm:p-10 lg:col-span-5 lg:p-12">
            <div>
              <h3 className="text-[22px] font-semibold leading-snug tracking-tight text-ink-900 sm:text-[26px]">
                A.N. Radhakrishnan College of Arts and Science
              </h3>
              <p className="mt-3 text-[14px] text-ink-400">
                {site.approvals[0]} · {site.approvals[1]}
              </p>
            </div>

            <ul className="flex flex-col gap-6">
              <li className="flex gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <MapPin className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-[10.5px] font-semibold uppercase tracking-[0.18em] text-ink-400">
                    Address
                  </span>
                  <span className="mt-1 block text-[14.5px] text-ink-700">
                    {site.address.lines[1]}, {site.address.lines[2]}
                  </span>
                </span>
              </li>
              <li className="flex gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <Phone className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-[10.5px] font-semibold uppercase tracking-[0.18em] text-ink-400">
                    Phone
                  </span>
                  <span className="mt-1 flex flex-wrap gap-x-3 text-[14.5px] text-ink-700">
                    {site.phones.map((phone) => (
                      <a key={phone} href={`tel:${phone.replace(/[\s-]/g, '')}`} className="hover:text-brand-600">
                        {phone}
                      </a>
                    ))}
                  </span>
                </span>
              </li>
              <li className="flex gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <Mail className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-[10.5px] font-semibold uppercase tracking-[0.18em] text-ink-400">
                    Email
                  </span>
                  <a
                    href={`mailto:${site.email}`}
                    className="mt-1 block text-[14.5px] text-ink-700 hover:text-brand-600"
                  >
                    {site.email}
                  </a>
                </span>
              </li>
            </ul>

            <Button
              href={site.mapLink}
              target="_blank"
              rel="noreferrer noopener"
              variant="primary"
              size="lg"
              icon
              iconNode={<Navigation className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />}
              className="self-start"
            >
              Get Directions
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
