import { ServerRuntime } from 'next'
import { NextRequest, NextResponse } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import { createKysely } from '@vercel/postgres-kysely'
import { kv } from '@vercel/kv'

import regexs from '@/utils/regexs'

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
    limiter: Ratelimit.slidingWindow(1, '1 h'),
    ephemeralCache: ratelimitCache.submit,
    prefix: '@upstash/ratelimit/contact_submit',
  }),
}

export const runtime: ServerRuntime = 'edge'

const getContactDataErrors = (
  contactData: Api.Contact.Data
): Api.Contact.Error[] => {
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

  return contactDataErrors
}

/**
 * verifyRecaptcha() - `production` only
 *
 * To use in development you will need to whitelist your domain
 * https://console.cloud.google.com/security/recaptcha?project=alic3-dev
 *
 * @async
 * @param recpatchaToken Token returned from grecaptcha.enterprise.execute on client
 * @returns NextResponse (if an error occurred) | undefined (if captcha was validated as valid)
 */
const verifyRecaptcha = async (
  recpatchaToken: FormDataEntryValue | null
): Promise<Api.Recaptcha.ErrorResponse> => {
  if (process.env.NODE_ENV !== 'production') return

  if (!recpatchaToken || typeof recpatchaToken !== 'string')
    return NextResponse.json(
      { errors: [{ field: 'recaptcha', type: 'invalid' }] },
      { status: 400 }
    )

  try {
    const res: Response = await fetch(
      `https://recaptchaenterprise.googleapis.com/v1/projects/${process.env.GOOGLE_CLOUD_PROJECT_ID}/assessments?key=${process.env.GOOGLE_CLOUD_API_KEY}`,
      {
        method: 'POST',
        body: JSON.stringify({
          event: {
            token: recpatchaToken,
            siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
            expectedAction: 'SUBMIT_CONTACT_FORM',
          },
        }),
      }
    )
    const data: Api.Recaptcha.ResponseData | null = await res.json()

    if (
      !data?.tokenProperties.valid ||
      data.event.expectedAction !== data.tokenProperties.action
    ) {
      return NextResponse.json(
        { errors: [{ field: 'recaptcha', type: 'invalid' }] },
        { status: 400 }
      )
    }

    // TODO: Possibly use riskAnalysis score/reason in the future
  } catch {
    return NextResponse.json({}, { status: 500 })
  }
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
    await verifyRecaptcha(contactFormData.get('recaptcha-token'))
  if (captchaErrorResponse) return captchaErrorResponse

  const contactData: Api.Contact.Data = {
    name: contactFormData.get('name'),
    contactMethod: contactFormData.get('contact-method'),
    email: contactFormData.get('email'),
    phone: contactFormData.get('phone'),
    message: contactFormData.get('message'),
    termsPrivacyDisclaimerAgreement: contactFormData.get(
      'terms-privacy-disclaimer-agreement'
    ),
    contactConsent: contactFormData.get('contact-consent'),
  }

  const errors: Api.Contact.Error[] = getContactDataErrors(contactData)

  if (errors.length) return NextResponse.json({ errors }, { status: 400 })

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

  // TODO: Send an email notification that someone submitted this form

  return NextResponse.json({ success: true })
}
