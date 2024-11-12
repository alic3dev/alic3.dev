'use client'

import type { Theme } from './ThemeContext'

import type { ColorName, FlavorName } from '@catppuccin/palette'

import React from 'react'
import * as palette from '@catppuccin/palette'

import { ThemeContext } from './ThemeContext'

export type ColorScheme = Record<ColorName, string>

interface IntermediaryColorSchemeExtraction {
  label: ColorName
  hex: string
}

const defaultColorScheme: ColorScheme = Object.keys(
  palette.flavors.latte.colors,
)
  .map((label: string): IntermediaryColorSchemeExtraction => {
    return {
      label: label as ColorName,
      hex: palette.flavors.latte.colors[label as ColorName].hex,
    }
  })
  .reduce<Partial<ColorScheme>>(
    (
      prev: Partial<ColorScheme>,
      cur: IntermediaryColorSchemeExtraction,
    ): Partial<ColorScheme> => {
      prev[cur.label as ColorName] = cur.hex

      return prev
    },
    {},
  ) as ColorScheme

export const ColorSchemeContext =
  React.createContext<ColorScheme>(defaultColorScheme)

function generateColorScheme(theme: Theme): ColorScheme {
  const colorScheme: ColorScheme = { ...defaultColorScheme }

  const variant: FlavorName = theme === 'light' ? 'latte' : 'frappe'

  for (const color in palette.flavors[variant].colors) {
    colorScheme[color as ColorName] =
      palette.flavors[variant].colors[color as ColorName].hex
  }

  return colorScheme
}

export function ColorSchemeContextWrapper({
  children,
}: React.PropsWithChildren): React.ReactNode {
  const theme = React.useContext(ThemeContext)
  const [colorScheme, setColorScheme] = React.useState<ColorScheme>(
    (): ColorScheme => generateColorScheme(theme.theme),
  )

  React.useEffect((): void | (() => void) => {
    setColorScheme(generateColorScheme(theme.theme))
  }, [theme])

  return (
    <ColorSchemeContext.Provider value={colorScheme}>
      {children}
    </ColorSchemeContext.Provider>
  )
}
