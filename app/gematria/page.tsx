import React from 'react'
import { Metadata } from 'next'

import { Gematria } from '@/components/Gematria'

export const metadata: Metadata = {
  title: 'Alic3.dev - Gematria',
  description: 'Gematria',
}

export default function GematriaPage(): JSX.Element {
  return (
    <main>
      <Gematria />
    </main>
  )
}
