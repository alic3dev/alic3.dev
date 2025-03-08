import { Footer, Header } from '@/components'
import {
  ContactSection,
  HomeSection,
  ProjectsSection,
  WorkSection,
} from '@/components/sections'

export default function RootPage(): React.ReactElement {
  return (
    <main id="home">
      <HomeSection />
      <ProjectsSection />
      <WorkSection />
      <ContactSection />

      <Footer />

      <Header />
    </main>
  )
}
