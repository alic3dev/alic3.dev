'use client'

import React from 'react'
import Link from 'next/link'

import styles from '@/components/Footer.module.scss'

export function Footer(): JSX.Element {
  const copyrightYear = new Date().getFullYear()

  const onBackToTopClick: React.MouseEventHandler =
    React.useCallback<React.MouseEventHandler>(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

  return (
    <footer className={styles.footer}>
      <div className={styles['footer-item']}>
        &copy; Alice Grace {copyrightYear > 2023 ? copyrightYear : 2023}
      </div>
      <Link href="/privacy" target="_blank" className={styles['footer-item']}>
        Privacy Policy
      </Link>
      <Link href="/terms" target="_blank" className={styles['footer-item']}>
        Terms of Service
      </Link>
      <Link
        href="/disclaimer"
        target="_blank"
        className={styles['footer-item']}
      >
        Disclaimer
      </Link>
      <Link href="/cookies" target="_blank" className={styles['footer-item']}>
        Cookies
      </Link>

      <div className={styles['footer-section-seperator']} />

      <button onClick={onBackToTopClick} className={styles['footer-item']}>
        Back to top
      </button>
    </footer>
  )
}
