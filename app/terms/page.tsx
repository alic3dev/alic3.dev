import { Footer, Header } from '@/components'
import { TermsAndConditions } from '@/components/legal'

export default function TermsPage(): JSX.Element {
  return (
    <main>
      <TermsAndConditions />

      <Footer />
      <Header />
    </main>
  )
}
