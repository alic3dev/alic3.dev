import Header from '@/components/Header'

import { ExperienceSection, IntroSection } from '@/components/sections'

export const Home: React.FC = (): JSX.Element => (
  <main>
    <Header />

    <IntroSection />
    <ExperienceSection />
  </main>
)

export default Home
