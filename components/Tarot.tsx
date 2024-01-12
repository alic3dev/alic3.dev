'use client'

import React from 'react'

import { TarotCard, CardWithInfo } from '@/components/TarotCard'

import { useTarotDeck } from '@/hooks'
import { TarotDeck, Card } from '@/utils/TarotDeck'

import styles from './Tarot.module.scss'

export function Tarot(): JSX.Element {
  const tarotDeck: TarotDeck = useTarotDeck()
  const [drawnCards, setDrawnCards] = React.useState<CardWithInfo[]>([])

  const addCard = (card: Card) => {
    const reversed: boolean = Math.random() > 0.5

    const cardWithInfo: CardWithInfo = {
      id: crypto.randomUUID(),
      card,
      reversed,
      rotate: Math.random() * 10 - 5,
    }

    setDrawnCards((prevDrawnCards: CardWithInfo[]): CardWithInfo[] => [
      ...prevDrawnCards,
      cardWithInfo,
    ])
  }

  const getOnDrawClick =
    (from: 'top' | 'middle' | 'bottom' | 'random') => (): void => {
      const drawnCard =
        from === 'top'
          ? tarotDeck.drawFromTop()
          : from === 'middle'
          ? tarotDeck.drawFromMiddle()
          : from === 'bottom'
          ? tarotDeck.drawFromBottom()
          : tarotDeck.drawRandomly()

      if (drawnCard) addCard(drawnCard)
    }

  const onResetClick = (): void => {
    tarotDeck.reset()
    setDrawnCards([])
  }

  return (
    <div className={styles.tarot}>
      <div className={styles.content}>
        {drawnCards.map(
          (card: CardWithInfo): JSX.Element => (
            <TarotCard key={card.id} card={card} />
          ),
        )}
      </div>

      <div className={styles.controls}>
        <button>Shuffle</button>

        <div className={styles['draw-controls']}>
          <h3>Draw from</h3>
          <div className={styles['draw-controls-buttons']}>
            <button onClick={getOnDrawClick('top')}>Top</button>
            <button onClick={getOnDrawClick('middle')}>Middle</button>
            <button onClick={getOnDrawClick('bottom')}>Bottom</button>
            <button onClick={getOnDrawClick('random')}>Random</button>
          </div>
        </div>

        <button onClick={onResetClick}>Reset</button>
      </div>
    </div>
  )
}
