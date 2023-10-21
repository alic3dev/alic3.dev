import { Footer, Header } from '@/components'
import { LegalPageWrapper, PrivacyPolicy } from '@/components/legal'

export default function PrivacyPage(): JSX.Element {
  return (
    <main>
      <LegalPageWrapper>
        <PrivacyPolicy />
      </LegalPageWrapper>

      <Footer />
      <Header />
    </main>
  )
}
