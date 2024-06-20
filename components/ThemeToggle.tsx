import React from 'react'

import { AiFillMoon, AiFillSun } from 'react-icons/ai'
import { ThemeContext } from '@/contexts'

import styles from '@/components/ThemeToggle.module.scss'

export function ThemeToggle(): React.ReactElement {
  const themeContext = React.useContext(ThemeContext)

  return (
    <button onClick={themeContext.toggle} className={styles['theme-toggle']}>
      {themeContext.theme === 'dark' ? <AiFillMoon /> : <AiFillSun />}
    </button>
  )
}
