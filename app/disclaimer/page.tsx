import type { Metadata } from 'next'

import { Footer, Header } from '@/components'
import { LegalPageWrapper, Disclaimer } from '@/components/legal'

export const metadata: Metadata = {
  title: 'Alic3.Dev - Disclaimer',
  description: 'Disclaimer for alic3.dev',
}

export default function DisclaimerPage(): JSX.Element {
  return (
    <main>
      <LegalPageWrapper>
        <Disclaimer />
      </LegalPageWrapper>

      <Footer />
      <Header minimal />
    </main>
  )
}
