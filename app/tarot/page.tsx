import React from 'react'
import type { Metadata } from 'next'

import { TarotDeck } from '@/utils/TarotDeck'

export const metadata: Metadata = {
  title: 'T🂡A🂱R🃁0🃑T',
  description: '🂡🂱🃁🃑T0🂡🂱🃁🃑R🂡🂱🃁🃑4T🂡🂱🃁🃑',
}

export default function TarotPage(): JSX.Element {
  const tarotDeck = new TarotDeck()

  // console.log(tarotDeck)
  // let c
  // while ((c = tarotDeck.drawRandomly())) console.log(c.toString())

  return <main>🂡🂱🃁🃑</main>
}
