import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Button from '../../ui/Button'
import SmartImage from '../../ui/SmartImage'
import { fadeUp, stagger, viewportOnce } from '../../../lib/motion'
import { site } from '../../../data/site'

const admissionCta =
  'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1800&q=72'

export default function AdmissionCta() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <section ref={ref} className="dark-section relative isolate overflow-hidden bg-ink-950">
      <motion.div style={{ y }} className="absolute inset-0 -z-10 h-[112%]">
        <SmartImage
          src={admissionCta}
          alt="Graduates throwing their caps in the air at the convocation ceremony"
          ratio="auto"
          className="h-full w-full"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/55" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950/90 via-transparent to-ink-950/60" />

      <div className="shell py-24 sm:py-28 lg:py-36">
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="max-w-3xl"
        >
          <motion.h2
            variants={fadeUp}
            className="display text-[38px] text-white sm:text-[54px] lg:text-[68px]"
          >
            Your Future Starts Here.
          </motion.h2>

          <motion.p variants={fadeUp} className="mt-6 max-w-xl text-[16.5px] leading-relaxed text-white/65 sm:text-lg">
            Take the first step towards a successful academic journey. Our admission office will guide you through
            eligibility, documents, fees and transport.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button to="/admission" size="lg" variant="primary" icon>
              Apply for Admission
            </Button>
            <Button to="/contact" size="lg" variant="light">
              Talk to Us
            </Button>
          </motion.div>

          <motion.p variants={fadeUp} className="mt-9 text-[13px] text-white/45">
            Call{' '}
            <a href={`tel:${site.phones[0].replace(/[\s-]/g, '')}`} className="text-white/80 hover:text-brand-300">
              {site.phones[0]}
            </a>{' '}
            or{' '}
            <a href={`tel:${site.phones[1].replace(/\s/g, '')}`} className="text-white/80 hover:text-brand-300">
              {site.phones[1]}
            </a>{' '}
            · {site.address.short}
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
