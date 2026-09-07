import { motion } from 'framer-motion'
import Seo, { breadcrumbSchema } from '../../../lib/Seo'
import PageHero from '../../ui/PageHero'
import GalleryGrid from '../../ui/GalleryGrid'
import Button from '../../ui/Button'
import { fadeUp, stagger, viewportOnce } from '../../../lib/motion'
import { galleryItems } from '../../../data/gallery'
import galleryHero from '../../../assets/gallery/gallery-1.webp'

const trail = [{ label: 'Gallery', href: '/gallery' }]

export default function GalleryPage() {
  return (
    <>
      <Seo
        title="Gallery"
        description="Photographs from A.N. Radhakrishnan College of Arts and Science, Vadamavandal, inaugurations, seminars, laboratories, sports and cultural days."
        schema={breadcrumbSchema(trail)}
      />

      <PageHero
        title="Gallery"
        description="Inaugurations and seminars, laboratories and library, sports and cultural days, the parts of college life a prospectus cannot describe."
        trail={trail}
        image={{ src: galleryHero, alt: 'Students and staff at a college programme on campus' }}
        meta={[
          { label: 'Photographs', value: `${galleryItems.length}` },
          { label: 'Campus', value: 'Vadamavandal' },
        ]}
      />

      <section className="section relative overflow-hidden bg-white">
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
            className="mx-auto max-w-3xl text-center"
          >
            <motion.h2 variants={fadeUp} className="display text-[30px] sm:text-[38px] lg:text-[44px]">
              Gallery
              <span className="mt-3 block text-[17px] font-medium tracking-tight text-brand-600 sm:text-[19px]">
                ANR College of Arts &amp; Science, Vadamavandal
              </span>
            </motion.h2>
            <motion.p variants={fadeUp} className="lead mx-auto mt-6">
              A record of the college year, kept by the office. Select any photograph to view it full size, and use
              the arrow keys to move through the set.
            </motion.p>
          </motion.div>

          <GalleryGrid items={galleryItems} className="mt-14" />

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-16 flex flex-col items-center gap-4 rounded-2xl border border-ink-100 bg-ink-50/70 px-8 py-10 text-center"
          >
            <h3 className="text-[22px] font-semibold tracking-tight text-ink-900">Come and see the campus</h3>
            <p className="max-w-xl text-[14.5px] text-ink-500">
              Photographs only go so far. The college office will arrange a visit on any working day.
            </p>
            <div className="mt-2 flex flex-wrap justify-center gap-3">
              <Button to="/admission" variant="primary" icon>
                Admission enquiry
              </Button>
              <Button to="/contact" variant="outline">
                Contact the office
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
