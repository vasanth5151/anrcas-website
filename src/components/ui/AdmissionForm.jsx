import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react'
import { SelectField, TextArea, TextField } from './FormField'
import { programmes } from '../../data/programmes'
import { site } from '../../data/site'
import { validateEnquiry } from '../../lib/validation'
import { useSubmitState } from '../../lib/hooks'
import { ease } from '../../lib/motion'
import { cx } from '../../lib/cx'

const empty = {
  name: '',
  email: '',
  phone: '',
  course: '',
  qualification: '',
  message: '',
  company: '', // honeypot, real people never fill this
}

const qualifications = [
  'Higher Secondary (+2)',
  'Diploma',
  'Undergraduate Degree',
  'Postgraduate Degree',
  'Other',
]

export default function AdmissionForm({ tone = 'light', className }) {
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState({})
  const { status, setStatus, message, setMessage } = useSubmitState()
  const dark = tone === 'dark'

  const update = (field) => (event) => {
    const { value } = event.target
    setValues((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  async function onSubmit(event) {
    event.preventDefault()

    const found = validateEnquiry(values)
    setErrors(found)
    if (Object.keys(found).length) {
      setStatus('error')
      setMessage('Please correct the highlighted fields and try again.')
      return
    }

    setStatus('sending')
    setMessage('')

    try {
      const response = await fetch('/api/send-admission-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      const payload = await response.json().catch(() => ({}))

      if (!response.ok || payload.ok === false) {
        throw new Error(payload.error || 'We could not send your enquiry just now.')
      }

      setStatus('success')
      setMessage('Thank you. Your enquiry has reached the admission office, we will contact you shortly.')
      setValues(empty)
    } catch (error) {
      setStatus('error')
      setMessage(
        `${error.message} Please call ${site.phones[0]} or email ${site.email} and we will help you directly.`,
      )
    }
  }

  const sending = status === 'sending'

  return (
    <form onSubmit={onSubmit} noValidate className={cx('flex flex-col gap-5', dark && 'text-white', className)}>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Full Name"
          name="name"
          autoComplete="name"
          placeholder="Your full name"
          required
          value={values.name}
          onChange={update('name')}
          error={errors.name}
        />
        <TextField
          label="Email Address"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
          value={values.email}
          onChange={update('email')}
          error={errors.email}
        />
        <TextField
          label="Phone Number"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+91 00000 00000"
          required
          value={values.phone}
          onChange={update('phone')}
          error={errors.phone}
        />
        <SelectField
          label="Course / Programme"
          name="course"
          required
          placeholder="Select a programme"
          options={programmes.map((programme) => programme.name)}
          value={values.course}
          onChange={update('course')}
          error={errors.course}
        />
        <div className="sm:col-span-2">
          <SelectField
            label="Qualification"
            name="qualification"
            required
            placeholder="Your highest qualification"
            options={qualifications}
            value={values.qualification}
            onChange={update('qualification')}
            error={errors.qualification}
          />
        </div>
      </div>

      <TextArea
        label="Message"
        name="message"
        rows={4}
        required
        placeholder="Tell us what you would like to know, eligibility, fees, documents or transport."
        value={values.message}
        onChange={update('message')}
        error={errors.message}
      />

      <div className="hidden" aria-hidden="true">
        <label htmlFor="company-admission">Company</label>
        <input
          id="company-admission"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={update('company')}
        />
      </div>

      <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={sending}
          className="group inline-flex h-[52px] items-center justify-center gap-2 rounded-lg bg-brand-500 px-7 text-[15px] font-medium text-white shadow-[0_12px_32px_-14px_rgba(23,155,215,.9)] transition-all duration-300 ease-premium hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {sending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.9} aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              Submit Enquiry
              <Send
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </>
          )}
        </button>

        <p className={cx('text-[12px]', dark ? 'text-white/45' : 'text-ink-400')}>
          We reply to admission enquiries within one working day.
        </p>
      </div>

      <FormStatus status={status} message={message} />
    </form>
  )
}

export function FormStatus({ status, message }) {
  return (
    <AnimatePresence>
      {message ? (
        <motion.div
          initial={{ opacity: 0, y: -6, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -6, height: 0 }}
          transition={{ duration: 0.35, ease }}
          role="status"
          aria-live="polite"
          className="overflow-hidden"
        >
          <div
            className={cx(
              'flex items-start gap-3 rounded-lg border px-4 py-3.5 text-[13.5px]',
              status === 'success'
                ? 'border-brand-200 bg-brand-50 text-brand-800'
                : 'border-red-200 bg-red-50 text-red-700',
            )}
          >
            {status === 'success' ? (
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.9} aria-hidden="true" />
            ) : (
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.9} aria-hidden="true" />
            )}
            <span>{message}</span>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
