import { useCallback, useEffect, useRef, useState } from 'react'

/** Tracks window scroll past a threshold, used by the sticky navbar. */
export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > threshold)
        frame = 0
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [threshold])

  return scrolled
}

/** Locks background scrolling while a menu or lightbox is open. */
export function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [locked])
}

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  )

  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = (event) => setMatches(event.matches)
    setMatches(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])

  return matches
}

export function usePrefersReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}

/** Calls `handler` on Escape, shared by the mobile menu, dropdowns and lightbox. */
export function useEscapeKey(handler, active = true) {
  useEffect(() => {
    if (!active) return
    const onKey = (event) => {
      if (event.key === 'Escape') handler(event)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [handler, active])
}

/** Closes a popover when the pointer moves outside the referenced element. */
export function useClickOutside(handler) {
  const ref = useRef(null)

  useEffect(() => {
    const onPointerDown = (event) => {
      if (ref.current && !ref.current.contains(event.target)) handler(event)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('touchstart', onPointerDown, { passive: true })
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('touchstart', onPointerDown)
    }
  }, [handler])

  return ref
}

/**
 * Pointer-follow value in the -1…1 range, used for the light parallax on the
 * hero. Disabled on touch devices and under reduced-motion preferences.
 */
export function usePointerParallax(enabled = true) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const reduced = usePrefersReducedMotion()
  const fine = useMediaQuery('(pointer: fine)')
  const active = enabled && fine && !reduced

  useEffect(() => {
    if (!active) return setOffset({ x: 0, y: 0 })
    let frame = 0
    const onMove = (event) => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        setOffset({
          x: (event.clientX / window.innerWidth - 0.5) * 2,
          y: (event.clientY / window.innerHeight - 0.5) * 2,
        })
        frame = 0
      })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [active])

  return offset
}

/** Simple async state machine for form submissions. */
export function useSubmitState() {
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [message, setMessage] = useState('')

  const reset = useCallback(() => {
    setStatus('idle')
    setMessage('')
  }, [])

  return { status, setStatus, message, setMessage, reset }
}
