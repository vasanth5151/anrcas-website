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
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
}

function Block({ block }) {
  if (typeof block === 'string') {
    return <p className="text-[17px] leading-[1.85] text-ink-600">{block}</p>
  }

  if (block?._type === 'image' && block.asset?.url) {
    return (
      <figure className="my-2">
        <img
          src={block.asset.url}
          alt={block.alt ?? ''}
          loading="lazy"
          decoding="async"
          className="w-full rounded-2xl border border-ink-100"
        />
        {block.caption ? (
          <figcaption className="mt-3 text-[13px] text-ink-400">{block.caption}</figcaption>
        ) : null}
      </figure>
    )
  }

  if (block?._type !== 'block') return null

  const text = (block.children ?? []).map((child, index) => {
    const marks = child.marks ?? []
    let node = child.text

    const linkMark = (block.markDefs ?? []).find((def) => marks.includes(def._key) && def._type === 'link')
    if (marks.includes('strong')) node = <strong className="font-semibold text-ink-900">{node}</strong>
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
    case 'h2':
      return <h2 className="mt-5 text-[28px] font-bold leading-tight tracking-tight text-ink-900">{text}</h2>
    case 'h3':
      return <h3 className="mt-3 text-[22px] font-bold leading-tight tracking-tight text-ink-900">{text}</h3>
    case 'blockquote':
      return (
        <blockquote className="border-l-2 border-brand-500 pl-6 text-[17px] italic leading-relaxed text-ink-700">
          {text}
        </blockquote>
      )
    default:
      if (block.listItem) {
        return (
          <li className="ml-5 list-disc text-[16px] leading-[1.75] text-ink-600 marker:text-brand-500">{text}</li>
        )
      }
      return <p className="text-[17px] leading-[1.85] text-ink-600">{text}</p>
  }
}
