declare global {
  namespace NodeJS {
    interface ProcessEnv {
      OPENAI_API_KEY: string
      GOOGLE_CLOUD_API_KEY: string
      GOOGLE_CLOUD_PROJECT_ID: string
      NEXT_PUBLIC_FEATURE_ENABLED_RECAPTCHA: string
      NEXT_PUBLIC_RECAPTCHA_SITE_KEY: string
      RECAPTCHA_SECRET_KEY: string
      ICLOUD_USER: string
      ICLOUD_PASSWORD: string
    }
  }
}

export {}
