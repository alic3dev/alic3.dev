import React from 'react'

import { HomeIntro } from '@/components/HomeIntro'

import { Section } from '@/components/sections/Section'
import { NextButton } from '@/components/sections/NextButton'

import styles from '@/components/sections/HomeSection.module.scss'

export function HomeSection(): React.ReactElement {
  return (
    <Section name="home" className={styles.section}>
      <HomeIntro />

      <NextButton scrollToId="projects" />
    </Section>
  )
}
