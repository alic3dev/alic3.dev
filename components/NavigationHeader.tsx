'use client'

import React from 'react'

import styles from './NavigationHeader.module.scss'
import NavigationHeaderItem from './NavigationHeaderItem'

import { validLocations, ValidLocation } from '@/utils/validLocations'

export const NavigationHeader: React.FC = () => {
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
      window.location.hash = `#${location}`
    },
    []
  )

  return (
    <header className={styles['navigation-header']}>
      <NavigationHeaderItem
        location="home"
        currentLocation={currentLocation}
        navigateToLocation={navigateToLocation}
      />
      <NavigationHeaderItem
        location="work"
        currentLocation={currentLocation}
        navigateToLocation={navigateToLocation}
      />
      <NavigationHeaderItem
        location="personal"
        currentLocation={currentLocation}
        navigateToLocation={navigateToLocation}
      />

      <div className={styles['navigation-header-spacer']} />

      <NavigationHeaderItem
        align={'right'}
        location={'contact'}
        currentLocation={currentLocation}
        navigateToLocation={navigateToLocation}
      />
    </header>
  )
}

export default NavigationHeader
