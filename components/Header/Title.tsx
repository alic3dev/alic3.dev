'use client'

import type { NextFont } from 'next/dist/compiled/@next/font'

import Link from 'next/link'
import { Exo_2 } from 'next/font/google'
import { Inconsolata } from 'next/font/google'

import styles from '@/components/Header/Title.module.scss'

const titleFont: NextFont = Exo_2({ subsets: ['latin'] })
const titleMainStartFont: NextFont = Inconsolata({ subsets: ['latin'] })

export function Title(): JSX.Element {
  return (
    <h1 className={`${titleFont.className} ${styles.title}`}>
      <Link className={styles['title-header']} href="/">
        <div className={styles['title-main']}>
          <span
            className={`${titleMainStartFont.className} ${styles['title-main-start']}`}
          >
            A
          </span>
          <div className={styles['title-main-part']}>l</div>
          <div
            className={`${styles['title-main-middle']} ${styles['title-main-part']}`}
          >
            i
          </div>
          <div
            className={`${styles['title-main-c']} ${styles['title-main-part']}`}
          >
            c
          </div>
          <div
            className={`${styles['title-main-end']} ${styles['title-main-part']}`}
          >
            3
          </div>
        </div>
        <div className={styles['title-secondary']} aria-hidden="true">
          L<span className={styles['title-emphasis']}>I</span>C3
        </div>
      </Link>
    </h1>
  )
}
