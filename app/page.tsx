import BackgroundCanvas from '@/components/BackgroundCanvas'
import Header from '@/components/Header'

import { ExperienceSection, IntroSection } from '@/components/sections'

export const Home: React.FC = (): JSX.Element => (
  <main>
    <BackgroundCanvas />
    <Header />

    <IntroSection />
    <ExperienceSection />
  </main>
)

export default Home
