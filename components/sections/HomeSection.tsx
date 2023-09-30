'use client'

import React, { MouseEventHandler } from 'react'

import Section from './Section'
import styles from './HomeSection.module.scss'

export default function HomeSection(): JSX.Element {

    if (workSectionElement)
      workSectionElement.scrollIntoView({ behavior: 'smooth' })

    history.replaceState({}, '', '#work')

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
