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

  if (theme === 'light') {
    colorScheme.rosewater = '#000000';
    colorScheme.flamingo = '#000000';
    colorScheme.pink = '#000000';
    colorScheme.mauve = '#000000';
    colorScheme.red = '#000000';
    colorScheme.sapphire = '#000000';
    colorScheme.sky = '#000000';
    colorScheme.teal = '#000000';
    colorScheme.green = '#000000';
    colorScheme.yellow = '#000000';
    colorScheme.peach = '#000000';
    colorScheme.maroon = '#000000';
    colorScheme.blue = '#000000';
    colorScheme.lavender = '#000000';
    colorScheme.text = '#000000';
    colorScheme.subtext1 = '#000000';
    colorScheme.subtext0 = '#000000';
    colorScheme.base = '#FFFFFF';
    colorScheme.crust = '#FFFFFF';
    colorScheme.mantle = '#FFFFFF';
    colorScheme.overlay2 = '#FFFFFF';
    colorScheme.overlay1 = '#FFFFFF';
    colorScheme.overlay0 = '#FFFFFF';
    colorScheme.surface2 = '#FFFFFF';
    colorScheme.surface1 = '#FFFFFF';
    colorScheme.surface0 = '#FFFFFF';
  } else {
    colorScheme.rosewater = '#FFFFFF';
    colorScheme.flamingo = '#FFFFFF';
    colorScheme.pink = '#FFFFFF';
    colorScheme.mauve = '#FFFFFF';
    colorScheme.red = '#FFFFFF';
    colorScheme.sapphire = '#FFFFFF';
    colorScheme.sky = '#FFFFFF';
    colorScheme.teal = '#FFFFFF';
    colorScheme.green = '#FFFFFF';
    colorScheme.yellow = '#FFFFFF';
    colorScheme.peach = '#FFFFFF';
    colorScheme.maroon = '#FFFFFF';
    colorScheme.blue = '#FFFFFF';
    colorScheme.lavender = '#FFFFFF';
    colorScheme.text = '#FFFFFF';
    colorScheme.subtext1 = '#FFFFFF';
    colorScheme.subtext0 = '#FFFFFF';
    colorScheme.base = '#000000';
    colorScheme.crust = '#000000';
    colorScheme.mantle = '#000000';
    colorScheme.overlay2 = '#000000';
    colorScheme.overlay1 = '#000000';
    colorScheme.overlay0 = '#000000';
    colorScheme.surface2 = '#000000';
    colorScheme.surface1 = '#000000';
    colorScheme.surface0 = '#000000';
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
