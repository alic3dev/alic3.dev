import 'server-only'

import type { ServerRuntime } from 'next'
import type { NextRequest } from 'next/server'

import { NextResponse } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import { createKysely } from '@vercel/postgres-kysely'
import { kv } from '@vercel/kv'

import { regexs } from '@/utils/regexs'
import { Recaptcha } from '@/utils/Recaptcha'
import * as mail from '@/utils/server/mail'

export const runtime: ServerRuntime = 'nodejs'

const ratelimitCache: { [type: string]: Map<string, number> } = {
  presubmit: new Map<string, number>(),
  submit: new Map<string, number>(),
}
const ratelimit: { [type: string]: Ratelimit } = {
  presubmit: new Ratelimit({
    redis: kv,
    limiter: Ratelimit.slidingWindow(10, '10 s'),
    ephemeralCache: ratelimitCache.presubmit,
  }),
  submit: new Ratelimit({
    redis: kv,
    limiter: Ratelimit.slidingWindow(1, '1 d'),
    ephemeralCache: ratelimitCache.submit,
    prefix: '@upstash/ratelimit/contact_submit',
  }),
}

const escapeHTML = (unsafe: string): string => {
  return unsafe
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

export const POST = async (req: NextRequest) => {
  const clientIp: string =
    req.ip ||
    req.headers.get('X-Real-IP') ||
    req.headers.get('X-Forwarded-For')?.replace(/\s/g, '').split(',').pop() ||
    '127.0.0.1'

  if (!(await ratelimit.presubmit.limit(clientIp)).success)
    return NextResponse.json({}, { status: 429 })

  const contactFormData: FormData = await req.formData()

  const captchaErrorResponse: Api.Recaptcha.ErrorResponse =
    await Recaptcha.verify(
      contactFormData.get('recaptcha-token'),
      Recaptcha.expectedActions.SUBMIT_CONTACT_FORM,
    )
  if (captchaErrorResponse) return captchaErrorResponse

  const contactData: Api.Contact.Data = {
    name: contactFormData.get('name'),
    contactMethod: contactFormData.get('contact-method'),
    email: contactFormData.get('email'),
    phone: contactFormData.get('phone'),
    message: contactFormData.get('message'),
    termsPrivacyDisclaimerAgreement: contactFormData.get(
      'terms-privacy-disclaimer-agreement',
    ),
    contactConsent: contactFormData.get('contact-consent'),
  }

  const contactDataErrors: Api.Contact.Error[] = []

  if (!contactData.name) {
    contactDataErrors.push({ field: 'name', type: 'empty' })
  } else if (typeof contactData.name !== 'string') {
    contactDataErrors.push({ field: 'name', type: 'invalid' })
  }

  if (!contactData.contactMethod) {
    contactDataErrors.push({ field: 'contact-method', type: 'empty' })
  } else if (
    contactData.contactMethod === 'email' ||
    contactData.contactMethod === 'phone' ||
    contactData.contactMethod === 'either'
  ) {
    if (
      contactData.contactMethod === 'email' ||
      contactData.contactMethod === 'either'
    ) {
      if (!contactData.email) {
        contactDataErrors.push({ field: 'email', type: 'empty' })
      } else if (
        typeof contactData.email !== 'string' ||
        !regexs.email.test(contactData.email)
      ) {
        contactDataErrors.push({ field: 'email', type: 'invalid' })
      }
    }

    if (
      contactData.contactMethod === 'phone' ||
      contactData.contactMethod === 'either'
    ) {
      if (!contactData.phone) {
        contactDataErrors.push({ field: 'phone', type: 'empty' })
      } else if (
        typeof contactData.phone !== 'string' ||
        !regexs.phone.test(contactData.phone)
      ) {
        contactDataErrors.push({ field: 'phone', type: 'invalid' })
      }
    }
  } else {
    contactDataErrors.push({ field: 'contact-method', type: 'invalid' })
  }

  if (!contactData.message) {
    contactDataErrors.push({ field: 'message', type: 'empty' })
  } else if (typeof contactData.message !== 'string') {
    contactDataErrors.push({ field: 'message', type: 'invalid' })
  }

  if (contactData.termsPrivacyDisclaimerAgreement !== 'on') {
    contactDataErrors.push({
      field: 'terms-privacy-disclaimer-agreement',
      type: 'empty',
    })
  }

  if (contactData.contactConsent !== 'on') {
    contactDataErrors.push({ field: 'contact-consent', type: 'empty' })
  }

  if (contactDataErrors.length)
    return NextResponse.json({ errors: contactDataErrors }, { status: 400 })

  if (!(await ratelimit.submit.limit(clientIp)).success)
    return NextResponse.json({}, { status: 429 })

  const db = createKysely<Database.Alic3Dev>()
  try {
    await db
      .insertInto('contact_form')
      .values({
        name: contactData.name as string,
        contact_method: contactData.contactMethod as Api.Contact.Method,
        email: (contactData.email as string) || null,
        phone: (contactData.phone as string) || null,
        message: contactData.message as string,
        terms_privacy_disclaimer_agreement:
          contactData.termsPrivacyDisclaimerAgreement === 'on',
        contact_consent: contactData.contactConsent === 'on',
        client_ip: clientIp,
      })
      .executeTakeFirstOrThrow()
  } catch {
    return NextResponse.json({}, { status: 500 })
  } finally {
    db.destroy()
  }

  const hasSent = await mail.send({
    to: 'alic3dev@gmail.com',
    subject: 'Contact Form Submission',
    text: JSON.stringify({
      contactData: contactData,
      clientIp: clientIp || 'UNKNOWN',
    }),
    html: `
      <ul>
        <li>name: ${escapeHTML((contactData.name as string) ?? 'null')}</li>
        <li>contact_method: ${escapeHTML(
          (contactData.contactMethod as Api.Contact.Method) ?? 'null',
        )}</li>
        <li>email: ${escapeHTML((contactData.email as string) ?? 'null')}</li>
        <li>phone: ${escapeHTML((contactData.phone as string) ?? 'null')}</li>
        <li>message: ${escapeHTML(
          (contactData.message as string) ?? 'null',
        )}</li>
        <li>terms_privacy_disclaimer_agreement: ${escapeHTML(
          (contactData.termsPrivacyDisclaimerAgreement as string) ?? 'off',
        )}</li>
        <li>contact_consent: ${escapeHTML(
          (contactData.contactConsent as string) ?? 'off',
        )}</li>
        <li>client_ip: ${escapeHTML(clientIp ?? 'UNKNOWN')}</li>
      </ul>
    `,
  })

  if (!hasSent) {
    return NextResponse.json({}, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
