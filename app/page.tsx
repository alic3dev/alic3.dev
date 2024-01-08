import { Footer, Header, sections } from '@/components'
import { BackgroundCanvas } from '@/components/decorative'

export default function RootPage(): JSX.Element {
  return (
    <main id="home">
      <BackgroundCanvas />

      <sections.HomeSection />
      <sections.FocusSection />
      <sections.WorkSection />
      <sections.ContactSection />

      <Footer />

      <Header />
    </main>
  )
}
