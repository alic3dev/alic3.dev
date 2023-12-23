import React from 'react'
import { IconType } from 'react-icons'
import {
  GiD4,
  GiOrbWand,
  GiTwoHandedSword,
  GiJeweledChalice,
  GiPentacle,
} from 'react-icons/gi'

import { Card, MinorArcanaCard } from '@/utils/TarotDeck'

import styles from './TarotCard.module.scss'

export interface CardWithInfo {
  id: string
  card: Card
  reversed: boolean
  rotate: number
}

export function TarotCard({ card }: { card: CardWithInfo }): JSX.Element {
  const content = React.useMemo(() => {
    if (card.card instanceof MinorArcanaCard) {
      let iconToUse: JSX.Element = <GiD4 />

      switch (card.card.suitNumber) {
        case 0:
          iconToUse = (
            <GiJeweledChalice
              className={styles['card-icon']}
              style={
                {
                  // transform: 'rotate(45deg)',
                }
              }
            />
          )
          break
        case 1:
          iconToUse = (
            <GiTwoHandedSword
              className={styles['card-icon']}
              style={{
                transform: 'rotate(45deg)',
              }}
            />
          )
          break
        case 2:
          iconToUse = (
            <GiOrbWand
              className={styles['card-icon']}
              style={{
                transform: 'rotate(-45deg)',
              }}
            />
          )
          break
        case 3:
          iconToUse = (
            <GiPentacle
              className={styles['card-icon']}
              style={
                {
                  // transform: 'rotate(45deg)',
                }
              }
            />
          )
          break
      }

      const icons = new Array(
        card.card.valueNumber < 10 ? card.card.valueNumber + 1 : 0,
      )
        .fill(0)
        .map(
          (_v: CardWithInfo, i: number): JSX.Element => (
            <React.Fragment key={i}>{iconToUse}</React.Fragment>
          ),
        )

      return (
        <>
          <div className={styles['card-value']}>{card.card.valueString}</div>
          <div className={styles['card-icons']}>{icons}</div>
          <div className={styles['card-suit']}>{card.card.suitString}</div>
        </>
      )
    }

    return <div className={styles['card-name']}>{card.card.toString()}</div>
  }, [card.card])

  return (
    <div
      className={styles.card}
      style={{ transform: `rotate(${card.rotate}deg)` }}
    >
      <div
        className={styles['card-inner']}
        style={{ transform: card.reversed ? `rotate(180deg)` : '' }}
      >
        {content}
      </div>
    </div>
  )
}
