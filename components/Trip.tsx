'use client'

import React from 'react'
import Link from 'next/link'

import styles from '@/components/Trip.module.scss'

export function Trip(): JSX.Element {
  const [tripping, setTripping] = React.useState<boolean>(false)

  return (
    <div className={`${styles.content} ${tripping ? styles.tripping : ''}`}>
      <div className={styles.intro}>
        <div className={styles.title}>
          <h2>Would you like to take a trip?</h2>
          <h2 className={styles.drip}>Would you like to take a trip?</h2>
        </div>

        <div className={styles.options}>
          <button onClick={() => setTripping(true)}>Enter</button>
          <Link href="/">
            <button>Leave</button>
          </Link>
        </div>
      </div>

      <div className={styles.trip}>
        <div className={styles.title}>
          <h2>👁️⏝🧿🪡</h2>
        </div>

        <nav className={styles.navigation}>
          <Link href="/enivid">Enivid</Link>
          <Link href="/gematria">Gematria</Link>
          <Link href="/tarot">Tarot</Link>
          <Link href="/writings">Writings</Link>
        </nav>
      </div>
    </div>
  )
}
