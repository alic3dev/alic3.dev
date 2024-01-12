'use client'

import React from 'react'
import Link from 'next/link'
import Script from 'next/script'

import { Section } from '@/components/sections/Section'
import { Spinner } from '@/components/decorative'

import { PiSmileyXEyes } from 'react-icons/pi'
import { BsFillEnvelopeCheckFill } from 'react-icons/bs'

import styles from './ContactSection.module.scss'

const setDefaultContactMethod = (
  prevValue: Api.Contact.Method | '',
): Api.Contact.Method => (!prevValue ? 'email' : prevValue)

const messageMaxLength: number = 5000
const messageSentLocalStorageKey: string = 'root:contact-section:message-sent'

export function ContactSection(): JSX.Element {
  const [contactMethod, setContactMethod] = React.useState<
    Api.Contact.Method | ''
  >('')
  const [message, setMessage] = React.useState<string>('')
  const [submitting, setSubmitting] = React.useState<boolean>(false)
  const [loading, setLoading] = React.useState<boolean>(true)
  const [finalState, setFinalState] = React.useState<{
    error?: boolean
    success?: boolean
  } | null>(null)

  const onMessageTextAreaChange = React.useCallback<
    React.ChangeEventHandler<HTMLTextAreaElement>
  >(
    (event: React.ChangeEvent<HTMLTextAreaElement>): void =>
      setMessage(event.currentTarget.value),
    [],
  )

  const onFormSubmit: React.FormEventHandler<HTMLFormElement> =
    React.useCallback<React.FormEventHandler<HTMLFormElement>>(
      async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
        event.stopPropagation()

        if (submitting || loading) return

        setSubmitting(true)

        try {
          const body: FormData = new FormData(event.currentTarget)

          if (
            process.env.NEXT_PUBLIC_FEATURE_ENABLED_RECAPTCHA &&
            process.env.NODE_ENV === 'production'
          ) {
            const recaptchaToken: string = await grecaptcha.enterprise.execute(
              process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
              {
                action: 'SUBMIT_CONTACT_FORM',
              },
            )
            body.append('recaptcha-token', recaptchaToken)
          }

          const res: Response = await fetch('/api/contact', {
            method: 'POST',
            body,
          })

          const data: { success?: boolean; errors?: Api.Contact.Error } =
            await res.json()
          if (!data.success) throw new Error('Unexpected error')

          setFinalState({ success: true })

          window.localStorage.setItem(
            messageSentLocalStorageKey,
            new Date().toJSON(),
          )
        } catch {
          setFinalState({ error: true })
        } finally {
          setSubmitting(false)
        }
      },
      [submitting, loading],
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

    if (
      !process.env.NEXT_PUBLIC_FEATURE_ENABLED_RECAPTCHA ||
      process.env.NODE_ENV !== 'production'
    )
      setLoading(false)

    const lastSentMessageDateTime: string | null = window.localStorage.getItem(
      messageSentLocalStorageKey,
    )

    if (lastSentMessageDateTime) {
      if (
        new Date().valueOf() - new Date(lastSentMessageDateTime).valueOf() >=
        8.64e7 // One day in MS
      ) {
        window.localStorage.removeItem(messageSentLocalStorageKey)
      } else {
        setFinalState({ success: true })
      }
    }
  }, [])

  return (
    <Section name="contact" className={styles.section}>
      {process.env.NEXT_PUBLIC_FEATURE_ENABLED_RECAPTCHA &&
        process.env.NODE_ENV === 'production' && (
          <Script
            src={`https://www.google.com/recaptcha/enterprise.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
            onLoad={() => grecaptcha.enterprise.ready(() => setLoading(false))}
          />
        )}

      <div className={styles['section-header']}>
        <h2>Contact</h2>
      </div>

      <div className={styles['contact-options']}>
        <p>You may contact us directly via email</p>

        <p>
          <a href="mailto:alice@alic3.dev">alice@alic3.dev</a>
        </p>

        <div className={styles['contact-options-seperator']}>OR</div>

        <p>
          Complete and submit the form below with your inquiry and we will reach
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

        <label className={styles['contact-checkbox']}>
          <input
            type="checkbox"
            name="terms-privacy-disclaimer-agreement"
            disabled={submitting}
            required
          />{' '}
          I have read and agree to the{' '}
          <Link href="/privacy" target="_blank">
            privacy policy
          </Link>
          ,{' '}
          <Link href="/terms" target="blank">
            terms of service
          </Link>
          , and{' '}
          <Link href="/disclaimer" target="_blank">
            disclaimer
          </Link>
          .
        </label>

        <label className={styles['contact-checkbox']}>
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
          <h3>{submitting ? 'Submitting Contact Form' : 'Loading'}</h3>
          <Spinner />
        </div>

        <div
          className={`
            ${styles['contact-form-overlay']}
            ${finalState ? styles['active'] : ''}
          `}
        >
          {finalState?.error ? (
            <>
              <PiSmileyXEyes className={styles['contact-form-overlay-icon']} />

              <p>Whoops something went wrong</p>
            </>
          ) : (
            <>
              <h3>Thanks!</h3>

              <BsFillEnvelopeCheckFill
                className={styles['contact-form-overlay-icon']}
              />

              <p>
                Your messsage has been sent and we&apos;ll be in contact soon
              </p>
            </>
          )}
        </div>
      </form>
    </Section>
  )
}
