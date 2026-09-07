import { isSpam, methodGuard, renderEmail, sendMail, validate } from './_lib/mail.js'

/**
 * POST /api/send-contact
 * Body: { name, email, phone?, subject, message }
 */
export default async function handler(req, res) {
  if (!methodGuard(req, res)) return

  const body = req.body ?? {}

  if (isSpam(body)) {
    res.status(200).json({ ok: true })
    return
  }

  const { errors, values } = validate(body, { requirePhone: false, extra: ['subject'] })
  if (errors.length) {
    res.status(400).json({ ok: false, error: 'Some details are missing or invalid.', fields: errors })
    return
  }

  const subject = String(body.subject).trim().slice(0, 200)

  const html = renderEmail({
    heading: 'New Website Message',
    intro: `${values.name} has sent a message through the website contact form.`,
    rows: [
      { label: 'Full Name', value: values.name },
      { label: 'Email', value: values.email },
      { label: 'Phone', value: values.phone },
      { label: 'Subject', value: subject },
      { label: 'Received', value: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) },
    ],
    message: values.message,
  })

  try {
    await sendMail({
      subject: `Website Enquiry — ${subject}`,
      html,
      text: `${values.name} | ${values.email} | ${values.phone}\n\n${values.message}`,
      replyTo: values.email,
    })
    res.status(200).json({ ok: true })
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ ok: false, error: error.message || 'We could not send your message just now.' })
  }
}
