'use client'

import React from 'react'
import Script from 'next/script'

import { getSHA512Hash } from '@/utils/hashing'
import { expectedActions } from '@/utils/recaptchaActions'

export default function DemandmentAdminPage(): React.ReactElement {
  const [af23, setAf23] = React.useState<string>('')
  const [jt81, setJt81] = React.useState<string>('')

  const onFormSubmit = React.useCallback<
    React.FormEventHandler<HTMLFormElement>
  >(
    async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault()
      event.stopPropagation()

      const qoa: string = await getSHA512Hash(af23)
      const tni: string = await getSHA512Hash(jt81)

      const body: FormData = new FormData()
      body.append('zvb', qoa)
      body.append('znl', tni)

      if (
        process.env.NEXT_PUBLIC_FEATURE_ENABLED_RECAPTCHA &&
        process.env.NODE_ENV === 'production'
      ) {
        const recaptchaToken: string = await grecaptcha.enterprise.execute(
          process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
          {
            action: expectedActions.DEMANDMENT_ADMIN_LOGIN,
          },
        )

        body.append('recaptcha-token', recaptchaToken)
      }

      fetch('/api/demandment/admin', {
        method: 'POST',
        body,
      })
    },
    [af23, jt81],
  )

  return (
    <div>
      {process.env.NEXT_PUBLIC_FEATURE_ENABLED_RECAPTCHA &&
        process.env.NODE_ENV === 'production' && (
          <Script
            src={`https://www.google.com/recaptcha/enterprise.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
            // onLoad={() => grecaptcha.enterprise.ready((): void => setLoading(false))}
          />
        )}

      <br />

      <form onSubmit={onFormSubmit}>
        <input
          type="text"
          value={af23}
          onChange={(event) => setAf23(event.currentTarget.value)}
        />

        <input
          type="password"
          value={jt81}
          onChange={(event) => setJt81(event.currentTarget.value)}
        />

        <button type="submit">VNz92-</button>
      </form>
    </div>
  )
}
