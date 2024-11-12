declare global {
  namespace Api.Contact {
    type Method = 'email' | 'phone' | 'either'

    type ContactFormServerFields =
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

  namespace Api.Gematria {
    type GematriaFormServerFields = 'encodedText'

    type GematriaFormServerOptionalFields =
      | 'ignoreCase'
      | 'ignoreCaseDirection'
      | 'ignoreSpaces'

    type Data = Record<GematriaFormServerFields, FormDataEntryValue | null> &
      Partial<
        Record<GematriaFormServerOptionalFields, FormDataEntryValue | null>
      >

    interface ResponseError {
      field: 'encoded-text' | 'ignore-case-direction' | 'unknown'
      type: 'empty' | 'invalid'
    }

    interface ResponseData {
      decoded: {
        values: number[]
        sum: number
      }
      success: boolean
    }
  }

  namespace Api.Recaptcha {
    type ErrorResponse =
      | NextResponse<{ errors: Api.Contact.Error[] } | object>
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
        headers: unknown[]
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
