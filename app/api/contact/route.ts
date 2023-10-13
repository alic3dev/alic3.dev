import { NextRequest, NextResponse } from 'next/server'
import { createKysely } from '@vercel/postgres-kysely'

import { Alic3DevPostgresDatabase } from '@/schemas/database'
import { ContactMethod } from '@/schemas/contact_form'

interface ContactAPIError {
  field:
    | 'name'
    | 'contact-method'
    | 'email'
    | 'phone'
    | 'message'
    | 'terms-privacy-disclaimer-agreement'
    | 'contact-consent'
  type: 'empty' | 'invalid'
}

type ContactFormServerFields =
  | 'name'
  | 'contactMethod'
  | 'email'
  | 'phone'
  | 'message'
  | 'termsPrivacyDisclaimerAgreement'
  | 'contactConsent'

type ContactData = Record<ContactFormServerFields, FormDataEntryValue | null>

const db = createKysely<Alic3DevPostgresDatabase>()

const getContactDataErrors = (contactData: ContactData): ContactAPIError[] => {
  const contactDataErrors: ContactAPIError[] = []

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

export const POST = async (req: NextRequest) => {
  // TODO: Rate limiting/CAPTCHA

  const contactFormData: FormData = await req.formData()

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

  const errors: ContactAPIError[] = getContactDataErrors(contactData)

  if (errors.length) return NextResponse.json({ errors }, { status: 400 })

  try {
    await db
      .insertInto('contact_form')
      .values({
        name: contactData.name as string,
        contact_method: contactData.contactMethod as ContactMethod,
        email: (contactData.email as string) || null,
        phone: (contactData.phone as string) || null,
        message: contactData.message as string,
        terms_privacy_disclaimer_agreement:
          contactData.termsPrivacyDisclaimerAgreement === 'on',
        contact_consent: contactData.contactConsent === 'on',
        client_ip:
          req.ip ||
          req.headers.get('X-Real-IP') ||
          req.headers
            .get('X-Forwarded-For')
            ?.replace(/\s/g, '')
            .split(',')
            .pop() ||
          null,
      })
      .executeTakeFirstOrThrow()
  } catch {
    return NextResponse.json({}, { status: 500 })
  }

  // TODO: Send an email notification that someone submitted this form

  return NextResponse.json({ success: true })
}
