import React from 'react'
import type { Metadata } from 'next'

import { Header, Tarot } from '@/components'

export const metadata: Metadata = {
  title: '🂡🂱🃁🃑',
  description: '🂡🂱🃁🃑T0🂡🂱🃁🃑R🂡🂱🃁🃑4T🂡🂱🃁🃑',
}

export default function TarotPage(): JSX.Element {
  return (
    <main>
      <Tarot />

      <Header minimal />
    </main>
  )
}
