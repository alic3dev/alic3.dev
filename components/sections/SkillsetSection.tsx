'use client'

import React from 'react'

import { NextFont } from 'next/dist/compiled/@next/font'
import { Inconsolata } from 'next/font/google'

import Section from './Section'
import styles from './SkillsetSection.module.scss'
import { SiReact } from 'react-icons/si'
import { LuBinary } from 'react-icons/lu'

const modernFont: NextFont = Inconsolata({ subsets: ['latin'] })

interface RandomColorIndex {
  i: number
  c: 'green' | 'yellow' | 'red'
}

const getRandomColorIndexs = (): RandomColorIndex[] => {
  const numberOfRandomColors: number = Math.floor(Math.random() * 20)
  const randomColorIndexs: RandomColorIndex[] = []

  while (
    randomColorIndexs.length <
    (numberOfRandomColors > 18 ? 2 : numberOfRandomColors > 8 ? 1 : 0)
  ) {
    const randomColorIndex: number = Math.floor(Math.random() * 9)

    if (randomColorIndexs.find((v) => v.i === randomColorIndex)) continue

    const randomColor = Math.random() * 20

    randomColorIndexs.push({
      i: randomColorIndex,
      c: randomColor >= 8 ? 'green' : randomColor >= 4 ? 'yellow' : 'red',
    })
  }

  return randomColorIndexs
}

export default function SkillsetSection(): JSX.Element {
  const [randomColorIndexs, setRandomColorIndexs] = React.useState<
    RandomColorIndex[]
  >(getRandomColorIndexs())

  React.useEffect(() => {
    let flip = true

    const randomColorInterval: number = window.setInterval(() => {
      if (flip) setRandomColorIndexs(getRandomColorIndexs())
      else setRandomColorIndexs([])

      flip = !flip
    }, 500)

    return () => window.clearInterval(randomColorInterval)
  }, [])

  return (
    <Section
      name="focus"
      className={styles.section}
      containerClassName={styles['section-container']}
    >
      <h2 className={styles.header}>
        <span className={`${styles.modern} ${modernFont.className}`}>
          modern
        </span>{' '}
        full-stack <span className={styles['web-dev']}>web dev</span>elopment
      </h2>

      <p className={styles.utilizing}>
        Utilizing latest technologies and standards
      </p>

      <p className={styles.proficient}>( proficiently focused in )</p>
      <div className={styles.language}>
        <span className={styles.typescript}>
          <span className={styles.type}>Type</span>Script
        </span>
        <span className={styles.add}>
          {new Array(9).fill(null).map((v, i) => (
            <LuBinary
              className={(() => {
                const randomColorIndex = randomColorIndexs.find(
                  (v) => v.i === i
                )
                return randomColorIndex
                  ? styles[`add-icon-color-${randomColorIndex.c}`]
                  : styles['add-icon']
              })()}
              key={i}
            />
          ))}
        </span>
        <span className={styles.react}>
          <SiReact />
          &nbsp;&nbsp;React JS
        </span>
      </div>
    </Section>
  )
}
