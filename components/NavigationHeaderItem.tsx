'use client'

import React from 'react'

import styles from './NavigationHeaderItem.module.scss'

import { ValidLocation } from '@/utils/validLocations'

export const NavigationHeaderItem: React.FC<{
  align?: 'right'
  location: ValidLocation
  currentLocation?: ValidLocation
  navigateToLocation: (location: ValidLocation) => void
}> = ({ align, location, currentLocation, navigateToLocation }) => {
  const isActive = React.useMemo<boolean>(
    () => location === currentLocation && currentLocation !== undefined,
    [location, currentLocation]
  )

  const className = React.useMemo<string>(
    () =>
      `${styles['navigation-header-item']} ${isActive && styles['active']} ${
        align === 'right' && styles['align-right']
      }`,
    [isActive, align]
  )

  const href = React.useMemo<string>(() => `#${location}`, [location])

  const onClick = React.useCallback<React.MouseEventHandler>(
    (event) => {
      if (!isActive) navigateToLocation(location)
      event.preventDefault()
    },
    [isActive, navigateToLocation, location]
  )

  return (
    <a className={className} onClick={onClick} href={href}>
      {location}
    </a>
  )
}

export default NavigationHeaderItem
