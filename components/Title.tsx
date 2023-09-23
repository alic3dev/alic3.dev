'use client'

import { NextFont } from 'next/dist/compiled/@next/font'
import { Inconsolata } from 'next/font/google'

import styles from './Title.module.scss'

const titleMainStartFont: NextFont = Inconsolata({ subsets: ['latin'] })

export const Title: React.FC = () => {
  return (
    <a className={styles.title} href="/">
      <div className={styles['title-main']}>
        <span
          className={`${titleMainStartFont.className} ${styles['title-main-start']}`}
        >
          A
        </span>
        <span className={styles['title-no-click']}>
          l<span className={styles['title-main-middle']}>i</span>c
          <span className={styles['title-main-end']}>3</span>
        </span>
      </div>
      <div className={styles['title-secondary']} aria-hidden="true">
        L<span className={styles['title-emphasis']}>I</span>C3
      </div>
    </a>
  )
}

export default Title
