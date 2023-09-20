import './globals.scss'

import type { Metadata } from 'next'
import { Exo_2 } from 'next/font/google'

const bodyFont = Exo_2({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Alic3.Dev',
  description: '0u0\\',
}

export const RootFunction: React.FC = ({
  children,
}: React.PropsWithChildren): JSX.Element => (
  <html lang="en">
    <body className={bodyFont.className}>{children}</body>
  </html>
)

export default RootFunction
