import { cx } from '../../lib/cx'

/**
 * Minimal Portable Text renderer, enough for the block styles the blog uses
 * (paragraphs, headings, quotes, lists and links) without adding a dependency.
 * Plain strings are supported too, which is what the mock posts use.
 */
export default function PortableText({ value, className }) {
  if (!value) return null
  const blocks = Array.isArray(value) ? value : splitPlainText(value)

  return (
    <div className={cx('flex flex-col gap-7', className)}>
      {blocks.map((block, index) => (
        <Block key={block?._key ?? index} block={block} />
      ))}
    </div>
  )
}

function splitPlainText(value) {
  return String(value)
    .split(/\r?\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
}

function isSubheadingText(trimmed) {
  if (!trimmed) return false
  if (/^#{1,6}\s/.test(trimmed)) return true
  // Numbered or ordered headings, e.g. "1. Career-Aligned...", "2) Skill...", "Step 1:"
  if (/^\d+[\.\)]\s+/.test(trimmed) || /^(Step|Section|Point|Feature)\s+\d+/i.test(trimmed)) return true
  // Short lines (<= 150 chars) ending with colon/question mark, or without a trailing period
  if (trimmed.length > 0 && trimmed.length <= 150) {
    if (trimmed.endsWith(':') || trimmed.endsWith('?') || !trimmed.endsWith('.')) {
      return true
    }
  }
  return false
}

function Block({ block }) {
  if (typeof block === 'string') {
    const trimmed = block.trim()
    if (trimmed.startsWith('# ')) {
      return <h1 className="mt-10 mb-3 text-[30px] sm:text-[36px] font-bold leading-tight tracking-tight text-ink-900">{trimmed.replace(/^#\s+/, '')}</h1>
    }
    if (trimmed.startsWith('## ')) {
      return <h2 className="mt-10 mb-3 text-[24px] sm:text-[28px] font-bold leading-tight tracking-tight text-ink-900">{trimmed.replace(/^##\s+/, '')}</h2>
    }
    if (trimmed.startsWith('### ')) {
      return <h3 className="mt-8 mb-2.5 text-[20px] sm:text-[22px] font-bold leading-tight tracking-tight text-ink-900">{trimmed.replace(/^###\s+/, '')}</h3>
    }
    if (trimmed.startsWith('#### ')) {
      return <h4 className="mt-6 mb-2 text-[18px] font-bold leading-tight text-ink-900">{trimmed.replace(/^####\s+/, '')}</h4>
    }
    if (isSubheadingText(trimmed)) {
      return <h2 className="mt-9 mb-3 text-[22px] sm:text-[26px] font-bold leading-snug tracking-tight text-ink-900">{trimmed}</h2>
    }
    return <p className="text-[17px] leading-[1.85] text-ink-600">{block}</p>
  }

  if (block?._type === 'image' && block.asset?.url) {
    return (
      <figure className="my-5 mx-auto max-w-[640px]">
        <img
          src={block.asset.url}
          alt={block.alt ?? ''}
          loading="lazy"
          decoding="async"
          className="w-full max-h-[360px] rounded-xl border border-ink-100 object-cover"
        />
        {block.caption ? (
          <figcaption className="mt-2 text-center text-[13px] text-ink-400">{block.caption}</figcaption>
        ) : null}
      </figure>
    )
  }

  if (block?._type !== 'block') return null

  const plainTextStr = (block.children ?? []).map((child) => child.text ?? '').join('').trim()

  const text = (block.children ?? []).map((child, index) => {
    const marks = child.marks ?? []
    let node = child.text

    const linkMark = (block.markDefs ?? []).find((def) => marks.includes(def._key) && def._type === 'link')
    if (marks.includes('strong')) node = <strong className="font-bold text-ink-900">{node}</strong>
    if (marks.includes('em')) node = <em>{node}</em>
    if (linkMark) {
      node = (
        <a
          href={linkMark.href}
          target="_blank"
          rel="noreferrer noopener"
          className="text-brand-600 underline underline-offset-4 hover:text-brand-700"
        >
          {node}
        </a>
      )
    }

    return <span key={child._key ?? index}>{node}</span>
  })

  switch (block.style) {
    case 'h1':
      return <h1 className="mt-10 mb-3 text-[30px] sm:text-[36px] font-bold leading-tight tracking-tight text-ink-900">{text}</h1>
    case 'h2':
    case 'heading':
    case 'header':
    case 'title':
      return <h2 className="mt-10 mb-3 text-[24px] sm:text-[28px] font-bold leading-tight tracking-tight text-ink-900">{text}</h2>
    case 'h3':
    case 'subheading':
    case 'subtitle':
      return <h3 className="mt-8 mb-2.5 text-[20px] sm:text-[22px] font-bold leading-tight tracking-tight text-ink-900">{text}</h3>
    case 'h4':
    case 'h5':
    case 'h6':
      return <h4 className="mt-6 mb-2 text-[18px] font-bold leading-tight text-ink-900">{text}</h4>
    case 'blockquote':
      return (
        <blockquote className="my-3 border-l-4 border-brand-500 pl-6 text-[17px] italic leading-relaxed text-ink-700">
          {text}
        </blockquote>
      )
    default:
      if (block.listItem) {
        return (
          <li className="ml-5 list-disc text-[16px] leading-[1.75] text-ink-600 marker:text-brand-500">{text}</li>
        )
      }
      if (isSubheadingText(plainTextStr)) {
        return <h2 className="mt-9 mb-3 text-[22px] sm:text-[26px] font-bold leading-snug tracking-tight text-ink-900">{text}</h2>
      }
      return <p className="text-[17px] leading-[1.85] text-ink-600">{text}</p>
  }
}
