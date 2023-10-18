'use client'

import React from 'react'
import Script from 'next/script'

import Spinner from '@/components/decorative/Spinner'

import Section from './Section'
import styles from './ContactSection.module.scss'

const setDefaultContactMethod = (
  prevValue: Api.ContactMethod | ''
): Api.ContactMethod => (!prevValue ? 'email' : prevValue)

const messageMaxLength: number = 5000

export default function ContactSection(): JSX.Element {
  const [contactMethod, setContactMethod] = React.useState<
    Api.ContactMethod | ''
  >('')
  const [message, setMessage] = React.useState<string>('')
  const [submitting, setSubmitting] = React.useState<boolean>(false)
  const [loading, setLoading] = React.useState<boolean>(true)

  const onMessageTextAreaChange = React.useCallback<
    React.ChangeEventHandler<HTMLTextAreaElement>
  >(
    (event: React.ChangeEvent<HTMLTextAreaElement>): void =>
      setMessage(event.currentTarget.value),
    []
  )

  const onFormSubmit: React.FormEventHandler<HTMLFormElement> =
    React.useCallback<React.FormEventHandler<HTMLFormElement>>(
      async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
        event.stopPropagation()

        if (submitting) return

        setSubmitting(true)

        try {
          const body: FormData = new FormData(event.currentTarget)

          if (process.env.NODE_ENV === 'production') {
            const recaptchaToken: string = await grecaptcha.enterprise.execute(
              process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
              {
                action: 'SUBMIT_CONTACT_FORM',
              }
            )
            body.append('recaptcha-token', recaptchaToken)
          }

          const res: Response = await fetch('/api/contact', {
            method: 'POST',
            body,
          })

          const data: { success?: boolean; errors?: Api.ContactAPIError } =
            await res.json()
          if (!data.success) throw new Error('Unexpected error')

          console.log(data)
        } catch (error) {
          console.error(error)
        } finally {
          setSubmitting(false)
        }

        // TODO: Implement success states
      },
      [submitting]
    )

  // Work-around for default radio not being selected on-form-reset
  const onFormReset: React.FormEventHandler<HTMLFormElement> =
    React.useCallback<React.FormEventHandler<HTMLFormElement>>((): void => {
      setContactMethod('')
      setMessage('')

      setTimeout((): void => {
        setContactMethod(setDefaultContactMethod)
      }, 0)
    }, [])

  // Work-around for default radio not being selected on-load
  React.useEffect(() => {
    setContactMethod(setDefaultContactMethod)

    if (process.env.NODE_ENV !== 'production') setLoading(false)
  }, [])

  return (
    <Section name="contact">
      {process.env.NODE_ENV === 'production' && (
        <Script
          src={`https://www.google.com/recaptcha/enterprise.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          onLoad={() => grecaptcha.enterprise.ready(() => setLoading(false))}
        />
      )}

      <div className={styles['section-header']}>
        <h2>Contact</h2>
      </div>

      <div className={styles['contact-options']}>
        <p>You may contact me directly via email</p>

        <p>
          <a href="mailto:alic3dev@gmail.com">alic3dev@gmail.com</a>
        </p>

        <div className={styles['contact-options-seperator']}>OR</div>

        <p>
          Complete and submit the form below with your inquiry and I will reach
          back out to you as soon as possible
        </p>
      </div>

      <form
        className={styles['contact-form']}
        onSubmit={onFormSubmit}
        onReset={onFormReset}
      >
        <label>
          Name
          <input
            type="text"
            name="name"
            autoComplete="name"
            disabled={submitting}
            required
          />
        </label>

        <fieldset>
          <legend>Preferred contact method</legend>

          <label>
            <input
              type="radio"
              name="contact-method"
              value="email"
              onChange={() => setContactMethod('email')}
              checked={contactMethod === 'email'}
              disabled={submitting}
              required
            />{' '}
            Email
          </label>
          <label>
            <input
              type="radio"
              name="contact-method"
              value="phone"
              onChange={() => setContactMethod('phone')}
              checked={contactMethod === 'phone'}
              disabled={submitting}
              required
            />{' '}
            Phone
          </label>
          <label>
            <input
              type="radio"
              name="contact-method"
              value="either"
              onChange={() => setContactMethod('either')}
              checked={contactMethod === 'either'}
              disabled={submitting}
              required
            />{' '}
            Either
          </label>
        </fieldset>

        {contactMethod !== 'phone' && (
          <label>
            Email
            <input
              type="email"
              name="email"
              autoComplete="email"
              disabled={submitting}
              required
            />
          </label>
        )}

        {contactMethod !== 'email' && contactMethod !== '' && (
          <label>
            Phone
            <input
              type="tel"
              name="phone"
              autoComplete="tel"
              disabled={submitting}
              required
            />
          </label>
        )}

        <label>
          Message
          <textarea
            name="message"
            maxLength={messageMaxLength}
            value={message}
            onChange={onMessageTextAreaChange}
            disabled={submitting}
            required
          ></textarea>
          <div className="textarea-counter">
            {message.length}/{messageMaxLength}
          </div>
        </label>

        <label>
          <input
            type="checkbox"
            name="terms-privacy-disclaimer-agreement"
            disabled={submitting}
            required
          />{' '}
          I have read and agree to the{' '}
          <a href="/privacy" target="_blank">
            privacy policy
          </a>
          ,{' '}
          <a href="/terms" target="blank">
            terms of service
          </a>
          , and{' '}
          <a href="/disclaimer" target="_blank">
            disclaimer
          </a>
          .
        </label>

        <label>
          <input
            type="checkbox"
            name="contact-consent"
            disabled={submitting}
            required
          />{' '}
          I consent to being contacted in regards to the information provided.
        </label>

        <div className={styles['contact-form-controls']}>
          <input
            type="reset"
            name="reset"
            value="Clear"
            disabled={submitting}
          />
          <input
            type="submit"
            name="submit"
            value="Submit"
            disabled={submitting}
          />
        </div>
        <div
          className={`
            ${styles['contact-form-overlay']}
            ${submitting || loading ? styles['active'] : ''}
          `}
        >
          {submitting ? 'Submitting Contact Form' : 'Loading'}
          <Spinner />
        </div>
      </form>
    </Section>
  )
}
