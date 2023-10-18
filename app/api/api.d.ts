declare global {
  namespace Api.Contact {
    type Method = 'email' | 'phone' | 'either'

    type FormServerFields =
      | 'name'
      | 'contactMethod'
      | 'email'
      | 'phone'
      | 'message'
      | 'termsPrivacyDisclaimerAgreement'
      | 'contactConsent'

    type Data = Record<ContactFormServerFields, FormDataEntryValue | null>

    interface Error {
      field:
        | 'name'
        | 'contact-method'
        | 'email'
        | 'phone'
        | 'message'
        | 'terms-privacy-disclaimer-agreement'
        | 'contact-consent'
        | 'recaptcha'
      type: 'empty' | 'invalid'
    }
  }

  namespace Api.Recaptcha {
    type ErrorResponse =
      | NextResponse<{ errors: Api.Contact.Error[] } | {}>
      | undefined

    interface ResponseData {
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
  }
}

export {}
