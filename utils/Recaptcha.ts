import 'server-only'

import { NextResponse } from 'next/server'

import { expectedActions } from '@/utils/recaptchaActions'

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
export const verify = async (
  recpatchaToken: FormDataEntryValue | null,
  expectedAction: string,
): Promise<Api.Recaptcha.ErrorResponse> => {
  if (
    !process.env.NEXT_PUBLIC_FEATURE_ENABLED_RECAPTCHA ||
    process.env.NODE_ENV !== 'production'
  )
    return

  if (!recpatchaToken || typeof recpatchaToken !== 'string')
    return NextResponse.json(
      { errors: [{ field: 'recaptcha', type: 'invalid' }] },
      { status: 400 },
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
            expectedAction,
          },
        }),
      },
    )
    const data: Api.Recaptcha.ResponseData | null = await res.json()

    if (
      !data?.tokenProperties.valid ||
      data.event.expectedAction !== data.tokenProperties.action
    ) {
      return NextResponse.json(
        { errors: [{ field: 'recaptcha', type: 'invalid' }] },
        { status: 400 },
      )
    }

    // TODO: Possibly use riskAnalysis score/reason in the future
  } catch {
    return NextResponse.json({}, { status: 500 })
  }
}

export const Recaptcha: {
  expectedActions: typeof expectedActions
  verify: typeof verify
} = {
  expectedActions,
  verify,
}
