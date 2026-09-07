import { Link } from 'react-router-dom'
import collegeLogo from '../../assets/images/anrcas.webp'
import { cx } from '../../lib/cx'

/**
 * The official college crest and wordmark. The artwork has a transparent
 * background and a brand-blue wordmark, so the same file reads correctly on
 * both the light navbar and the dark hero and footer.
 */
export default function Logo({ className, compact = false, size = 'md' }) {
  return (
    <Link
      to="/"
      aria-label="A.N. Radhakrishnan College of Arts and Science, home"
      className={cx('group flex shrink-0 items-center', className)}
    >
      <img
        src={collegeLogo}
        alt="A.N. Radhakrishnan College of Arts and Science"
        width={1122}
        height={425}
        decoding="async"
        className={cx(
          'w-auto transition-opacity duration-300 group-hover:opacity-90',
          compact ? 'h-9' : size === 'lg' ? 'h-14' : 'h-11 sm:h-[52px]',
        )}
      />
    </Link>
  )
}
