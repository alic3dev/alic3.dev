import type { Metadata } from 'next'

import { Footer, Header } from '@/components'
import { LegalPageWrapper, CookiePolicy } from '@/components/legal'

export const metadata: Metadata = {
  title: 'Alic3.Dev - Cookies',
  description: 'Cookie policy for alic3.dev',
}

export default function PrivacyPage(): React.ReactElement {
  return (
    <main>
      <LegalPageWrapper>
        <CookiePolicy />
      </LegalPageWrapper>

      <Footer />
      <Header minimal />
    </main>
  )
}
