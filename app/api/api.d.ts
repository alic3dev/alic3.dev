declare global {
  namespace Api {
    type ContactMethod = 'email' | 'phone' | 'either'

    interface ContactAPIError {
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
}

export {}
