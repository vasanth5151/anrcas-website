import { useEffect, useState } from 'react'

/**
 * Runs an async Sanity fetcher and exposes loading / error / data state.
 * `deps` behaves like a useEffect dependency list.
 */
export function useSanity(fetcher, deps = []) {
  const [state, setState] = useState({ data: null, loading: true, error: null })

  useEffect(() => {
    let cancelled = false
    setState((prev) => ({ ...prev, loading: true, error: null }))

    Promise.resolve()
      .then(fetcher)
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null })
      })
      .catch((error) => {
        if (!cancelled) setState({ data: null, loading: false, error })
      })

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return state
}

export const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
    : ''

export const formatDateShort = (value) =>
  value ? new Date(value).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : ''

/** Rough reading time for both plain-string and Portable Text bodies. */
export function readingTime(body) {
  if (!body) return 2
  const text = Array.isArray(body)
    ? body
        .map((block) =>
          typeof block === 'string'
            ? block
            : (block.children ?? []).map((child) => child.text ?? '').join(' '),
        )
        .join(' ')
    : String(body)
  return Math.max(2, Math.round(text.split(/\s+/).length / 210))
}
