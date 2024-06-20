'use client'

import React from 'react'

import styles from '@/components/sections/NextButton.module.scss'

export function NextButton({
  scrollToId,
}: {
  scrollToId: string
}): React.ReactNode {
  const onNextClick = React.useCallback<
    React.MouseEventHandler<HTMLAnchorElement>
  >(
    (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
      const workSectionElement: HTMLElement | null =
        document.getElementById(scrollToId)

      if (!workSectionElement) return

      window.scrollTo({
        top: workSectionElement.offsetTop - 100,
        behavior: 'smooth',
      })

      event.preventDefault()
      event.stopPropagation()
    },
    [scrollToId],
  )

  return (
    <a
      onClick={onNextClick}
      className={`${styles.next} button`}
      aria-label="Next section"
      title="Next section"
      href="#work"
    />
  )
}
