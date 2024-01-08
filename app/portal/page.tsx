import React from 'react'

import { Footer, Header, Trip } from '@/components'
import { PortalBackground } from '@/components/decorative'

import styles from './page.module.scss'

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
