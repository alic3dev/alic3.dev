declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_RECAPTCHA_SITE_KEY: string
    }
  }
}

export {}
