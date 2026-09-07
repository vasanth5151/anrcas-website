import { useState } from 'react'
import { cx } from '../../lib/cx'

const ratios = {
  wide: 'aspect-[16/10]',
  video: 'aspect-video',
  square: 'aspect-square',
  tall: 'aspect-[4/5]',
  portrait: 'aspect-[3/4]',
  banner: 'aspect-[21/9]',
  natural: '',
  auto: '',
}

/**
 * Lazy, responsive image with a soft skeleton while loading and a branded
 * fallback if the source is unavailable, so no layout ever collapses to a
 * broken-image icon.
 */
export default function SmartImage({
  src,
  alt = '',
  ratio = 'wide',
  className = '',
  imgClassName = '',
  width,
  height,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 720px',
  children,
}) {
  const [status, setStatus] = useState('loading')

  return (
    <div
      className={cx(
        'relative overflow-hidden bg-ink-100',
        ratios[ratio],
        // In natural mode the height comes from the file itself, so reserve
        // some room while it loads rather than collapsing to nothing.
        ratio === 'natural' && status === 'loading' && 'min-h-[220px]',
        className,
      )}
    >
      {status !== 'error' && src ? (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          // React 18 passes only lowercase `fetchpriority` through to the DOM.
          {...(priority ? { fetchpriority: 'high' } : null)}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          className={cx(
            'transition-[opacity,transform] duration-700 ease-premium',
            // `natural` keeps the file's own proportions, used by the gallery,
            // where cropping would cut people out of group photographs.
            ratio === 'natural' ? 'block h-auto w-full' : 'h-full w-full object-cover',
            status === 'loaded' ? 'opacity-100' : 'opacity-0',
            imgClassName,
          )}
        />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className={cx(
            'flex w-full items-center justify-center bg-gradient-to-br from-brand-100 via-white to-brand-50',
            ratio === 'natural' ? 'aspect-[4/3]' : 'h-full',
          )}
        >
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-500/70">ANR</span>
        </div>
      )}

      {status === 'loading' && src ? (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-ink-100 via-ink-50 to-ink-100" />
      ) : null}

      {children}
    </div>
  )
}
