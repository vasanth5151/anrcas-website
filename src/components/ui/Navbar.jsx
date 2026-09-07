import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronDown, Mail, MapPin, Menu, Phone, X } from 'lucide-react'
import AnnouncementBar from './AnnouncementBar'
import Button from './Button'
import Logo from './Logo'
import groupLogo from '../../assets/images/meenakshi-group-logo.png'
import { navigation, site } from '../../data/site'
import { useEscapeKey, useLockBodyScroll, useScrolled } from '../../lib/hooks'
import { ease } from '../../lib/motion'
import { cx } from '../../lib/cx'

/**
 * Three-tier header:
 *   1. brand-blue credential strip (approval + affiliation)
 *   2. white identity row, college logo, contact details, group logo on the right
 *   3. blue navigation pill that overlaps the identity row and carries the menu
 *
 * Tiers 1 and 2 collapse on scroll so only the navigation pill stays docked at
 * the top of the viewport.
 */
export default function Navbar() {
  const scrolled = useScrolled(24)
  const { pathname } = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState(null)

  useLockBodyScroll(mobileOpen)
  useEscapeKey(
    useCallback(() => {
      setMobileOpen(false)
      setOpenMenu(null)
    }, []),
  )

  useEffect(() => {
    setMobileOpen(false)
    setOpenMenu(null)
  }, [pathname])

  const collapsed = scrolled && !mobileOpen

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brand-500 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to content
      </a>

      {/* Tier 1 + 2, collapse together once the page scrolls. */}
      <motion.div
        initial={false}
        animate={{ height: collapsed ? 0 : 'auto', opacity: collapsed ? 0 : 1 }}
        transition={{ duration: 0.4, ease }}
        className="overflow-hidden"
      >
        <AnnouncementBar />
        <IdentityRow />
      </motion.div>

      {/* Tier 3, the navigation pill. */}
      <div
        className={cx(
          'shell transition-[margin] duration-500 ease-premium',
          collapsed ? 'mt-0' : '-mt-5 lg:-mt-6',
        )}
        onMouseLeave={() => setOpenMenu(null)}
      >
        <nav
          className={cx(
            'relative flex items-center gap-4 bg-brand-500 px-4 text-white transition-all duration-500 ease-premium sm:px-6',
            collapsed
              ? 'h-[62px] rounded-b-2xl shadow-[0_18px_40px_-24px_rgba(16,24,40,.55)]'
              : 'h-[60px] rounded-2xl shadow-[0_18px_45px_-22px_rgba(23,155,215,.75)] lg:h-[64px]',
          )}
          aria-label="Primary"
        >
          {/* The crest rides along inside the pill once the identity row is gone. */}
          <AnimatePresence initial={false}>
            {collapsed ? (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.35, ease }}
                className="overflow-hidden"
              >
                <Logo compact className="mr-1 rounded-lg bg-white px-2.5 py-1" />
              </motion.div>
            ) : null}
          </AnimatePresence>

          <ul className="hidden items-center gap-0.5 xl:flex">
            {navigation.map((item) => (
              <NavItem
                key={item.label}
                item={item}
                open={openMenu === item.label}
                onOpen={() => setOpenMenu(item.label)}
                onClose={() => setOpenMenu(null)}
              />
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-2">
            <Button
              to="/admission"
              size="sm"
              variant="solidLight"
              icon
              className="h-10 rounded-full px-4 font-semibold text-brand-600 sm:px-5"
            >
              <span className="sm:hidden">Apply</span>
              <span className="hidden sm:inline">Admission</span>
            </Button>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/35 text-white transition-colors duration-300 hover:bg-white/15 xl:hidden"
            >
              <Menu className="h-5 w-5" strokeWidth={1.8} />
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>{mobileOpen ? <MobileMenu onClose={() => setMobileOpen(false)} /> : null}</AnimatePresence>
    </header>
  )
}

/* ------------------------------------------------------------------ */
/* Identity row                                                        */
/* ------------------------------------------------------------------ */

function IdentityRow() {
  return (
    <div className="w-full bg-white">
      <div className="shell flex h-[76px] items-center gap-6 pb-4 lg:h-[104px] lg:gap-10">
        <Logo />

        <div className="hidden flex-1 items-center gap-8 md:flex xl:gap-12">
          <ContactItem icon={MapPin} label="Location" value={site.address.short} />
          <Divider />
          <ContactItem icon={Mail} label="Email Address" value={site.email} href={`mailto:${site.email}`} />
          <Divider />
          <ContactItem
            icon={Phone}
            label="Phone"
            value={`${site.phones[0]} / ${site.phones[1]}`}
            href={`tel:${site.phones[1].replace(/\s/g, '')}`}
          />
        </div>

        {/* Group identity, the parent institution's mark sits on the right. */}
        <a
          href="https://mat.org.in/"
          target="_blank"
          rel="noreferrer noopener"
          className="ml-auto hidden shrink-0 items-center border-l border-ink-100 pl-6 transition-opacity duration-300 hover:opacity-80 sm:flex lg:pl-10"
        >
          <img
            src={groupLogo}
            alt="Meenakshi Group of Institutions, K.K. Nagar, Chennai"
            decoding="async"
            className="h-12 w-auto lg:h-16"
          />
        </a>
      </div>
    </div>
  )
}

function Divider() {
  return <span className="hidden h-10 w-px bg-ink-100 xl:block" aria-hidden="true" />
}

function ContactItem({ icon: Icon, label, value, href }) {
  const body = (
    <>
      <span
        className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-500 text-white shadow-[0_8px_20px_-10px_rgba(23,155,215,.9)]"
        aria-hidden="true"
      >
        <Icon className="h-5 w-5" strokeWidth={1.9} />
      </span>
      <span className="min-w-0">
        <span className="block text-[10.5px] font-semibold uppercase tracking-[0.16em] text-ink-900">
          {label}
        </span>
        <span className="mt-0.5 block max-w-[16ch] text-[13px] leading-snug text-ink-400 lg:max-w-none">
          {value}
        </span>
      </span>
    </>
  )

  const className = 'flex items-center gap-3 transition-colors duration-300'

  return href ? (
    <a href={href} className={cx(className, 'group hover:text-brand-600')}>
      {body}
    </a>
  ) : (
    <span className={className}>{body}</span>
  )
}

/* ------------------------------------------------------------------ */
/* Desktop navigation                                                  */
/* ------------------------------------------------------------------ */

function NavItem({ item, open, onOpen, onClose }) {
  const { pathname } = useLocation()
  const hasPanel = Boolean(item.children || item.groups)
  const active =
    item.href === '/' ? pathname === '/' : pathname === item.href || pathname.startsWith(`${item.href}/`)

  const linkClasses = cx(
    'relative flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[12.5px] font-semibold uppercase tracking-[0.08em] transition-colors duration-300',
    active ? 'bg-white/15 text-white' : 'text-white/85 hover:bg-white/10 hover:text-white',
  )

  return (
    <li
      className="relative"
      onMouseEnter={hasPanel ? onOpen : onClose}
      onFocus={hasPanel ? onOpen : undefined}
    >
      {hasPanel ? (
        <button
          type="button"
          className={linkClasses}
          aria-expanded={open}
          aria-haspopup="true"
          onClick={() => (open ? onClose() : onOpen())}
        >
          {item.label}
          <ChevronDown
            className={cx('h-3.5 w-3.5 transition-transform duration-300', open && 'rotate-180')}
            strokeWidth={2.2}
            aria-hidden="true"
          />
        </button>
      ) : (
        <NavLink to={item.href} className={linkClasses}>
          {item.label}
        </NavLink>
      )}

      <AnimatePresence>
        {hasPanel && open ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.28, ease }}
            className={cx(
              'absolute top-full pt-3',
              item.mega ? 'left-1/2 w-[860px] -translate-x-1/2' : 'left-0 w-[228px]',
            )}
          >
            <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white p-2 shadow-[0_28px_70px_-28px_rgba(16,24,40,.35)]">
              {item.mega ? <MegaPanel item={item} /> : <SimplePanel item={item} />}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </li>
  )
}

