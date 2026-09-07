/** Validation shared by the browser forms and the serverless handlers. */
export const emailPattern = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i
export const phonePattern = /^[+\d][\d\s-]{8,15}$/

export const required = (value) => Boolean(value && String(value).trim().length)

export function validateEnquiry(values, { requirePhone = true } = {}) {
  const errors = {}

  if (!required(values.name)) errors.name = 'Please enter your full name.'
  else if (values.name.trim().length < 3) errors.name = 'Please enter at least three characters.'

  if (!required(values.email)) errors.email = 'Please enter your email address.'
  else if (!emailPattern.test(values.email.trim())) errors.email = 'Please enter a valid email address.'

  if (requirePhone) {
    if (!required(values.phone)) errors.phone = 'Please enter your phone number.'
    else if (!phonePattern.test(values.phone.trim())) errors.phone = 'Please enter a valid phone number.'
  }

  if ('course' in values && !required(values.course)) errors.course = 'Please choose a programme.'
  if ('qualification' in values && !required(values.qualification))
    errors.qualification = 'Please enter your qualification.'
  if ('subject' in values && !required(values.subject)) errors.subject = 'Please enter a subject.'

  if (!required(values.message)) errors.message = 'Please tell us how we can help.'
  else if (values.message.trim().length < 10) errors.message = 'Please write at least ten characters.'

  return errors
}
