import React from 'react'

import { HomeIntro } from '@/components/HomeIntro'
import { BackgroundGrid } from '@/components/decorative/BackgroundGrid'
import { BG } from '@/components/decorative/BG'
import { Section } from '@/components/sections/Section'
import { NextButton } from '@/components/sections/NextButton'

import styles from '@/components/sections/HomeSection.module.scss'

export function HomeSection(): JSX.Element {
  return (
    <Section name="home" className={styles.section}>
      {/* <BackgroundGrid /> */}
      <BG />

      <HomeIntro />

      <NextButton scrollToId="work" />
    </Section>
  )
}
