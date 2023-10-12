'use client'

import React from 'react'

import styles from './Header.module.scss'

import HeaderItem from '@/components/HeaderItem'
import Title from '@/components/Title'

import { validLocations, ValidLocation } from '@/utils/validLocations'

function getScrollRelationalLocation(
  scrollDepth: number
): ValidLocation | null {
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

export default function Header() {
  const [scrollDepth, setScrollDepth] = React.useState<number | null>(null)
  const [currentLocation, setCurrentLocation] = React.useState<
    ValidLocation | undefined
  >()

  const scrollDepthIntroMapped: number = React.useMemo<number>(
    (): number => Math.min(1, (scrollDepth || 0) / 300),
    [scrollDepth]
  )

  React.useEffect((): void => {
    const startingLocation: string | false =
      typeof window !== 'undefined' && window.location.hash.substring(1)

    const startingScrollDepth: number = window.scrollY

    if (validLocations.includes(startingLocation as ValidLocation))
      setCurrentLocation(startingLocation as ValidLocation)
    else
      setCurrentLocation(
        getScrollRelationalLocation(startingScrollDepth) || 'home'
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
    (location: ValidLocation): void => {
      const sectionElement = document.getElementById(location)
      if (sectionElement) sectionElement.scrollIntoView({ behavior: 'smooth' })
    },
    []
  )

  // React.useEffect((): void => {
  //   if (currentLocation) history.replaceState({}, '', `#${currentLocation}`)
  //   else history.replaceState({}, '', '')
  // }, [currentLocation])

  return (
    <header className={styles.header}>
      {/* <div
        className={styles['header-background']}
        style={{
          opacity: scrollDepthIntroMapped,
        }}
      /> */}

      <Title />

      {/* <nav className={styles['navigation-header']}>
        <HeaderItem
          location="home"
          currentLocation={currentLocation}
          navigateToLocation={navigateToLocation}
        />
        <HeaderItem
          location="work"
          currentLocation={currentLocation}
          navigateToLocation={navigateToLocation}
        />

        <div className={styles['navigation-header-spacer']} />

        <HeaderItem
          align={'right'}
          location={'personal'}
          currentLocation={currentLocation}
          navigateToLocation={navigateToLocation}
        >
          Misc
        </HeaderItem>

        <HeaderItem
          align={'right'}
          location={'contact'}
          currentLocation={currentLocation}
          navigateToLocation={navigateToLocation}
        />
      </nav> */}
    </header>
  )
}
