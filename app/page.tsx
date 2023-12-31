import { BackgroundCanvas, Footer, Header, Sections } from '@/components'

export default function RootPage(): JSX.Element {
  return (
    <main id="home">
      <BackgroundCanvas />

      <Sections.HomeSection />
      <Sections.FocusSection />
      <Sections.WorkSection />
      <Sections.ContactSection />

      <Footer />

      <Header />
    </main>
  )
}
