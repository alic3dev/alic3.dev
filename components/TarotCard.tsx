import React from 'react'
import {
  GiD4,
  GiOrbWand,
  GiTwoHandedSword,
  GiJeweledChalice,
  GiPentacle,
  GiTowerFall,
  GiRingedPlanet,
  GiPrisoner,
  GiImprisoned,
  GiSunPriest,
  GiSunbeams,
  GiBarbedSun,
  GiTombstone,
  GiBlindfold,
  GiSewingNeedle,
  GiStripedSun,
  GiArm,
  GiSpinningWheel,
  GiEvilMoon,
  GiEvilLove,
  GiCrownOfThorns,
  GiSandSnake,
  GiScrollQuill,
  GiWarlockEye,
  GiWizardFace,
  GiCursedStar,
  GiGrimReaper,
  GiScales,
  GiThroneKing,
  GiEdgedShield,
  GiSnakeTongue,
  GiSpiderWeb,
  GiSharpCrown,
  GiElephantHead,
  GiDrippingStar,
  GiMountedKnight,
  GiHangingSpider,
  GiDamagedHouse,
  GiBlood,
  GiChariot,
} from 'react-icons/gi'

import { Card, MinorArcanaCard } from '@/utils/TarotDeck'

import styles from '@/components/TarotCard.module.scss'

export interface CardWithInfo {
  id: string
  card: Card
  reversed: boolean
  rotate: number
}

const majorIcons: React.FunctionComponent[] = [
  () => (
    <div className={`${styles['card-major-content']} ${styles['the-fool']}`}>
      <GiPrisoner />
      <GiPrisoner />
    </div>
  ), // 'The Fool',
  () => (
    <div
      className={`${styles['card-major-content']} ${styles['the-magician']}`}
    >
      <GiWizardFace />
      <GiWarlockEye />
      <GiScrollQuill />
    </div>
  ), // 'The Magician',
  () => (
    <div
      className={`${styles['card-major-content']} ${styles['the-high-priestess']}`}
    >
      <GiSunPriest />
    </div>
  ), // 'The High Priestess',
  () => (
    <div className={`${styles['card-major-content']} ${styles['']}`}>
      <GiSharpCrown />
    </div>
  ), // 'The Empress',
  () => (
    <div className={`${styles['card-major-content']} ${styles['']}`}>
      <GiCrownOfThorns />
    </div>
  ), // 'The Emporer',
  () => (
    <div className={`${styles['card-major-content']} ${styles['']}`}>
      <GiElephantHead />
    </div>
  ), // 'The Hierophant',
  () => (
    <div className={`${styles['card-major-content']} ${styles['the-lovers']}`}>
      <GiSandSnake />
      <GiSnakeTongue />
    </div>
  ), // 'The Lovers',
  () => (
    <div className={`${styles['card-major-content']} ${styles['']}`}>
      <GiChariot />
    </div>
  ), // 'The Chariot',
  () => (
    <div className={`${styles['card-major-content']} ${styles['strength']}`}>
      <GiArm />
      <GiArm />
      <GiArm />
      <GiArm />
      <GiArm />
      <GiArm />
    </div>
  ), // 'Strength',
  () => (
    <div className={`${styles['card-major-content']} ${styles['the-hermit']}`}>
      <GiDamagedHouse />
    </div>
  ), // 'The Hermit',
  () => (
    <div className={`${styles['card-major-content']} ${styles['']}`}>
      <GiSpinningWheel />
    </div>
  ), // 'Wheel of Fortune',
  () => (
    <div className={`${styles['card-major-content']} ${styles['justice']}`}>
      <GiScales />
    </div>
  ), // 'Justice',
  () => (
    <div
      className={`${styles['card-major-content']} ${styles['the-hanged-man']}`}
    >
      <GiSpiderWeb />
      <GiHangingSpider />
    </div>
  ), // 'The Hanged Man',
  () => (
    <div className={`${styles['card-major-content']} ${styles['death']}`}>
      <GiGrimReaper />
      <GiGrimReaper />
      <GiGrimReaper />
      <GiGrimReaper />
      <GiGrimReaper />
      <GiGrimReaper />
    </div>
  ), // 'Death',
  () => (
    <div className={`${styles['card-major-content']} ${styles['temperance']}`}>
      <GiBlood />
    </div>
  ), // 'Temperance',
  () => (
    <div className={`${styles['card-major-content']} ${styles['the-devil']}`}>
      <GiImprisoned />
      <GiEvilLove />
    </div>
  ), // 'The Devil',
  () => (
    <div className={`${styles['card-major-content']} ${styles['the-tower']}`}>
      <GiTowerFall />
    </div>
  ), // 'The Tower',
  () => (
    <div className={`${styles['card-major-content']} ${styles['the-star']}`}>
      <GiCursedStar />
      <GiDrippingStar />
    </div>
  ), // 'The Star',
  () => (
    <div className={`${styles['card-major-content']} ${styles['']}`}>
      <GiEvilMoon />
    </div>
  ), // 'The Moon',
  () => (
    <div className={`${styles['card-major-content']} ${styles['the-sun']}`}>
      <GiSunbeams />
      <GiStripedSun />
      <GiBarbedSun />
    </div>
  ), // 'The Sun',
  () => (
    <div className={`${styles['card-major-content']} ${styles['judgement']}`}>
      <GiBlindfold />
      <GiSewingNeedle />
    </div>
  ), // 'Judgement',
  () => (
    <div className={`${styles['card-major-content']} ${styles['']}`}>
      <GiRingedPlanet />
    </div>
  ), // 'The World',
]

export function TarotCard({ card }: { card: CardWithInfo }): JSX.Element {
  const content = React.useMemo(() => {
    if (card.card instanceof MinorArcanaCard) {
      let iconToUse: JSX.Element = <GiD4 className={styles['card-icon']} />

      switch (card.card.suitNumber) {
        case 0:
          iconToUse = <GiJeweledChalice className={styles['card-icon']} />
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
          iconToUse = <GiPentacle className={styles['card-icon']} />
          break
      }

      let content: JSX.Element = <></>

      if (card.card.valueNumber > 9) {
        let suitIconToUse = <GiMountedKnight className={styles['card-icon']} />

        switch (card.card.valueNumber) {
          case 10:
            suitIconToUse = <GiEdgedShield className={styles['card-icon']} />
            break
          case 11:
            suitIconToUse = <GiMountedKnight className={styles['card-icon']} />
            break
          case 12:
            suitIconToUse = <GiTombstone className={styles['card-icon']} />
            break
          case 13:
            suitIconToUse = <GiThroneKing className={styles['card-icon']} />
        }

        content = (
          <div className={styles['card-greater-minor-content']}>
            {suitIconToUse}
            {iconToUse}
          </div>
        )
      } else {
        const icons = new Array(
          card.card.valueNumber < 10 ? card.card.valueNumber + 1 : 0,
        )
          .fill(0)
          .map(
            (_v: CardWithInfo, i: number): JSX.Element => (
              <React.Fragment key={i}>{iconToUse}</React.Fragment>
            ),
          )

        content = <div className={styles['card-icons']}>{icons}</div>
      }

      return (
        <>
          <div className={styles['card-value']}>{card.card.valueString}</div>
          {content}
          <div className={styles['card-suit']}>
            {card.card.suitString.substring(0, 1).toUpperCase() +
              card.card.suitString.substring(1)}
          </div>
        </>
      )
    }

    const MajorContent = majorIcons[card.card.valueNumber - 14]

    return (
      <>
        <MajorContent />
        <div className={styles['card-name']}>{card.card.toString()}</div>
      </>
    )
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
