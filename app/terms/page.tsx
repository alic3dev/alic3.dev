import type { Metadata } from 'next'

import { Footer, Header } from '@/components'
import { LegalPageWrapper, TermsAndConditions } from '@/components/legal'

export const metadata: Metadata = {
  title: 'Alic3.dev - Terms',
  description: 'Terms and Conditions for alic3.dev',
}

export default function TermsPage(): React.ReactElement {
  return (
    <main>
      <LegalPageWrapper>
        <TermsAndConditions />
      </LegalPageWrapper>

      <Footer />
      <Header minimal />
    </main>
  )
}
