import { Metadata, Viewport } from 'next'
import { Exo_2 } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

import '@/app/globals.scss'

const bodyFont = Exo_2({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Alic3.Dev',
  description: '0u0\\',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
}

export default function RootLayout({
  children,
}: React.PropsWithChildren): JSX.Element {
  return (
    <html lang="en">
      <body className={bodyFont.className}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
