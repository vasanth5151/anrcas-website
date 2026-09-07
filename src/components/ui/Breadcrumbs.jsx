import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { cx } from '../../lib/cx'

/** `trail` is an array of { label, href }; the final entry renders as current. */
export default function Breadcrumbs({ trail = [], tone = 'light', className }) {
  const dark = tone === 'dark'
  const crumbs = [{ label: 'Home', href: '/' }, ...trail]

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1.5 text-[12.5px]">
        {crumbs.map((crumb, index) => {
          const last = index === crumbs.length - 1
          return (
            <li key={crumb.href} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className={cx('font-medium', dark ? 'text-white' : 'text-ink-900')}>
                  {crumb.label}
                </span>
              ) : (
                <>
                  <Link
                    to={crumb.href}
                    className={cx(
                      'transition-colors',
                      dark ? 'text-white/55 hover:text-brand-300' : 'text-ink-400 hover:text-brand-600',
                    )}
                  >
                    {crumb.label}
                  </Link>
                  <ChevronRight
                    className={cx('h-3.5 w-3.5', dark ? 'text-white/25' : 'text-ink-300')}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
