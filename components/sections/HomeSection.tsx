'use client'

import React from 'react'

import Section from '@/components/sections/Section'
import styles from '@/components/sections/HomeSection.module.scss'

export default function HomeSection(): JSX.Element {
  const onNextClick = React.useCallback<
    React.MouseEventHandler<HTMLAnchorElement>
  >((event) => {
    const workSectionElement: HTMLElement | null =
      document.getElementById('focus')

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
        title="Next section"
        href="#focus"
      />
    </Section>
  )
}
