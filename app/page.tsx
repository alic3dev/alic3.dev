import BackgroundCanvas from '@/components/BackgroundCanvas'
import Header from '@/components/Header'

import { WorkSection, HomeSection } from '@/components/sections'
import ContactSection from '@/components/sections/ContactSection'

export default function RootPage(): JSX.Element {
  return (
    <main id="home">
      <BackgroundCanvas />

      <HomeSection />
      <WorkSection />
      <ContactSection />

      <Header />
    </main>
  )
}
