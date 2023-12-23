import React from 'react'

import { TarotDeck } from '@/utils/TarotDeck'

export function useTarotDeck(): TarotDeck {
  const [tarotDeck] = React.useState<TarotDeck>(() => new TarotDeck())

  return tarotDeck
}
