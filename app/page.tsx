import { BackgroundCanvas, Footer, Header, Sections } from '@/components'

export default function RootPage(): JSX.Element {
  return (
    <main id="home">
      <BackgroundCanvas />

      <Sections.HomeSection />
      <Sections.SkillsetSection />
      <Sections.WorkSection />
      <Sections.ContactSection />

      <Footer />

      <Header />
    </main>
  )
}
