import type { Metadata } from 'next'

import { Footer, Header } from '@/components'
import { LegalPageWrapper, PrivacyPolicy } from '@/components/legal'

export const metadata: Metadata = {
  title: 'Alic3.Dev - Privacy',
  description: 'Privacy policy for alic3.dev',
}

export default function PrivacyPage(): React.ReactElement {
  return (
    <main>
      <LegalPageWrapper>
        <PrivacyPolicy />
      </LegalPageWrapper>

      <Footer />
      <Header minimal />
    </main>
  )
}
