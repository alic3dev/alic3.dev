import BackgroundCanvas from '@/components/BackgroundCanvas'
import Footer from '@/components/Footer'
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

      <Footer />

      <Header />
    </main>
  )
}
