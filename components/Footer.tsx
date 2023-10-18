'use client'

import React from 'react'

import styles from './Footer.module.scss'

export default function Footer(): JSX.Element {
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
      <a href="/privacy" target="_blank" className={styles['footer-item']}>
        Privacy Policy
      </a>
      <a href="/terms" target="_blank" className={styles['footer-item']}>
        Terms of Service
      </a>
      <a href="/disclaimer" target="_blank" className={styles['footer-item']}>
        Disclaimer
      </a>
      <a href="/cookies" target="_blank" className={styles['footer-item']}>
        Cookies
      </a>

      <div className={styles['footer-section-seperator']} />

      <button onClick={onBackToTopClick} className={styles['footer-item']}>
        Back to top
      </button>
    </footer>
  )
}
