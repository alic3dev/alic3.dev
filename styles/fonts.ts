import {
  Rubik,
  Cormorant_Garamond,
  Geostar,
  Geostar_Fill,
} from 'next/font/google'

export const rubik = Rubik({ subsets: ['latin'] })

export const cormorantGaramond = Cormorant_Garamond({
  style: ['normal', 'italic'],
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
})

export const geostar = Geostar({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
})

export const geostarFill = Geostar_Fill({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
})

// TODO: Make a '@/fonts' shorthand for imports.
