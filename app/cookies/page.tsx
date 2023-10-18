import { Footer, Header } from '@/components'
import { LegalPageWrapper, CookiePolicy } from '@/components/legal'

export default function PrivacyPage(): JSX.Element {
  return (
    <main>
      <LegalPageWrapper>
        <CookiePolicy />
      </LegalPageWrapper>

      <Footer />
      <Header />
    </main>
  )
}
