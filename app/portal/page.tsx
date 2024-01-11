import React from 'react'
import { Metadata } from 'next'

import { Footer, Header, Trip } from '@/components'
import { PortalBackground } from '@/components/decorative'

import styles from './page.module.scss'

export const metadata: Metadata = {
  title: 'Alic3.Dev - Portal',
  description: 'A portal to unknowns',
}

export default function PortalPage(): JSX.Element {
  return (
    <main className={styles.page}>
      <PortalBackground />

      <Trip />

      <Header minimal />
      <Footer />
    </main>
  )
}
