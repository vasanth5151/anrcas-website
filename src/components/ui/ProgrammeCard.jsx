import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Icon from './Icon'
import SmartImage from './SmartImage'
import { categoryLabel, programmeImage, programmePath } from '../../data/programmes'
import { cx } from '../../lib/cx'

export default function ProgrammeCard({ programme, className }) {
  const image = programmeImage(programme.slug)

  return (
    <Link
      to={programmePath(programme)}
      className={cx(
        'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white transition-all duration-500 ease-premium hover:-translate-y-1 hover:border-brand-300 hover:shadow-lift',
        className,
      )}
    >
      <SmartImage
        src={image.src}
        alt={image.alt}
        ratio="wide"
        imgClassName="transition-transform duration-[900ms] ease-premium group-hover:scale-[1.07]"
        sizes="(max-width: 768px) 88vw, (max-width: 1280px) 45vw, 380px"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/55 via-ink-950/5 to-transparent" />
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-md bg-white/92 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-brand-600 backdrop-blur">
          <Icon name={programme.icon} className="h-3.5 w-3.5" strokeWidth={1.9} />
          {categoryLabel(programme.category)}
        </span>
        <span className="absolute bottom-4 left-4 text-[12px] font-medium text-white/85">
          {programme.duration}
        </span>
      </SmartImage>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-[19px] font-semibold leading-snug tracking-tight text-ink-900 transition-colors duration-300 group-hover:text-brand-600">
          {programme.name}
        </h3>
        <p className="mt-3 flex-1 text-[14px] leading-relaxed text-ink-500">{programme.excerpt}</p>

        <span className="mt-6 inline-flex items-center gap-2 text-[13.5px] font-medium text-brand-600">
          Explore Programme
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={1.8}
            aria-hidden="true"
          />
        </span>
      </div>

      <span
        className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 w-0 bg-brand-500 transition-all duration-500 ease-premium group-hover:w-full"
        aria-hidden="true"
      />
    </Link>
  )
}
