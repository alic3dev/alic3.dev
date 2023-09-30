'use client'

import React from 'react'

import { TarotDeck } from '@/utils/TarotDeck'

export const Tarot: React.FC = (): JSX.Element => {
  const tarotDeck = new TarotDeck()

  console.log(tarotDeck)

  return <main>🂡🂱🃁🃑</main>
}

export default Tarot
