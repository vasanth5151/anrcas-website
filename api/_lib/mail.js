import { Resend } from 'resend'

const emailPattern = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i
const phonePattern = /^[+\d][\d\s-]{8,15}$/

export function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

const clean = (value = '') => String(value).trim().slice(0, 4000)

/**
 * Server-side validation. The browser validates too, but the handler never
 * trusts that — this is the authoritative check.
 */
export function validate(body, { requirePhone = true, extra = [] } = {}) {
  const errors = []
  const name = clean(body.name)
  const email = clean(body.email)
  const phone = clean(body.phone)
  const message = clean(body.message)

  if (name.length < 3) errors.push('name')
  if (!emailPattern.test(email)) errors.push('email')
  if (requirePhone && !phonePattern.test(phone)) errors.push('phone')
  if (message.length < 10) errors.push('message')
  extra.forEach((field) => {
    if (!clean(body[field])) errors.push(field)
  })

  return { errors, values: { name, email, phone, message } }
}

export function methodGuard(req, res) {
  if (req.method === 'OPTIONS') {
    res.status(204).json({})
    return false
  }
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed.' })
    return false
  }
  return true
}

/** Silently accepts honeypot submissions so bots do not learn they were caught. */
export function isSpam(body) {
  return Boolean(body?.company)
}

export function renderEmail({ heading, intro, rows, message }) {
  const cells = rows
    .filter((row) => row.value)
    .map(
      (row) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #eceeee;color:#7f8c8d;font-size:13px;width:180px;vertical-align:top;">${escapeHtml(row.label)}</td>
          <td style="padding:10px 0;border-bottom:1px solid #eceeee;color:#1c1c1c;font-size:14px;font-weight:500;">${escapeHtml(row.value)}</td>
        </tr>`,
    )
    .join('')

  return `<!doctype html>
<html lang="en">
  <body style="margin:0;background:#f6f7f7;padding:32px 16px;font-family:'Segoe UI',Helvetica,Arial,sans-serif;">
    <table role="presentation" cellpadding="0" cellspacing="0" style="max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #eceeee;border-radius:16px;overflow:hidden;">
      <tr>
        <td style="background:#1c1c1c;padding:26px 32px;">
          <p style="margin:0;color:#45afdf;font-size:11px;letter-spacing:.18em;text-transform:uppercase;font-weight:600;">A.N. Radhakrishnan College of Arts and Science</p>
          <h1 style="margin:10px 0 0;color:#ffffff;font-size:20px;font-weight:600;">${escapeHtml(heading)}</h1>
        </td>
      </tr>
      <tr>
        <td style="padding:28px 32px;">
          <p style="margin:0 0 20px;color:#606b6c;font-size:14px;line-height:1.6;">${escapeHtml(intro)}</p>
          <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">${cells}</table>
          <div style="margin-top:24px;padding:18px 20px;background:#f0f9fe;border-left:3px solid #179bd7;border-radius:8px;">
            <p style="margin:0 0 6px;color:#11628c;font-size:11px;letter-spacing:.14em;text-transform:uppercase;font-weight:600;">Message</p>
            <p style="margin:0;color:#1c1c1c;font-size:14px;line-height:1.65;white-space:pre-wrap;">${escapeHtml(message)}</p>
          </div>
        </td>
      </tr>
      <tr>
        <td style="padding:18px 32px;background:#f6f7f7;color:#7f8c8d;font-size:12px;">
          Sent from the website contact forms · anrcas.edu.in
        </td>
      </tr>
    </table>
  </body>
</html>`
}

/**
 * Sends through Resend. RESEND_API_KEY is read from the server environment and
 * is never bundled into the client — no `VITE_` prefix, no import from /src.
 */
export async function sendMail({ subject, html, replyTo, text }) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    const error = new Error('Email service is not configured.')
    error.status = 503
    throw error
  }

  const resend = new Resend(apiKey)
  const { data, error } = await resend.emails.send({
    from: process.env.MAIL_FROM || 'ANR College Website <onboarding@resend.dev>',
    to: (process.env.MAIL_TO || 'admin@anrcas.edu.in').split(',').map((entry) => entry.trim()),
    subject,
    html,
    text,
    replyTo,
  })

  if (error) {
    const failure = new Error(error.message || 'The email provider rejected the request.')
    failure.status = 502
    throw failure
  }

  return data
}
