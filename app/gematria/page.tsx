import React from 'react'
import type { Metadata } from 'next'

import { Gematria } from '@/components/Gematria'

export const metadata: Metadata = {
  title: 'Gematria',
  description: 'Gematria',
}

export default function GematriaPage(): JSX.Element {
  return (
    <main>
      <Gematria />
    </main>
  )
}
