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

function HeaderBackground({
  scrollDepth,
}: {
  scrollDepth: number | null
}): JSX.Element {
  const scrollDepthIntroMapped: number = React.useMemo<number>(
    (): number => Math.min(1, (scrollDepth || 0) / 300),
    [scrollDepth],
  )

  return (
    <div
      className={styles['header-background']}
      style={{
        opacity: scrollDepthIntroMapped,
      }}
    />
  )
}

function onScroll(run: (scrollY: number) => void): () => void {
  let waitingForAnimationFrame: boolean = false
  let animationFrameHandle: number

  const _scrollEventListener = (): void => {
    if (waitingForAnimationFrame) return

    animationFrameHandle = window.requestAnimationFrame((): void => {
      run(window.scrollY)

      waitingForAnimationFrame = false
    })

    waitingForAnimationFrame = true
  }

  document.addEventListener('scroll', _scrollEventListener)

  return () => {
    document.removeEventListener('scroll', _scrollEventListener)
    window.cancelAnimationFrame(animationFrameHandle)
  }
}

export function FullHeader(): JSX.Element {
  const [scrollDepth, setScrollDepth] = React.useState<number | null>(null)
  const [currentLocation, setCurrentLocation] = React.useState<
    Pages.ValidLocation | undefined
  >()

  React.useEffect((): (() => void) => {
    const startingLocation: string | false =
      typeof window !== 'undefined' && window.location.hash.substring(1)

    const startingScrollDepth: number = window.scrollY

    if (validLocations.includes(startingLocation as Pages.ValidLocation)) {
      setCurrentLocation(startingLocation as Pages.ValidLocation)
    } else {
      setCurrentLocation(
        getScrollRelationalLocation(startingScrollDepth) || 'home',
      )
    }

    setScrollDepth(startingScrollDepth)
    return onScroll((scrollY) => setScrollDepth(scrollY))
  }, [])

  React.useEffect((): void => {
    if (scrollDepth === null) return

    const newLocation = getScrollRelationalLocation(scrollDepth)

    if (newLocation) setCurrentLocation(newLocation)
  }, [scrollDepth])

  const navigateToLocation = React.useCallback(
    (location: Pages.ValidLocation): void => {
      const sectionElement = document.getElementById(location)

      if (!sectionElement) throw new Error(`Couldn't find section: ${location}`)

      window.scrollTo({
        top: sectionElement.offsetTop - (location === 'projects' ? 0 : 100),
        behavior: 'smooth',
      })
    },
    [],
  )

  return (
    <header className={styles.header}>
      <HeaderBackground scrollDepth={scrollDepth} />

      <Title />

      <nav className={styles['navigation-header']}>
        <HeaderItem
          location="home"
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
          location="projects"
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

      <Link
        href="/portal"
        className={styles['header-icon']}
        aria-label="Portal"
      >
        <GiDiamondsSmile />
        <GiGluttonousSmile />
      </Link>
    </header>
  )
}

export function MinimalHeader(): JSX.Element {
  const [scrollDepth, setScrollDepth] = React.useState<number | null>(null)

  React.useEffect((): (() => void) => {
    setScrollDepth(window.scrollY)
    return onScroll((scrollY) => setScrollDepth(scrollY))
  }, [])

  return (
    <div className={styles['header']}>
      <HeaderBackground scrollDepth={scrollDepth} />

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
