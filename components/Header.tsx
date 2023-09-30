'use client'

import React from 'react'

import styles from './Header.module.scss'

import HeaderItem from '@/components/HeaderItem'
import Title from '@/components/Title'

import { validLocations, ValidLocation } from '@/utils/validLocations'

export default function Header() {
  const [currentLocation, setCurrentLocation] = React.useState<
    ValidLocation | undefined
  >()

  React.useEffect(() => {
    const startingLocation: string | false =
      typeof window !== 'undefined' && window.location.hash.substring(1)

    if (validLocations.includes(startingLocation as ValidLocation))
      setCurrentLocation(startingLocation as ValidLocation)
    else setCurrentLocation('home')
  }, [])

  const navigateToLocation = React.useCallback(
    (location: ValidLocation): void => {
      setCurrentLocation(location)

      const sectionElement = document.getElementById(location)
      if (sectionElement) sectionElement.scrollIntoView({ behavior: 'smooth' })

      history.replaceState({}, '', `#${location}`)
    },
    []
  )

  return (
    <header className={styles.header}>
      <Title />

      <nav className={styles['navigation-header']}>
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
      </nav>
    </header>
  )
}
