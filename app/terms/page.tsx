import { Footer, Header } from '@/components'
import { LegalPageWrapper, TermsAndConditions } from '@/components/legal'

export default function TermsPage(): JSX.Element {
  return (
    <main>
      <LegalPageWrapper>
        <TermsAndConditions />
      </LegalPageWrapper>

      <Footer />
      <Header />
    </main>
  )
}
