import { useState } from 'react'
import { Loader2, Send } from 'lucide-react'
import { TextArea, TextField } from './FormField'
import { FormStatus } from './AdmissionForm'
import { validateEnquiry } from '../../lib/validation'
import { site } from '../../data/site'
import { useSubmitState } from '../../lib/hooks'
import { cx } from '../../lib/cx'

const empty = { name: '', email: '', phone: '', subject: '', message: '', company: '' }

export default function ContactForm({ className }) {
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState({})
  const { status, setStatus, message, setMessage } = useSubmitState()

  const update = (field) => (event) => {
    const { value } = event.target
    setValues((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  async function onSubmit(event) {
    event.preventDefault()

    const found = validateEnquiry(values, { requirePhone: false })
    setErrors(found)
    if (Object.keys(found).length) {
      setStatus('error')
      setMessage('Please correct the highlighted fields and try again.')
      return
    }

    setStatus('sending')
    setMessage('')

    try {
      const response = await fetch('/api/send-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      const payload = await response.json().catch(() => ({}))

      if (!response.ok || payload.ok === false) {
        throw new Error(payload.error || 'We could not send your message just now.')
      }

      setStatus('success')
      setMessage('Thank you for writing to us. The college office will respond to your message shortly.')
      setValues(empty)
    } catch (error) {
      setStatus('error')
      setMessage(`${error.message} You can also reach us on ${site.phones[0]}.`)
    }
  }

  const sending = status === 'sending'

  return (
    <form onSubmit={onSubmit} noValidate className={cx('flex flex-col gap-5', className)}>
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
          placeholder="Optional"
          value={values.phone}
          onChange={update('phone')}
          error={errors.phone}
        />
        <TextField
          label="Subject"
          name="subject"
          placeholder="What is your message about?"
          required
          value={values.subject}
          onChange={update('subject')}
          error={errors.subject}
        />
      </div>

      <TextArea
        label="Message"
        name="message"
        rows={5}
        required
        placeholder="Write your message to the college office."
        value={values.message}
        onChange={update('message')}
        error={errors.message}
      />

      <div className="hidden" aria-hidden="true">
        <label htmlFor="company-contact">Company</label>
        <input
          id="company-contact"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={update('company')}
        />
      </div>

      <button
        type="submit"
        disabled={sending}
        className="group inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-lg bg-brand-500 px-7 text-[15px] font-medium text-white shadow-[0_12px_32px_-14px_rgba(23,155,215,.9)] transition-all duration-300 ease-premium hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:self-start"
      >
        {sending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.9} aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            Send Message
            <Send
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </>
        )}
      </button>

      <FormStatus status={status} message={message} />
    </form>
  )
}
