import { Loader2 } from 'lucide-react'
import { cx } from '../../lib/cx'

/** Route-level suspense fallback. */
export default function Loading({ label = 'Loading', full = true, className }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cx('flex w-full items-center justify-center', full ? 'min-h-[70vh]' : 'py-24', className)}
    >
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-6 w-6 animate-spin text-brand-500" strokeWidth={1.8} aria-hidden="true" />
        <span className="text-[12px] font-medium uppercase tracking-[0.22em] text-ink-400">{label}</span>
      </div>
    </div>
  )
}

export function Skeleton({ className }) {
  return <div className={cx('animate-pulse rounded-lg bg-ink-100', className)} />
}

/** Matches the BlogCard footprint so the grid does not jump when data lands. */
export function BlogCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white">
      <Skeleton className="aspect-[16/10] rounded-none" />
      <div className="flex flex-col gap-3 p-6">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-3/5" />
        <Skeleton className="mt-2 h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
      </div>
    </div>
  )
}

export function ErrorState({ title = 'Something went wrong', description, action }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-ink-100 bg-ink-50/60 px-6 py-16 text-center">
      <h3 className="text-lg font-semibold text-ink-900">{title}</h3>
      {description ? <p className="mt-2 max-w-md text-sm text-ink-500">{description}</p> : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  )
}
