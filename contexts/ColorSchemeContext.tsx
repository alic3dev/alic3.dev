'use client'

import type { Theme } from './ThemeContext'

import type { AlphaColor, Color, Labels, Variants } from '@catppuccin/palette'

import React from 'react'
import palette from '@catppuccin/palette'

import { ThemeContext } from './ThemeContext'

export type ColorScheme = Labels<string, string>

interface IntermediaryColorSchemeExtraction {
  label: string
  hex: string
}

const defaultColorScheme: ColorScheme = Object.keys(palette.variants.latte)
  .map((label: string): IntermediaryColorSchemeExtraction => {
    return {
      label,
      hex: palette.variants.latte[label as keyof Labels<Color, AlphaColor>].hex,
    }
  })
  .reduce<Partial<ColorScheme>>(
    (
      prev: Partial<ColorScheme>,
      cur: IntermediaryColorSchemeExtraction,
    ): Partial<ColorScheme> => {
      prev[cur.label as keyof Labels<Color, AlphaColor>] = cur.hex

      return prev
    },
    {},
  ) as ColorScheme

export const ColorSchemeContext =
  React.createContext<ColorScheme>(defaultColorScheme)

function generateColorScheme(theme: Theme): ColorScheme {
  const colorScheme: ColorScheme = { ...defaultColorScheme }

  const variant: keyof Variants<Color> = theme === 'light' ? 'latte' : 'frappe'

  for (const label in palette.labels) {
    colorScheme[label as keyof Labels<Variants<Color>, Variants<Color>>] =
      palette.labels[label as keyof Labels<Variants<Color>, Variants<Color>>][
        variant
      ].hex
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
