import React from 'react'

import { AiFillMoon, AiFillSun } from 'react-icons/ai'
import { ThemeContext } from '@/contexts'

import styles from '@/components/ThemeToggle.module.scss'

export function ThemeToggle(): React.ReactElement {
  const themeContext = React.useContext(ThemeContext)

  const [refreshKey, setRefreshKey] = React.useState<number>(0)

  React.useEffect((): void => {
    setRefreshKey((prevRefreshKey: number): number => prevRefreshKey + 1)
  }, [])

  return (
    <button
      key={refreshKey}
      onClick={themeContext.toggle}
      className={styles['theme-toggle']}
    >
      {refreshKey && themeContext.theme === 'dark' ? (
        <AiFillMoon />
      ) : (
        <AiFillSun />
      )}
    </button>
  )
}
