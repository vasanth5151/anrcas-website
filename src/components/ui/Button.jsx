import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { cx } from '../../lib/cx'

const base =
  'group/btn relative inline-flex items-center justify-center gap-2 rounded-lg font-medium tracking-tight transition-all duration-300 ease-premium disabled:cursor-not-allowed disabled:opacity-60'

const variants = {
  primary:
    'bg-brand-500 text-white shadow-[0_10px_30px_-12px_rgba(23,155,215,.8)] hover:bg-brand-600 hover:shadow-[0_16px_40px_-14px_rgba(23,155,215,.95)] active:translate-y-px',
  dark: 'bg-ink-900 text-white hover:bg-ink-800 active:translate-y-px',
  outline:
    'border border-ink-200 bg-white/70 text-ink-900 backdrop-blur hover:border-brand-400 hover:text-brand-600',
  light:
    'border border-white/25 bg-white/10 text-white backdrop-blur hover:border-white/50 hover:bg-white/20',
  solidLight: 'bg-white text-ink-900 hover:bg-brand-50 active:translate-y-px',
  ghost: 'text-ink-700 hover:bg-ink-50 hover:text-brand-600',
  ghostLight: 'text-white/80 hover:bg-white/10 hover:text-white',
}

const sizes = {
  sm: 'h-9 px-4 text-[13px]',
  md: 'h-11 px-5 text-sm',
  lg: 'h-[52px] px-7 text-[15px]',
}

const Button = forwardRef(function Button(
  {
    as,
    to,
    href,
    variant = 'primary',
    size = 'md',
    className,
    children,
    icon = false,
    iconNode,
    full = false,
    ...rest
  },
  ref,
) {
  const classes = cx(base, variants[variant], sizes[size], full && 'w-full', className)

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {icon ? (
        iconNode ?? (
          <ArrowRight
            className="relative z-10 h-4 w-4 transition-transform duration-300 ease-premium group-hover/btn:translate-x-1"
            strokeWidth={1.8}
            aria-hidden="true"
          />
        )
      ) : null}
    </>
  )

  if (to) {
    return (
      <Link ref={ref} to={to} className={classes} {...rest}>
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a ref={ref} href={href} className={classes} {...rest}>
        {content}
      </a>
    )
  }

  const Component = as ?? 'button'
  return (
    <Component ref={ref} className={classes} {...rest}>
      {content}
    </Component>
  )
})

export default Button
