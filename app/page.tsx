import BackgroundCanvas from '@/components/BackgroundCanvas'
import Header from '@/components/Header'

import { WorkSection, HomeSection } from '@/components/sections'

export const Home: React.FC = (): JSX.Element => (
  <main id="home">
    <BackgroundCanvas />

    <HomeSection />
    <WorkSection />

    <Header />
  </main>
)

export default Home
