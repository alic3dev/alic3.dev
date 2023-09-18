import './globals.css'
import type { Metadata } from 'next'
import { Exo_2 } from 'next/font/google'

const bodyFont = Exo_2({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Alic3.Dev',
  description: '0u0\\',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={bodyFont.className}>{children}</body>
    </html>
  )
}
