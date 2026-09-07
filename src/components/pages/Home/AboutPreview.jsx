import { motion } from 'framer-motion'
import Button from '../../ui/Button'
import SmartImage from '../../ui/SmartImage'
import Reveal from '../../ui/Reveal'
import { fadeUp, imageReveal, slideInRight, stagger, viewportOnce } from '../../../lib/motion'
import aboutPrimary from '../../../assets/images/22.webp'
import aboutSecondary from '../../../assets/images/17.webp'
import awardStar from '../../../assets/images/award-img-1.webp'
import awardMedal from '../../../assets/images/award-img-2.webp'
import { awards } from '../../../data/content'

const awardMarks = { awardStar, awardMedal }

export default function AboutPreview() {
  return (
    <section className="section relative overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute -left-56 top-1/3 h-[420px] w-[420px] rounded-full bg-brand-100/50 blur-[130px]"
        aria-hidden="true"
      />

      <div className="shell relative grid gap-16 lg:grid-cols-12 lg:gap-12">
        {/* Collage */}
        <div className="lg:col-span-5">
          <div className="relative">
            <Reveal variants={imageReveal}>
              <SmartImage
                src={aboutPrimary}
                alt="Faculty and students during a computer laboratory session"
                ratio="portrait"
                className="rounded-[24px] border border-ink-100 shadow-card"
                sizes="(max-width: 1024px) 90vw, 460px"
              />
            </Reveal>

            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-10 -right-4 w-[52%] overflow-hidden rounded-[20px] border-4 border-white shadow-lift sm:-right-8"
            >
              <SmartImage
                src={aboutSecondary}
                alt="Inauguration of a college programme by the management and faculty"
                ratio="square"
                sizes="(max-width: 1024px) 45vw, 240px"
              />
            </motion.div>
          </div>
        </div>

        {/* Copy */}
        <motion.div
          variants={stagger(0.09)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="lg:col-span-6 lg:col-start-7 lg:pt-6"
        >
          <motion.h2
            variants={slideInRight}
            className="display text-[34px] leading-[1.06] sm:text-[44px] lg:text-[52px]"
          >
            <span className="block text-ink-900">We Focus on Providing</span>
            <span className="mt-1.5 block bg-gradient-to-r from-brand-600 via-brand-500 to-brand-400 bg-clip-text text-transparent">
              You the Best Education
            </span>
          </motion.h2>

          <motion.p variants={fadeUp} className="lead mt-7">
            A.N. Radhakrishnan College of Arts and Science was founded to bring higher education within reach of
            students in Vadamavandal and the villages around it. Six decades on, that purpose has not changed.
          </motion.p>

          <motion.p variants={fadeUp} className="mt-5 text-[15px] leading-relaxed text-ink-500">
            Approved by the Government of Tamil Nadu and affiliated to Thiruvalluvar University, Vellore, the college
            offers undergraduate and postgraduate programmes across science, commerce, management and languages.
            Teaching here is deliberately personal, small cohorts, faculty who know every student by name, and a
            support system that carries first-generation learners through to graduation.
          </motion.p>

          {/* Institutional honours */}
          <motion.ul variants={fadeUp} className="mt-10 flex flex-col gap-7">
            {awards.map((award) => (
              <li key={award.title} className="flex items-start gap-5">
                <span className="grid h-[76px] w-[76px] shrink-0 place-items-center overflow-hidden rounded-[14px] bg-ink-950 shadow-card">
                  <img
                    src={awardMarks[award.mark]}
                    alt=""
                    width={146}
                    height={122}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </span>
                <div className="min-w-0">
                  <p className="display text-[26px] leading-none text-ink-900 sm:text-[30px]">{award.year}</p>
                  <p className="mt-2.5 text-[16px] font-semibold tracking-tight text-ink-900">{award.title}</p>
                  <p className="mt-1.5 max-w-md text-[14px] leading-relaxed text-ink-400">{award.description}</p>
                </div>
              </li>
            ))}
          </motion.ul>

          <motion.div variants={fadeUp} className="mt-10">
            <Button to="/about" variant="primary" size="lg" icon>
              More About Us
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
