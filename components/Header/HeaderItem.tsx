'use client'

import React from 'react'

import styles from '@/components/Header/HeaderItem.module.scss'

export default function HeaderItem({
  align,
  location,
  currentLocation,
  navigateToLocation,
  children,
}: {
  align?: 'right'
  location: Pages.ValidLocation
  currentLocation?: Pages.ValidLocation
  navigateToLocation: (location: Pages.ValidLocation) => void
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
      className={`${styles['header-item-wrapper']} ${
        isActive && styles['active']
      } ${align === 'right' ? styles['align-right'] : ''}`}
    >
      <a
        className={styles['header-item']}
        onClick={onClick}
        href={`#${location}`}
      >
        {children || location}
      </a>
    </span>
  )
}
