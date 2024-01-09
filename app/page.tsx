import { Footer, Header } from '@/components'
import {
  ContactSection,
  HomeSection,
  ProjectsSection,
  WorkSection,
} from '@/components/sections'

export default function RootPage(): JSX.Element {
  return (
    <main id="home">
      <BackgroundCanvas />

      <HomeSection />
      {/* <FocusSection /> */}
      <WorkSection />
      <ProjectsSection />
      <ContactSection />

      <Footer />

      <Header />
    </main>
  )
}
