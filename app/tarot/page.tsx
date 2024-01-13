import React from 'react'
import type { Metadata } from 'next'

import { Header, Tarot } from '@/components'
import { NoPageScroll } from '@/utils/useNoPageScroll'

export const metadata: Metadata = {
  title: 'Alic3.Dev - 🂡🂱🃁🃑',
  description: '🂡🂱🃁🃑T0🂡🂱🃁🃑R🂡🂱🃁🃑4T🂡🂱🃁🃑',
}

export default function TarotPage(): JSX.Element {
  return (
    <main>
      <NoPageScroll />

      <Tarot />

      <Header minimal />
    </main>
  )
}
