'use client'

import type { CoverLetterParameters } from '@/reducers/coverLetterParametersReducer.types'

import React from 'react'
import dynamic from 'next/dynamic'

import { CoverLetter } from '@/components/CoverLetter'

import {
  coverLetterParametersReducer,
  getDefaultCoverLetterParameters,
} from '@/reducers/coverLetterParametersReducer'

import styles from '@/components/CoverLetterGenerator.module.scss'

export function CoverLetterGenerator(): React.ReactNode {
  const [coverLetterParameters, dispatch] = React.useReducer(
    coverLetterParametersReducer,
    {},
    getDefaultCoverLetterParameters,
  )

  const [coverLetterParametersDeferred, setCoverLetterParametersDeferred] =
    React.useState<CoverLetterParameters>(coverLetterParameters)

  React.useEffect((): (() => void) => {
    const timeoutHandle: number = window.setTimeout((): void => {
      setCoverLetterParametersDeferred(
        (): CoverLetterParameters => ({ ...coverLetterParameters }),
      )
    }, 1000)

    return (): void => {
      window.clearTimeout(timeoutHandle)
    }
  }, [coverLetterParameters])

  const onFormSubmit: React.FormEventHandler<HTMLFormElement> =
    React.useCallback<React.FormEventHandler<HTMLFormElement>>(
      (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault()
        event.stopPropagation()
      },
      [],
    )

  const onFormReset: React.FormEventHandler<HTMLFormElement> =
    React.useCallback<React.FormEventHandler<HTMLFormElement>>(
      (): void => dispatch({ type: 'reset' }),
      [],
    )

  return (
    <div className={styles.container}>
      <form
        className={styles.form}
        onSubmit={onFormSubmit}
        onReset={onFormReset}
      >
        <label>
          Date
          <br />
          <br />
          <input
            type="date"
            required
            value={coverLetterParameters.date
              .toLocaleDateString('zh-Hans-CN')
              .split('/')
              .map((datePart: string, index: number): string => {
                if (index > 0) {
                  return datePart.length == 2 ? datePart : `0${datePart}`
                }

                return datePart
              })
              .join('-')}
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
              const newDate: Date | null = event.currentTarget.valueAsDate
              console.log(newDate)

              if (newDate) {
                dispatch({ type: 'set', values: { date: newDate } })
              }
            }}
          />
        </label>

        <br />

        <label>
          Employer&apos;s Name
          <input
            type="text"
            required
            value={coverLetterParameters.employersName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
              dispatch({
                type: 'set',
                values: { employersName: event.currentTarget.value },
              })
            }}
          />
        </label>

        <label>
          Company Name
          <input
            type="text"
            required
            value={coverLetterParameters.companyName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
              dispatch({
                type: 'set',
                values: { companyName: event.currentTarget.value },
              })
            }}
          />
        </label>

        <label>
          Company Address
          <input
            type="text"
            value={coverLetterParameters.companyAddress}
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
              dispatch({
                type: 'set',
                values: { companyAddress: event.currentTarget.value },
              })
            }}
          />
        </label>

        <label>
          Job Title
          <input
            type="text"
            required
            value={coverLetterParameters.jobTitle}
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
              dispatch({
                type: 'set',
                values: { jobTitle: event.currentTarget.value },
              })
            }}
          />
        </label>

        <label>
          Specific reasons
          <textarea
            value={coverLetterParameters.specificReasons}
            required
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => {
              dispatch({
                type: 'set',
                values: { specificReasons: event.currentTarget.value },
              })
            }}
          />
        </label>

        <input type="reset" name="reset" value="Clear" />
      </form>

      <div className={styles['cover-letter']}>
        <CoverLetter coverLetterParameters={coverLetterParametersDeferred} />
      </div>
    </div>
  )
}

export const CoverLetterGeneratorDynamic = dynamic(
  () => Promise.resolve(CoverLetterGenerator),
  { ssr: false },
)
