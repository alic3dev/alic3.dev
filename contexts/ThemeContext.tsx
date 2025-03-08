'use client'

import React from 'react'

export type Theme = 'light' | 'dark'

const selectedThemeLocalStorageKey = 'alic3:selected-theme'

function getCurrentTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'light'
  }

  const localStorageValue: string | null = window.localStorage.getItem(
    selectedThemeLocalStorageKey,
  )

  if (
    localStorageValue === 'dark' ||
    (localStorageValue !== 'light' &&
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    return 'dark'
  }

  return 'light'
}

interface ThemeContextInterface {
  theme: Theme
  toggle: () => void
  lockTheme: (lockedTheme: Theme | null) => void
}

export const ThemeContext = React.createContext<ThemeContextInterface>({
  theme: getCurrentTheme(),
  toggle: (): void => {},
  lockTheme: (): void => {},
})

export function ThemeContextWrapper({
  children,
}: React.PropsWithChildren): React.ReactElement {
  const [theme, setTheme] = React.useState<Theme>(getCurrentTheme)
  const [permaTheme, setPermaTheme] = React.useState<Theme | null>(null)

  const themeContextValue = React.useMemo<ThemeContextInterface>(
    (): ThemeContextInterface => ({
      theme: permaTheme ?? theme,
      toggle: (): void =>
        setTheme(
          (prevTheme: Theme): Theme =>
            prevTheme === 'dark' ? 'light' : 'dark',
        ),
      lockTheme: (lockedTheme: Theme | null): void =>
        setPermaTheme(lockedTheme),
    }),
    [theme, permaTheme],
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
        document.documentElement.classList.add(themeContextValue.theme)
        document.documentElement.classList.remove(
          themeContextValue.theme === 'dark' ? 'light' : 'dark',
        )

        window.localStorage.setItem(selectedThemeLocalStorageKey, theme)
      }

      hasSetFromLocalStorageRef.current.loop = true
    }
  }, [theme, themeContextValue])

  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  )
}
