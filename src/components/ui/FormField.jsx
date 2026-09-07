import { useId } from 'react'
import { AlertCircle, ChevronDown } from 'lucide-react'
import { cx } from '../../lib/cx'

const control =
  'w-full rounded-lg border bg-white px-4 text-[14.5px] text-ink-900 placeholder:text-ink-300 transition-colors duration-300 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20'

function Wrapper({ id, label, error, required, hint, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[12.5px] font-medium tracking-tight text-ink-600">
        {label}
        {required ? <span className="ml-1 text-brand-500">*</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="flex items-center gap-1.5 text-[12px] text-red-600">
          <AlertCircle className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-[12px] text-ink-400">
          {hint}
        </p>
      ) : null}
    </div>
  )
}

export function TextField({ label, error, hint, required, className, ...rest }) {
  const id = useId()
  return (
    <Wrapper id={id} label={label} error={error} hint={hint} required={required}>
      <input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cx(control, 'h-12', error ? 'border-red-300' : 'border-ink-200', className)}
        {...rest}
      />
    </Wrapper>
  )
}

export function SelectField({ label, error, hint, required, options = [], placeholder, className, ...rest }) {
  const id = useId()
  return (
    <Wrapper id={id} label={label} error={error} hint={hint} required={required}>
      <div className="relative">
        <select
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          className={cx(
            control,
            'h-12 appearance-none pr-10',
            error ? 'border-red-300' : 'border-ink-200',
            className,
          )}
          {...rest}
        >
          {placeholder ? <option value="">{placeholder}</option> : null}
          {options.map((option) => {
            const value = typeof option === 'string' ? option : option.value
            const text = typeof option === 'string' ? option : option.label
            return (
              <option key={value} value={value}>
                {text}
              </option>
            )
          })}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400"
          strokeWidth={1.8}
          aria-hidden="true"
        />
      </div>
    </Wrapper>
  )
}

export function TextArea({ label, error, hint, required, rows = 4, className, ...rest }) {
  const id = useId()
  return (
    <Wrapper id={id} label={label} error={error} hint={hint} required={required}>
      <textarea
        id={id}
        rows={rows}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cx(control, 'resize-y py-3.5', error ? 'border-red-300' : 'border-ink-200', className)}
        {...rest}
      />
    </Wrapper>
  )
}
