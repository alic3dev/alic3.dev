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
      <HomeSection />
      <WorkSection />
      <ProjectsSection />
      <ContactSection />

      <Footer />

      <Header />
    </main>
  )
}
