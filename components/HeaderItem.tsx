'use client'

import React from 'react'

import styles from './HeaderItem.module.scss'

import { ValidLocation } from '@/utils/validLocations'

export default function NavigationHeaderItem({
  align,
  location,
  currentLocation,
  navigateToLocation,
  children,
}: {
  align?: 'right'
  location: ValidLocation
  currentLocation?: ValidLocation
  navigateToLocation: (location: ValidLocation) => void
  children?: React.ReactNode
}): JSX.Element {
  const isActive = React.useMemo<boolean>(
    () => location === currentLocation && currentLocation !== undefined,
    [location, currentLocation]
  )

  const onClick = React.useCallback<React.MouseEventHandler>(
    (event) => {
      if (!isActive) navigateToLocation(location)
      event.preventDefault()
    },
    [isActive, navigateToLocation, location]
  )

  return (
    <span
      className={`${styles['navigation-header-item-wrapper']} ${
        isActive && styles['active']
      } ${align === 'right' ? styles['align-right'] : ''}`}
    >
      <a
        className={styles['navigation-header-item']}
        onClick={onClick}
        href={`#${location}`}
      >
        {children || location}
      </a>
    </span>
  )
}
