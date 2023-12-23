import React from 'react'
import type { Metadata } from 'next'

import { Tarot } from '@/components/Tarot'

export const metadata: Metadata = {
  title: '🂡🂱🃁🃑',
  description: '🂡🂱🃁🃑T0🂡🂱🃁🃑R🂡🂱🃁🃑4T🂡🂱🃁🃑',
}

export default function TarotPage(): JSX.Element {
  return (
    <main>
      <Tarot />
    </main>
  )
}
