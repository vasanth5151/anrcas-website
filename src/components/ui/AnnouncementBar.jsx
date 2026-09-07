import { BadgeCheck, Landmark } from 'lucide-react'
import { site } from '../../data/site'

/**
 * Credential strip that sits above the navbar: the government approval on the
 * left and the university affiliation on the right, both on brand blue. It
 * scrolls away with the page (the navbar collapses it).
 */
export default function AnnouncementBar() {
  return (
    <div className="w-full bg-brand-500 text-white">
      <div className="shell flex h-10 items-center justify-between gap-6">
        <Credential icon={BadgeCheck} label={site.approvals[0]} />
        <Credential icon={Landmark} label={site.approvals[1]} className="hidden sm:flex" />
      </div>
    </div>
  )
}

function Credential({ icon: Icon, label, className = '' }) {
  return (
    <span
      className={`flex min-w-0 items-center gap-2.5 text-[12.5px] font-medium tracking-tight ${className}`}
    >
      <span
        className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white/20 ring-1 ring-white/40"
        aria-hidden="true"
      >
        <Icon className="h-3.5 w-3.5 text-white" strokeWidth={2} />
      </span>
      <span className="truncate">{label}</span>
    </span>
  )
}
