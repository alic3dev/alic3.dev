'use client'

import React from 'react'

export type Theme = 'light' | 'dark'

const selectedThemeLocalStorageKey = 'alic3:selected-theme'

interface ThemeContextInterface {
  theme: Theme
  toggle: () => void
}

export const ThemeContext = React.createContext<ThemeContextInterface>({
  theme: 'dark',
  toggle: (): void => {},
})

export function ThemeContextWrapper({
  children,
}: React.PropsWithChildren): JSX.Element {
  const [theme, setTheme] = React.useState<Theme>('dark')

  const themeContextValue = React.useMemo<ThemeContextInterface>(
    (): ThemeContextInterface => ({
      theme,
      toggle: (): void =>
        setTheme(
          (prevTheme: Theme): Theme =>
            prevTheme === 'dark' ? 'light' : 'dark',
        ),
    }),
    [theme],
  )

  const hasSetFromLocalStorageRef = React.useRef<{
    value: boolean
    loop: boolean
  }>({
    value: false,
    loop: false,
  })

  React.useEffect((): void | (() => void) => {
    if (!window.matchMedia) return

    if (!hasSetFromLocalStorageRef.current.value) {
      const localStorageValue: string | null = window.localStorage.getItem(
        selectedThemeLocalStorageKey,
      )

      if (localStorageValue) {
        setTheme(localStorageValue as Theme)
      } else if (!window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('light')
      }

      hasSetFromLocalStorageRef.current.value = true
    }

    const onColorSchemeChange = (event: MediaQueryListEvent): void => {
      setTheme(event.matches ? 'dark' : 'light')
    }

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', onColorSchemeChange)

    return (): void => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', onColorSchemeChange)
    }
  }, [])

  React.useEffect((): void => {
    if (hasSetFromLocalStorageRef.current.value) {
      if (hasSetFromLocalStorageRef.current.loop) {
        document.body.classList.add(theme)
        document.body.classList.remove(theme === 'dark' ? 'light' : 'dark')

        window.localStorage.setItem(selectedThemeLocalStorageKey, theme)
      }

      hasSetFromLocalStorageRef.current.loop = true
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  )
}
