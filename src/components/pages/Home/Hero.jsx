import { motion } from 'framer-motion'
import { ArrowDown, GraduationCap, Landmark, Sparkles } from 'lucide-react'
import Button from '../../ui/Button'
import SmartImage from '../../ui/SmartImage'
import { ease, fadeUp, stagger, wordChild, wordParent } from '../../../lib/motion'
import { usePointerParallax } from '../../../lib/hooks'

import founder from "../../../assets/images/founder-anr.webp"

const headline = [
  [{ text: 'Shape' }, { text: 'Your' }, { text: 'Future' }],
  [{ text: 'Through' }, { text: 'Excellence', accent: true }],
  [{ text: 'in' }, { text: 'Education', accent: true }],
]

export default function Hero() {
  const pointer = usePointerParallax()

  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-ink-950 pb-20 pt-[176px] lg:pb-24 lg:pt-[210px]">
      {/* Ambient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-bg-dark opacity-[0.55]" />
        <motion.div
          animate={{ x: pointer.x * -18, y: pointer.y * -14 }}
          transition={{ type: 'spring', stiffness: 40, damping: 22 }}
          className="absolute -left-40 top-10 h-[520px] w-[520px] rounded-full bg-brand-600/22 blur-[140px]"
        />
        <motion.div
          animate={{ x: pointer.x * 14, y: pointer.y * 12 }}
          transition={{ type: 'spring', stiffness: 40, damping: 22 }}
          className="absolute -right-32 bottom-0 h-[460px] w-[460px] rounded-full bg-brand-400/16 blur-[140px]"
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white/95 to-transparent" />
      </div>

      <div className="shell grid w-full items-center gap-14 lg:grid-cols-12 lg:gap-10">
        {/* Copy */}
        <motion.div variants={stagger(0.1)} initial="hidden" animate="show" className="lg:col-span-6 xl:col-span-6">
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-[10.5px] font-semibold uppercase tracking-[0.2em] text-brand-300 backdrop-blur"
          >
            WELCOME TO THE HUB OF EXCELLENCE
          </motion.span>

          {/* Full institutional name, the hero's formal identification line. */}
          <motion.p
            variants={fadeUp}
            className="mt-7 text-[12px] font-semibold uppercase leading-relaxed tracking-[0.16em] text-white/70 sm:text-[13.5px]"
          >
            A.N. Radhakrishnan College of Arts and Science
            <span className="mx-2 text-white/25" aria-hidden="true">
              &mdash;
            </span>
            <span className="text-brand-300">Excellence in Education</span>
          </motion.p>

          <motion.h1
            variants={wordParent}
            className="display mt-5 text-[40px] text-white sm:text-[56px] lg:text-[62px] xl:text-[70px]"
          >
            {headline.map((line, lineIndex) => (
              <span key={lineIndex} className="block overflow-hidden">
                {line.map((word) => (
                  <motion.span key={word.text} variants={wordChild} className="mr-[0.28em] inline-block">
                    {word.accent ? <span className="text-brand-400">{word.text}</span> : word.text}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-7 max-w-xl text-[16.5px] leading-relaxed text-white/60 sm:text-lg">
            Empowering students with knowledge, skills and opportunities for a successful future at Vadamavandal,
            Thiruvannamalai District, since 1958.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button to="/programmes" size="lg" variant="primary" icon>
              Explore Programmes
            </Button>
            <Button to="/admission" size="lg" variant="light">
              Admission Enquiry
            </Button>
          </motion.div>

          <motion.dl
            variants={fadeUp}
            className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-8"
          >
            {[
              { value: '65+', label: 'Years of service' },
              { value: '1000+', label: 'Students on campus' },
              { value: '7+', label: 'Programmes offered' },
            ].map((item) => (
              <div key={item.label}>
                <dd className="text-[26px] font-semibold tracking-tight text-white sm:text-[30px]">{item.value}</dd>
                <dt className="mt-1 text-[12px] leading-snug text-white/45">{item.label}</dt>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* Layered imagery */}
        <div className="relative lg:col-span-6 xl:col-span-6">
          <motion.div
            animate={{ x: pointer.x * 10, y: pointer.y * 8 }}
            transition={{ type: 'spring', stiffness: 45, damping: 20 }}
            className="relative mx-auto w-full max-w-[300px] sm:max-w-[360px] lg:mr-0 lg:max-w-[420px]"
          >
            <motion.div
              initial={{ opacity: 0, scale: 1.04, y: 26 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.15 }}
              className="relative overflow-hidden rounded-[28px] border border-white/12 shadow-[0_60px_120px_-50px_rgba(0,0,0,.85)]"
            >
              <SmartImage
                src={founder}
                alt="A.N. Radhakrishnan, founder of the college"
                ratio="portrait"
                priority
                sizes="(max-width: 640px) 300px, (max-width: 1024px) 360px, 420px"
                className="bg-ink-800"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
            </motion.div>


            {/* Floating admissions card */}
            <motion.div
              initial={{ opacity: 0, x: 30, y: -16 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.6 }}
              className="absolute -right-3 top-8 flex items-center gap-3 rounded-2xl border border-white/12 bg-ink-900/80 px-4 py-3 backdrop-blur-xl sm:-right-6"
            >
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-white text-brand-600">
                <GraduationCap className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-[13px] font-medium text-white">Admissions Open</span>
                <span className="text-[11.5px] text-white/45">UG &amp; PG programmes</span>
              </span>
            </motion.div>

            {/* Decorative frame */}
            <div
              className="pointer-events-none absolute -bottom-5 -right-5 -z-10 h-32 w-32 rounded-[24px] border border-brand-400/25"
              aria-hidden="true"
            />
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#trust"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        aria-label="Scroll to content"
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-white/40 transition-colors hover:text-white lg:flex"
      >
        Scroll
        <ArrowDown className="h-3.5 w-3.5 animate-bounce" strokeWidth={1.8} aria-hidden="true" />
      </motion.a>
    </section>
  )
}
