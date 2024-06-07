import React from 'react'

import { Section } from '@/components/sections/Section'
import { NextButton } from '@/components/sections/NextButton'

import { BackgroundImages } from '@/components/decorative'

import styles from '@/components/sections/HomeSection.module.scss'

export function HomeSection(): JSX.Element {
  return (
    <Section name="home" className={styles.section}>
      <BackgroundImages />

      <h2 className={styles.header}>
        <span className={styles['full-stack']}>Full stack</span>{' '}
        <span className={styles['web-dev']}>web dev</span>
        <span className={styles['web-dev-end']}>elopment</span>
      </h2>

      <NextButton scrollToId="work" />
    </Section>
  )
}
