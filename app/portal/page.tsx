import type { Metadata } from 'next'

import React from 'react'

import { Footer, Header, Trip } from '@/components'
import { PortalBackground } from '@/components/decorative'

import { NoPageScroll } from '@/utils/useNoPageScroll'

import styles from '@/app/portal/page.module.scss'

export const metadata: Metadata = {
  title: 'Alic3.Dev - Portal',
  description: 'A portal to unknowns',
}

export default function PortalPage(): JSX.Element {
  return (
    <main className={styles.page}>
      <NoPageScroll />

      <PortalBackground />

      <Trip />

      <Header minimal />
      <Footer />
    </main>
  )
}
