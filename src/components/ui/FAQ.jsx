import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'
import { ease } from '../../lib/motion'
import { cx } from '../../lib/cx'

/**
 * Numbered accordion cards on brand blue. One item opens at a time, the height
 * animates, and the whole card header is a keyboard-reachable toggle.
 */
export default function FAQ({ items, className, defaultOpen = 0 }) {
  const [open, setOpen] = useState(defaultOpen)
  const baseId = useId()

  return (
    <div className={cx('flex flex-col gap-4', className)}>
      {items.map((item, index) => {
        const isOpen = open === index
        const panelId = `${baseId}-panel-${index}`
        const buttonId = `${baseId}-button-${index}`

        return (
          <div
            key={item.question}
            className="overflow-hidden rounded-2xl bg-brand-500 text-white shadow-[0_18px_38px_-24px_rgba(23,155,215,.95)]"
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : index)}
                className="group flex w-full items-center gap-4 px-4 py-4 text-left transition-colors duration-300 hover:bg-white/[0.07] sm:px-5"
              >
                <span
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/20 text-[13px] font-semibold tabular-nums"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>

                <span className="flex-1 text-[15px] font-semibold leading-snug tracking-tight sm:text-[16px]">
                  {item.question}
                </span>

                <span
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/20 transition-colors duration-300 group-hover:bg-white/30"
                  aria-hidden="true"
                >
                  {isOpen ? (
                    <Minus className="h-4 w-4" strokeWidth={2.2} />
                  ) : (
                    <Plus className="h-4 w-4" strokeWidth={2.2} />
                  )}
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.42, ease }}
                  className="overflow-hidden"
                >
                  <p className="mx-4 border-t border-white/25 pb-5 pt-4 text-[14.5px] leading-relaxed text-white/85 sm:mx-5 sm:pl-14">
                    {item.answer}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
