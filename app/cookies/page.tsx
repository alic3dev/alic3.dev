import { Footer, Header } from '@/components'
import { CookiePolicy } from '@/components/legal'

export default function PrivacyPage(): JSX.Element {
  return (
    <main>
      <CookiePolicy />

      <Footer />
      <Header />
    </main>
  )
}
