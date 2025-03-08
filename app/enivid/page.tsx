import 'server-only'

import type { Metadata } from 'next'

import React from 'react'

import { Enivid, Header } from '@/components'
import { NoPageScroll } from '@/utils/useNoPageScroll'

import styles from './page.module.scss'

export const metadata: Metadata = {
  title: 'Alic3.dev - Enivid',
  description: 'Enivid - Elbib | Naruq',
}

export default function EnividPage(): React.ReactElement {
  return (
    <main>
      <NoPageScroll />

      <div className={styles.content}>
        <Enivid />
      </div>

      <Header minimal />
    </main>
  )
}
