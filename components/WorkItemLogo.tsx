'use client'

import React from 'react'

import { ThemeContext } from '@/contexts'

export function WorkItemLogo({
  logo,
  logoLight,
  logoDark,
}: {
  logo?: React.ReactNode
  logoLight?: React.ReactNode
  logoDark?: React.ReactNode
}): React.ReactNode {
  const theme = React.useContext(ThemeContext)

  const [refreshKey, setRefreshKey] = React.useState<number>(0)

  React.useEffect((): void => {
    setRefreshKey((prevRefreshKey: number): number => prevRefreshKey + 1)
  }, [])

  return (
    <React.Fragment key={refreshKey}>
      {(theme.theme === 'light' ? logoLight : logoDark) ?? logo}
    </React.Fragment>
  )
}
