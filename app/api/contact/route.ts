import { ServerRuntime } from 'next'
import { NextRequest, NextResponse } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import { createKysely } from '@vercel/postgres-kysely'
import { kv } from '@vercel/kv'

type ContactFormServerFields =
  | 'name'
  | 'contactMethod'
  | 'email'
  | 'phone'
  | 'message'
  | 'termsPrivacyDisclaimerAgreement'
  | 'contactConsent'

type ContactData = Record<ContactFormServerFields, FormDataEntryValue | null>

interface RecaptchaResponseData {
  name: string
  event: {
    token: string
    siteKey: string
    userAgent: string
    userIpAddress: string
    expectedAction: string
    hashedAccountId: string
    express: boolean
    requestedUri: string
    wafTokenAssessment: boolean
    ja3: string
    headers: any[]
    firewallPolicyEvaluation: boolean
  }
  riskAnalysis: {
    score: number
    reasons: string[]
    extendedVerdictReasons: string[]
  }
  tokenProperties: {
    valid: boolean
    invalidReason: string
    hostname: string
    androidPackageName: string
    iosBundleId: string
    action: string
    createTime: string
  }
}

const ratelimit: Ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(1, '1 h'),
})

export const runtime: ServerRuntime = 'edge'

const getContactDataErrors = (
  contactData: ContactData
): Api.ContactAPIError[] => {
  const contactDataErrors: Api.ContactAPIError[] = []

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
      } else {
        // TODO: Validate email
      }
    }

    if (
      contactData.contactMethod === 'phone' ||
      contactData.contactMethod === 'either'
    ) {
      if (!contactData.phone) {
        contactDataErrors.push({ field: 'phone', type: 'empty' })
      } else {
        // TODO: Validate phone
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
): Promise<NextResponse | undefined> => {
  if (process.env.NODE_ENV !== 'production') return

  if (!recpatchaToken || typeof recpatchaToken !== 'string')
    return NextResponse.json(
      { errors: [{ field: 'recaptcha', type: 'invalid' }] } as {
        errors: Api.ContactAPIError[]
      },
      { status: 400 }
    )

  try {
    const res = await fetch(
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
    const data: RecaptchaResponseData | null = await res.json()

    if (
      !data?.tokenProperties.valid ||
      data.event.expectedAction !== data.tokenProperties.action
    ) {
      return NextResponse.json(
        { errors: [{ field: 'recaptcha', type: 'invalid' }] } as {
          errors: Api.ContactAPIError[]
        },
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

  if (!(await ratelimit.limit(clientIp)).success)
    return NextResponse.json({}, { status: 429 })

  const contactFormData: FormData = await req.formData()

  const captchaErrorResponse = await verifyRecaptcha(
    contactFormData.get('recaptcha-token')
  )
  if (captchaErrorResponse) return captchaErrorResponse

  const contactData: ContactData = {
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

  const errors: Api.ContactAPIError[] = getContactDataErrors(contactData)

  if (errors.length) return NextResponse.json({ errors }, { status: 400 })

  const db = createKysely<Database.Alic3Dev>()

  try {
    await db
      .insertInto('contact_form')
      .values({
        name: contactData.name as string,
        contact_method: contactData.contactMethod as Api.ContactMethod,
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
