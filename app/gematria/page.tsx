import type { Metadata } from 'next'

import React from 'react'

import { Gematria, Header } from '@/components'
import { NoPageScroll } from '@/utils/useNoPageScroll'

export const metadata: Metadata = {
  title: 'Alic3.dev - Gematria',
  description: 'Gematria',
}

export default function GematriaPage(): React.ReactElement {
  return (
    <main>
      <NoPageScroll />

      <Gematria />

      <Header minimal />
    </main>
  )
}
