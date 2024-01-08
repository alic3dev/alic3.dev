'use client'

import React from 'react'
import { GiDiamondsSmile, GiGluttonousSmile } from 'react-icons/gi'
import Link from 'next/link'

import { HeaderItem } from '@/components/Header/HeaderItem'
import { Title } from '@/components/Header/Title'

import { validLocations } from '@/utils/validLocations'

import styles from './Header.module.scss'

function getScrollRelationalLocation(
  scrollDepth: number,
): Pages.ValidLocation | null {
  for (const location of validLocations) {
    if (location === 'home') {
      if (scrollDepth <= 300) return 'home'

      continue
    }

    const locationElement: HTMLElement | null =
      document.getElementById(location)

    if (!locationElement) continue

    if (Math.abs(locationElement.offsetTop - scrollDepth) <= 300)
      return location
  }

  // FIXME: Check for closest location *above* scroll depth

  return null
}

export function FullHeader(): JSX.Element {
  const [scrollDepth, setScrollDepth] = React.useState<number | null>(null)
  const [currentLocation, setCurrentLocation] = React.useState<
    Pages.ValidLocation | undefined
  >()

  const scrollDepthIntroMapped: number = React.useMemo<number>(
    (): number => Math.min(1, (scrollDepth || 0) / 300),
    [scrollDepth],
  )

  React.useEffect((): void => {
    const startingLocation: string | false =
      typeof window !== 'undefined' && window.location.hash.substring(1)

    const startingScrollDepth: number = window.scrollY

    if (validLocations.includes(startingLocation as Pages.ValidLocation))
      setCurrentLocation(startingLocation as Pages.ValidLocation)
    else
      setCurrentLocation(
        getScrollRelationalLocation(startingScrollDepth) || 'home',
      )

    setScrollDepth(startingScrollDepth)

    let waitingForAnimationFrame: boolean = false
    document.addEventListener('scroll', (event) => {
      if (waitingForAnimationFrame) return

      window.requestAnimationFrame(() => {
        setScrollDepth(window.scrollY)

        waitingForAnimationFrame = false
      })

      waitingForAnimationFrame = true
    })
  }, [])

  React.useEffect((): void => {
    if (scrollDepth === null) return

    const newLocation = getScrollRelationalLocation(scrollDepth)

    if (newLocation) setCurrentLocation(newLocation)
  }, [scrollDepth])

  const navigateToLocation = React.useCallback(
    (location: Pages.ValidLocation): void => {
      const sectionElement = document.getElementById(location)
      if (sectionElement) sectionElement.scrollIntoView({ behavior: 'smooth' })
    },
    [],
  )

  return (
    <header className={styles.header}>
      <div
        className={styles['header-background']}
        style={{
          opacity: scrollDepthIntroMapped,
        }}
      />

      <Title />

      <nav className={styles['navigation-header']}>
        <HeaderItem
          location="home"
          currentLocation={currentLocation}
          navigateToLocation={navigateToLocation}
        />
        <HeaderItem
          location={'focus'}
          currentLocation={currentLocation}
          navigateToLocation={navigateToLocation}
        />

        <HeaderItem
          location="work"
          align={'right'}
          currentLocation={currentLocation}
          navigateToLocation={navigateToLocation}
        />
        <HeaderItem
          location={'contact'}
          align={'right'}
          currentLocation={currentLocation}
          navigateToLocation={navigateToLocation}
        />
      </nav>

      <div className={styles['navigation-header-spacer']} />

      <button className={styles['header-icon']} onClick={() => {}}>
        <GiDiamondsSmile />
        <GiGluttonousSmile />
      </button>
    </header>
  )
}

export function MinimalHeader(): JSX.Element {
  return (
    <div className={styles['title-wrapper']}>
      <Title />
    </div>
  )
}

export function Header({
  minimal = false,
}: {
  minimal?: boolean
}): JSX.Element {
  return minimal ? <MinimalHeader /> : <FullHeader />
}
