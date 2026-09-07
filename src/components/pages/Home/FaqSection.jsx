import { motion } from 'framer-motion'
import { Phone } from 'lucide-react'
import Button from '../../ui/Button'
import FAQ from '../../ui/FAQ'
import SmartImage from '../../ui/SmartImage'
import { fadeUp, imageReveal, stagger, viewportOnce } from '../../../lib/motion'
import { faqs } from '../../../data/content'
import { site } from '../../../data/site'

import faqimage from "../../../assets/images/img-02.webp"

export default function FaqSection() {
  return (
    <section className="section bg-white">
      <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-16">
        <motion.div
          variants={stagger(0.09)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="lg:col-span-5"
        >
          <motion.h2 variants={fadeUp} className="display text-[32px] sm:text-[40px] lg:text-[46px]">
            Have Questions?
            <br />
            <span className="text-brand-500">We Have Answers.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="lead mt-6">
            The questions families ask us most often, answered plainly. If yours is not here, the college office is
            a phone call away.
          </motion.p>

          <motion.div variants={imageReveal} className="mt-10">
            <SmartImage
              src={faqimage}
              alt="Students discussing coursework around a study table"
              ratio="wide"
              className="rounded-[22px] border border-ink-100 shadow-card"
              sizes="(max-width: 1024px) 92vw, 460px"
            />
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col gap-4 rounded-2xl border border-ink-100 bg-ink-50/70 p-6 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-500 text-white">
                <Phone className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
              </span>
              <div>
                <p className="text-[13px] text-ink-400">Speak to the college office</p>
                <a
                  href={`tel:${site.phones[1].replace(/\s/g, '')}`}
                  className="text-[15px] font-semibold text-ink-900 hover:text-brand-600"
                >
                  {site.phones[1]}
                </a>
              </div>
            </div>
            <Button to="/contact" variant="outline" size="sm" icon>
              Contact us
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="lg:col-span-6 lg:col-start-7 lg:pt-10"
        >
          <FAQ items={faqs} />
        </motion.div>
      </div>
    </section>
  )
}
