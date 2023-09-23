'use client'

import React, { MouseEventHandler } from 'react'

import Section from './Section'
import styles from './HomeSection.module.scss'

export const HomeSection: React.FC = (): JSX.Element => {
  const onNextClick = React.useCallback<MouseEventHandler>((event) => {
    const workSectionElement = document.getElementById('work')

    if (workSectionElement)
      workSectionElement.scrollIntoView({ behavior: 'smooth' })

    event.preventDefault()
  }, [])

  return (
    <Section name="home">
      <a
        onClick={onNextClick}
        className={styles.next}
        aria-label="Next section"
        href="#work"
      />
    </Section>
  )
}

export default HomeSection
