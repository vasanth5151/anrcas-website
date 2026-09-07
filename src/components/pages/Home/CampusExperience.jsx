import { motion } from 'framer-motion'
import { ZoomIn } from 'lucide-react'
import Button from '../../ui/Button'
import SectionHeading from '../../ui/SectionHeading'
import SmartImage from '../../ui/SmartImage'
import { useLightbox } from '../../ui/Lightbox'
import { fadeUp, stagger, viewportOnce } from '../../../lib/motion'
import campusStudents from '../../../assets/images/img-02.webp'
import campusComputerLab from '../../../assets/images/22.webp'
import campusInauguration from '../../../assets/images/17.webp'
import campusCeremony from '../../../assets/images/11.webp'
import campusGroupPhoto from '../../../assets/images/img-01.webp'
import { cx } from '../../../lib/cx'

const campus = [
  { src: campusStudents, alt: 'Students and faculty at an awareness programme on campus' },
  { src: campusComputerLab, alt: 'A computer laboratory session in progress' },
  { src: campusInauguration, alt: 'Inauguration of a college programme by the management and faculty' },
  { src: campusCeremony, alt: 'A traditional ceremony held on the college campus' },
  { src: campusGroupPhoto, alt: 'Students and staff gathered for a departmental group photograph' },
  {
    src: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=72',
    alt: 'Athletics practice ahead of the annual sports meet',
  },
]

/** Asymmetric editorial gallery, deliberately not a uniform card grid. */
const layout = [
  'sm:col-span-7 sm:row-span-2 aspect-[4/5] sm:aspect-auto sm:min-h-[440px]',
  'sm:col-span-5 aspect-[16/11]',
  'sm:col-span-5 aspect-[16/11]',
  'sm:col-span-4 aspect-[4/3]',
  'sm:col-span-4 aspect-[4/3]',
  'sm:col-span-4 aspect-[4/3]',
]

export default function CampusExperience() {
  const items = campus.map((image, index) => ({ ...image, full: image.src, id: index }))
  const lightbox = useLightbox(items)

  return (
    <section className="section bg-white">
      <div className="shell">
        <SectionHeading
          title="Experience Life at ANR"
          description="Classrooms and laboratories, sport and culture, seminars and service, the parts of college that shape a student as much as the syllabus does."
          action={
            <Button to="/gallery" variant="outline" icon>
              Open full gallery
            </Button>
          }
        />

        <motion.div
          variants={stagger(0.07)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 grid gap-4 sm:grid-cols-12"
        >
          {items.map((image, index) => (
            <motion.button
              key={image.src}
              variants={fadeUp}
              type="button"
              onClick={() => lightbox.open(index)}
              aria-label={`View image: ${image.alt}`}
              className={cx(
                'group relative overflow-hidden rounded-2xl border border-ink-100 bg-ink-50 text-left',
                layout[index],
              )}
            >
              <SmartImage
                src={image.src}
                alt={image.alt}
                ratio="auto"
                className="h-full w-full"
                imgClassName="transition-transform duration-[1000ms] ease-premium group-hover:scale-[1.07]"
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 32vw"
              />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="pointer-events-none absolute inset-x-5 bottom-5 flex translate-y-3 items-end justify-between gap-4 opacity-0 transition-all duration-500 ease-premium group-hover:translate-y-0 group-hover:opacity-100">
                <span className="max-w-[70%] text-[13.5px] font-medium leading-snug text-white">{image.alt}</span>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/15 text-white backdrop-blur">
                  <ZoomIn className="h-4 w-4" strokeWidth={1.8} />
                </span>
              </span>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {lightbox.render}
    </section>
  )
}
