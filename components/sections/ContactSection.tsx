'use client'

import React from 'react'

import Section from './Section'
import styles from './ContactSection.module.scss'

type ContactMethod = '' | 'email' | 'phone' | 'either'

const setDefaultContactMethod = (prevValue: ContactMethod): ContactMethod =>
  !prevValue ? 'email' : prevValue

const messageMaxLength: number = 2000

export default function ContactSection(): JSX.Element {
  const [contactMethod, setContactMethod] = React.useState<ContactMethod>('')
  const [message, setMessage] = React.useState<string>('')

  const onMessageTextAreaChange = React.useCallback<
    React.ChangeEventHandler<HTMLTextAreaElement>
  >(
    (event: React.ChangeEvent<HTMLTextAreaElement>): void =>
      setMessage(event.currentTarget.value),
    []
  )

  const onFormSubmit: React.FormEventHandler<HTMLFormElement> =
    React.useCallback<React.FormEventHandler<HTMLFormElement>>(
      (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault()
        event.stopPropagation()

        console.log(new FormData(event.currentTarget).entries())

        // TODO: Implement this and server logic for form submission
      },
      []
    )

  // Work-around for default radio not being selected on-form-reset
  const onFormReset: React.FormEventHandler<HTMLFormElement> =
    React.useCallback<React.FormEventHandler<HTMLFormElement>>((): void => {
      setContactMethod('')

      setTimeout((): void => {
        setContactMethod(setDefaultContactMethod)
      }, 0)
    }, [])

  // Work-around for default radio not being selected on-load
  React.useEffect(() => setContactMethod(setDefaultContactMethod), [])

  return (
    <Section name="contact">
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
          <input type="text" name="name" autoComplete="name" required />
        </label>

        <fieldset>
          <legend>Preferred contact method</legend>

          <label>
            <input
              type="radio"
              name="contact_method"
              value="email"
              onChange={() => setContactMethod('email')}
              checked={contactMethod === 'email'}
              required
            />{' '}
            Email
          </label>
          <label>
            <input
              type="radio"
              name="contact_method"
              value="phone"
              onChange={() => setContactMethod('phone')}
              checked={contactMethod === 'phone'}
              required
            />{' '}
            Phone
          </label>
          <label>
            <input
              type="radio"
              name="contact_method"
              value="either"
              onChange={() => setContactMethod('either')}
              checked={contactMethod === 'either'}
              required
            />{' '}
            Either
          </label>
        </fieldset>

        {contactMethod !== 'phone' && (
          <label>
            Email
            <input type="email" name="email" autoComplete="email" required />
          </label>
        )}

        {contactMethod !== 'email' && contactMethod !== '' && (
          <label>
            Phone
            <input type="tel" name="phone" autoComplete="tel" required />
          </label>
        )}

        <label>
          Message
          <textarea
            name="message"
            maxLength={messageMaxLength}
            value={message}
            onChange={onMessageTextAreaChange}
            required
          ></textarea>
          <div className="textarea-counter">
            {message.length}/{messageMaxLength}
          </div>
        </label>

        <label>
          <input
            type="checkbox"
            name="terms-privacy-dislaimer-agreement"
            required
          />{' '}
          I have read and agree to the <a href="#">privacy policy</a>,{' '}
          <a href="#">terms of service</a>, and <a href="#">disclaimer</a>.
          {/* FIXME: Make these actual links */}
        </label>

        <label>
          <input type="checkbox" name="contact-consent" required /> I consent to
          being contacted in regards to the information provided.
        </label>

        <div className={styles['contact-form-controls']}>
          <input type="reset" name="reset" value="Clear" />
          <input type="submit" name="submit" value="Submit" />
        </div>
      </form>
    </Section>
  )
}
