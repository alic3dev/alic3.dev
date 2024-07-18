'use client'

import React from 'react'
import Link from 'next/link'

import { IoIosWarning } from 'react-icons/io'

import { Footer, Header } from '@/components'

import { NoPageScroll } from '@/utils/useNoPageScroll'

import styles from '@/app/error.module.scss'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const [triedReset, setTriedReset] = React.useState<boolean>(false)
  const [showStack, setShowStack] = React.useState<boolean>(false)

  const tryReset = React.useCallback<() => void>((): void => {
    reset()
    setTriedReset(true)
  }, [reset])

  const toggleShowStack = React.useCallback<() => void>(
    (): void =>
      setShowStack((prevShowStack: boolean): boolean => !prevShowStack),
    [],
  )

  React.useEffect((): void => {
    console.error(error)
  }, [error])

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <IoIosWarning className={styles.icon} />

        <h1>Something went wrong</h1>

        <p className={styles.content}>
          {error.digest ? `${error.digest}: ` : ''}
          {error.name ? `${error.name}: ` : ''}
          {error.message}
        </p>

        {error.stack ? (
          <>
            <button
              onClick={toggleShowStack}
              className={`unstyled ${styles['stack-toggle']}`}
            >
              {showStack ? 'Hide stack' : 'Show stack'}
            </button>
            <pre
              className={`${styles.stack} ${showStack ? styles.visible : ''}`}
            >
              {error.stack}
            </pre>
          </>
        ) : (
          <></>
        )}

        <p className={styles.content}>
          <button onClick={tryReset} disabled={triedReset}>
            Try again
          </button>
        </p>

        <Link href="/">Home</Link>
      </div>

      <Header minimal noBg />
      <Footer noBg />

      <NoPageScroll />
    </main>
  )
}
