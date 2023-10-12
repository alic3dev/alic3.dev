import { NextRequest, NextResponse } from 'next/server'

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

  // TODO: Store contact form data in DB and send an email containing the form to myself

  return NextResponse.json({ success: true })
}
