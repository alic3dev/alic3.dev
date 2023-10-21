'use client'

import { NextFont } from 'next/dist/compiled/@next/font'
import { Inconsolata } from 'next/font/google'

import styles from '@/components/Header/Title.module.scss'

const titleMainStartFont: NextFont = Inconsolata({ subsets: ['latin'] })

export default function Title(): JSX.Element {
  return (
    <h1 className={styles.title}>
      <a className={styles['title-header']} href="/">
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
      </a>
    </h1>
  )
}
