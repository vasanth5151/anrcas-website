import { motion } from 'framer-motion'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import AdmissionForm from '../../ui/AdmissionForm'
import { fadeUp, viewportOnce } from '../../../lib/motion'
import { site } from '../../../data/site'

const details = [
  { icon: MapPin, label: 'Campus', value: site.address.short },
  { icon: Phone, label: 'Phone', value: `${site.phones[0]} · ${site.phones[1]}`, href: `tel:${site.phones[1].replace(/\s/g, '')}` },
  { icon: Mail, label: 'Email', value: site.email, href: `mailto:${site.email}` },
  { icon: Clock, label: 'Office Hours', value: 'Monday to Saturday · 9:00 am to 4:00 pm' },
]

export default function EnquirySection() {
  return (
    <section id="enquiry" className="section bg-ink-50/70">
      <div className="shell">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid overflow-hidden rounded-[28px] border border-ink-100 bg-white shadow-card lg:grid-cols-12"
        >
          {/* Dark information panel */}
          <div className="dark-section relative overflow-hidden bg-ink-900 p-8 sm:p-10 lg:col-span-5 lg:p-12">
            <div className="pointer-events-none absolute inset-0 grid-bg-dark opacity-40" aria-hidden="true" />
            <div
              className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-brand-500/20 blur-[110px]"
              aria-hidden="true"
            />

            <div className="relative">
              <h2 className="display text-[30px] text-white sm:text-[36px]">
                Talk to our admission team.
              </h2>
              <p className="mt-5 text-[14.5px] leading-relaxed text-white/55">
                Send us your details and we will call you back with everything you need, eligibility, documents,
                fee structure, scholarships and transport routes.
              </p>

              <ul className="mt-10 flex flex-col gap-6 border-t border-white/10 pt-8">
                {details.map((detail) => (
                  <li key={detail.label} className="flex gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/[0.06] text-brand-300">
                      <detail.icon className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/35">
                        {detail.label}
                      </span>
                      {detail.href ? (
                        <a
                          href={detail.href}
                          className="mt-1 text-[14.5px] text-white/85 transition-colors hover:text-brand-300"
                        >
                          {detail.value}
                        </a>
                      ) : (
                        <span className="mt-1 text-[14.5px] text-white/85">{detail.value}</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="p-8 sm:p-10 lg:col-span-7 lg:p-12">
            <h3 className="text-[20px] font-semibold tracking-tight text-ink-900">Submit your enquiry</h3>
            <p className="mt-2 text-[14px] text-ink-500">
              Fields marked with <span className="text-brand-500">*</span> are required.
            </p>
            <div className="mt-8">
              <AdmissionForm />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
