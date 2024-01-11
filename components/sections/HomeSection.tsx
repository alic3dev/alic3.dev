'use client'

import React from 'react'

import { BackgroundImages } from '@/components/decorative'
import { Section } from '@/components/sections/Section'

import styles from './HomeSection.module.scss'

export function HomeSection(): JSX.Element {
  const onNextClick = React.useCallback<
    React.MouseEventHandler<HTMLAnchorElement>
  >((event): void => {
    const workSectionElement: HTMLElement | null =
      document.getElementById('work')

    if (!workSectionElement) return

    window.scrollTo({
      top: workSectionElement.offsetTop - 100,
      behavior: 'smooth',
    })

    event.preventDefault()
    event.stopPropagation()
  }, [])

  return (
    <Section name="home" className={styles.section}>
      <BackgroundImages />

      <h2 className={styles.header}>
        <span className={styles['full-stack']}>Full-stack</span>{' '}
        <span className={styles['web-dev']}>web-dev</span>
        <span className={styles['web-dev-end']}>elopment</span>
      </h2>
      <a
        onClick={onNextClick}
        className={styles.next}
        aria-label="Next section"
        title="Next section"
        href="#work"
      />
    </Section>
  )
}
