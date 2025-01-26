import React from 'react'
import Link from 'next/link'

import styles from '@/components/demandment/Footer.module.scss'

const copyrightYear: number = new Date().getFullYear()

export function Footer(): React.ReactNode {
  return (
    <footer className={styles.footer}>
      <span>
        &copy; Alice Grace {copyrightYear >= 2024 ? copyrightYear : 2024}
      </span>

      <Link href="/privacy" className={styles['footer-item']}>
        Privacy Policy
      </Link>
      <Link href="/terms" className={styles['footer-item']}>
        Terms of Service
      </Link>
      <Link href="/disclaimer" className={styles['footer-item']}>
        Disclaimer
      </Link>
      <Link href="/cookies" className={styles['footer-item']}>
        Cookies
      </Link>
    </footer>
  )
}
