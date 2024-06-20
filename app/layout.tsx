import type { Metadata, Viewport } from 'next'

import React from 'react'
import { Rubik } from 'next/font/google'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

import { ModalContainer } from '@/components/modals'
import { NotificationContainer } from '@/components/notifications'

import { AllPolyfills } from '@/polyfills'

import {
  ModalContextWrapper,
  NotificationContextWrapper,
  ThemeContextWrapper,
} from '@/contexts'

import '@/app/globals.scss'

const bodyFont = Rubik({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Alic3.Dev',
  description: '0u0\\',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
}

function ContextWrappers({
  children,
}: React.PropsWithChildren): React.ReactElement {
  return (
    <ThemeContextWrapper>
      <ModalContextWrapper>
        <NotificationContextWrapper>{children}</NotificationContextWrapper>
      </ModalContextWrapper>
    </ThemeContextWrapper>
  )
}

export default function RootLayout({
  children,
}: React.PropsWithChildren): JSX.Element {
  return (
    <html lang="en">
      <body className={bodyFont.className}>
        <AllPolyfills />

        <ContextWrappers>
          {children}

          <ModalContainer />
          <NotificationContainer />
        </ContextWrappers>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
