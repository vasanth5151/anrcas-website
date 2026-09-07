import { isSpam, methodGuard, renderEmail, sendMail, validate } from './_lib/mail.js'

/**
 * POST /api/send-admission-enquiry
 * Body: { name, email, phone, course, qualification, message }
 */
export default async function handler(req, res) {
  if (!methodGuard(req, res)) return

  const body = req.body ?? {}

  // Honeypot: report success without sending anything.
  if (isSpam(body)) {
    res.status(200).json({ ok: true })
    return
  }

  const { errors, values } = validate(body, { extra: ['course', 'qualification'] })
  if (errors.length) {
    res.status(400).json({ ok: false, error: 'Some details are missing or invalid.', fields: errors })
    return
  }

  const course = String(body.course).trim().slice(0, 200)
  const qualification = String(body.qualification).trim().slice(0, 200)

  const html = renderEmail({
    heading: 'New Admission Enquiry',
    intro: `${values.name} has submitted an admission enquiry through the college website.`,
    rows: [
      { label: 'Full Name', value: values.name },
      { label: 'Email', value: values.email },
      { label: 'Phone', value: values.phone },
      { label: 'Programme of Interest', value: course },
      { label: 'Qualification', value: qualification },
      { label: 'Received', value: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) },
    ],
    message: values.message,
  })

  try {
    await sendMail({
      subject: `Admission Enquiry — ${values.name} (${course})`,
      html,
      text: `${values.name} | ${values.email} | ${values.phone} | ${course} | ${qualification}\n\n${values.message}`,
      replyTo: values.email,
    })
    res.status(200).json({ ok: true })
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ ok: false, error: error.message || 'We could not send your enquiry just now.' })
  }
}
