import { Footer, Header } from '@/components'
import { LegalPageWrapper, Disclaimer } from '@/components/legal'

export default function DisclaimerPage(): JSX.Element {
  return (
    <main>
      <LegalPageWrapper>
        <Disclaimer />
      </LegalPageWrapper>

      <Footer />
      <Header />
    </main>
  )
}