function SimplePanel({ item }) {
  return (
    <div className="flex flex-col">
      {item.children.map((child) => (
        <Link
          key={child.href}
          to={child.href}
          className="group flex items-center justify-between gap-4 rounded-xl px-4 py-2.5 text-[14px] font-medium text-ink-900 transition-colors duration-200 hover:bg-brand-50 hover:text-brand-600"
        >
          {child.label}
          <ArrowRight
            className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
            strokeWidth={1.8}
            aria-hidden="true"
          />
        </Link>
      ))}
    </div>
  )
}

function MegaPanel({ item }) {
  return (
    <div className="grid grid-cols-4 gap-1 p-2">
      {item.groups.map((group) => (
        <div key={group.label} className="flex flex-col">
          <Link
            to={group.href}
            className="mb-2 flex items-center gap-1.5 border-b border-ink-100 px-3 pb-2 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-brand-600 transition-colors hover:text-brand-700"
          >
            {group.label}
          </Link>
          {group.items.map((child) => (
            <Link
              key={child.href}
              to={child.href}
              className="group rounded-lg px-3 py-2 text-[13.5px] text-ink-600 transition-colors duration-200 hover:bg-brand-50 hover:text-brand-700"
            >
              {child.label}
            </Link>
          ))}
        </div>
      ))}

      <div className="col-span-4 mt-2 flex items-center justify-between gap-4 rounded-xl bg-ink-900 px-5 py-4">
        <div>
          <p className="text-sm font-medium text-white">Admissions are open for the coming academic year.</p>
          <p className="mt-0.5 text-[12.5px] text-white/50">
            Speak to the admission office about eligibility and the application process.
          </p>
        </div>
        <Button to="/admission" size="sm" variant="primary" icon>
          Apply Now
        </Button>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Mobile                                                              */
/* ------------------------------------------------------------------ */

function MobileMenu({ onClose }) {
  const [expanded, setExpanded] = useState(null)
  const closeRef = useRef(null)

  // Move focus into the panel on open and hand it back to the page on close.
  useEffect(() => {
    const opener = document.activeElement
    closeRef.current?.focus()
    return () => opener?.focus?.()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease }}
      className="fixed inset-0 z-50 xl:hidden"
    >
      <div className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.42, ease }}
        className="absolute right-0 top-0 flex h-full w-full max-w-[420px] flex-col bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="flex h-[70px] shrink-0 items-center justify-between border-b border-ink-100 px-5">
          <Logo compact />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="grid h-11 w-11 place-items-center rounded-lg border border-ink-200 text-ink-900 transition-colors hover:border-brand-400 hover:text-brand-600"
          >
            <X className="h-5 w-5" strokeWidth={1.7} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Mobile">
          <ul className="flex flex-col">
            {navigation.map((item) => {
              const children =
                item.groups?.flatMap((group) => [
                  { label: group.label, href: group.href, heading: true },
                  ...group.items,
                ]) ?? item.children

              if (!children) {
                return (
                  <li key={item.label}>
                    <NavLink
                      to={item.href}
                      className={({ isActive }) =>
                        cx(
                          'flex items-center justify-between rounded-xl px-4 py-3.5 text-[15px] font-medium transition-colors',
                          isActive ? 'bg-brand-50 text-brand-700' : 'text-ink-800 hover:bg-ink-50',
                        )
                      }
                    >
                      {item.label}
                      <ArrowRight className="h-4 w-4 text-ink-300" strokeWidth={1.7} aria-hidden="true" />
                    </NavLink>
                  </li>
                )
              }

              const open = expanded === item.label

              return (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => setExpanded(open ? null : item.label)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-[15px] font-medium text-ink-800 transition-colors hover:bg-ink-50"
                  >
                    {item.label}
                    <ChevronDown
                      className={cx('h-4 w-4 text-ink-400 transition-transform duration-300', open && 'rotate-180')}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {open ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease }}
                        className="overflow-hidden"
                      >
                        <div className="ml-4 flex flex-col border-l border-ink-100 pl-3">
                          {children.map((child) =>
                            child.heading ? (
                              <Link
                                key={child.href}
                                to={child.href}
                                className="mt-3 px-3 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-brand-600"
                              >
                                {child.label}
                              </Link>
                            ) : (
                              <Link
                                key={child.href}
                                to={child.href}
                                className="rounded-lg px-3 py-2.5 text-[14px] text-ink-600 transition-colors hover:bg-brand-50 hover:text-brand-700"
                              >
                                {child.label}
                              </Link>
                            ),
                          )}
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="shrink-0 border-t border-ink-100 bg-ink-50/60 px-5 py-5">
          <Button to="/admission" variant="primary" size="lg" icon full>
            Admission Enquiry
          </Button>

          <div className="mt-4 grid gap-2.5 text-[13px] text-ink-500">
            <a href={`tel:${site.phones[1].replace(/\s/g, '')}`} className="flex items-center gap-2.5 hover:text-brand-600">
              <Phone className="h-4 w-4 text-brand-500" strokeWidth={1.7} aria-hidden="true" />
              {site.phones[0]} / {site.phones[1]}
            </a>
            <a href={`mailto:${site.email}`} className="flex items-center gap-2.5 hover:text-brand-600">
              <Mail className="h-4 w-4 text-brand-500" strokeWidth={1.7} aria-hidden="true" />
              {site.email}
            </a>
            <span className="flex items-center gap-2.5">
              <MapPin className="h-4 w-4 text-brand-500" strokeWidth={1.7} aria-hidden="true" />
              {site.address.short}
            </span>
          </div>

          <a
            href="https://www.meenakshigroup.com"
            target="_blank"
            rel="noreferrer noopener"
            className="mt-5 flex items-center gap-3 border-t border-ink-100 pt-4"
          >
            <img src={groupLogo} alt="Meenakshi Group of Institutions" className="h-10 w-auto" decoding="async" />
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}
