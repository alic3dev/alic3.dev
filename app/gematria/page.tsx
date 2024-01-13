import React from 'react'
import { Metadata } from 'next'

import { Gematria, Header } from '@/components'
import { NoPageScroll } from '@/utils/useNoPageScroll'

export const metadata: Metadata = {
  title: 'Alic3.dev - Gematria',
  description: 'Gematria',
}

export default function GematriaPage(): JSX.Element {
  return (
    <main>
      <NoPageScroll />

      <Gematria />

      <Header minimal />
    </main>
  )
}
