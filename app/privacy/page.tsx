import { Footer, Header } from '@/components'
import { PrivacyPolicy } from '@/components/legal'

export default function PrivacyPage(): JSX.Element {
  return (
    <main>
      <PrivacyPolicy />

      <Footer />
      <Header />
    </main>
  )
}
