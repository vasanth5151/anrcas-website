import { Link } from 'react-router-dom'
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import Icon from './Icon'
import Logo from './Logo'
import { site } from '../../data/site'
import groupLogo from '../../assets/images/meenakshi-group-logo.png'
import { programmePath, programmes } from '../../data/programmes'

const quickLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Academics', href: '/academics' },
  { label: 'Programmes', href: '/programmes' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Facilities', href: '/facilities' },
  { label: 'Committee', href: '/committee' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'Contact', href: '/contact' },
]

export default function Footer() {
  return (
    <footer className="dark-section relative overflow-hidden bg-ink-900 text-white">
      <div className="pointer-events-none absolute inset-0 grid-bg-dark opacity-40" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-brand-500/12 blur-[120px]"
        aria-hidden="true"
      />

      <div className="shell relative">
        <div className="grid gap-12 border-b border-white/10 py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
          <div className="lg:col-span-4">
            <Logo size="lg" />
            <p className="mt-6 max-w-sm text-[14.5px] leading-relaxed text-white/55">
              A.N. Radhakrishnan College of Arts and Science has served the students of Vadamavandal and
              Thiruvannamalai District since {site.established}, approved by the Government of Tamil Nadu and
              affiliated to Thiruvalluvar University, Vellore.
            </p>
            <p className="mt-5 text-[12px] font-medium uppercase tracking-[0.2em] text-brand-400">
              {site.tagline}
            </p>

            <div className="mt-7 inline-flex items-center gap-3 rounded-xl bg-white px-4 py-3">
              <img
                src={groupLogo}
                alt="Meenakshi Group of Institutions, K.K. Nagar, Chennai"
                width={320}
                height={96}
                loading="lazy"
                decoding="async"
                className="h-8 w-auto"
              />
            </div>

            <div className="mt-7 flex items-center gap-2.5">
              {site.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={social.label}
                  className="grid h-10 w-10 place-items-center rounded-lg border border-white/12 text-white/60 transition-all duration-300 hover:border-brand-400/60 hover:bg-brand-500/10 hover:text-brand-300"
                >
                  <Icon name={social.icon} className="h-4 w-4" strokeWidth={1.7} />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Quick Links" className="lg:col-span-2">
            {quickLinks.map((link) => (
              <FooterLink key={link.href} to={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Our Programmes" className="lg:col-span-3">
            {programmes.map((programme) => (
              <FooterLink key={programme.slug} to={programmePath(programme)}>
                {programme.name}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Get in Touch" className="lg:col-span-3">
            <li className="flex gap-3 text-[14px] text-white/55">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" strokeWidth={1.7} aria-hidden="true" />
              <span>
                {site.address.lines[1]},<br />
                {site.address.lines[2]}
              </span>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="flex gap-3 text-[14px] text-white/55 transition-colors hover:text-brand-300"
              >
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" strokeWidth={1.7} aria-hidden="true" />
                {site.email}
              </a>
            </li>
            <li className="flex gap-3 text-[14px] text-white/55">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" strokeWidth={1.7} aria-hidden="true" />
              <span className="flex flex-col gap-1">
                {site.phones.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/[\s-]/g, '')}`}
                    className="transition-colors hover:text-brand-300"
                  >
                    {phone}
                  </a>
                ))}
              </span>
            </li>
            <li className="pt-2">
              <a
                href={site.mapLink}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-brand-300 transition-colors hover:text-brand-200"
              >
                Get Directions
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden="true" />
              </a>
            </li>
          </FooterColumn>
        </div>

        {/* pr-16 keeps the last line clear of the floating back-to-top control */}
        <div className="flex flex-col items-center justify-between gap-4 py-7 text-[12.5px] text-white/40 sm:flex-row sm:pr-16">
          <p>Copyright © 2026 ANR College of Arts &amp; Science. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, children, className }) {
  return (
    <div className={className}>
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white">{title}</h2>
      <ul className="mt-6 flex flex-col gap-3">{children}</ul>
    </div>
  )
}

function FooterLink({ to, children }) {
  return (
    <li>
      <Link
        to={to}
        className="group inline-flex items-center gap-1.5 text-[14px] text-white/55 transition-colors duration-300 hover:text-brand-300"
      >
        <span className="h-px w-0 bg-brand-400 transition-all duration-300 ease-premium group-hover:w-3" aria-hidden="true" />
        {children}
      </Link>
    </li>
  )
}
