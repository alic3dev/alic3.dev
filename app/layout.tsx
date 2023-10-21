import type { Metadata } from 'next'
import { Exo_2 } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'

import '@/app/globals.scss'

const bodyFont = Exo_2({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Alic3.Dev',
  description: '0u0\\',
  viewport: 'width=device-width, initial-scale=1, minimum-scale=1',
}

export default function RootLayout({
  children,
}: React.PropsWithChildren): JSX.Element {
  return (
    <html lang="en">
      <body className={bodyFont.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
