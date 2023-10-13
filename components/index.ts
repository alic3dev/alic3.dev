import BackgroundCanvas from '@/components/decorative/BackgroundCanvas'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

import Sections from '@/components/sections'

export { Sections, BackgroundCanvas, Footer, Header }

const components: {
  [component: string]: React.FC<any> | { [component: string]: React.FC<any> }
} = {
  Sections,

  BackgroundCanvas,
  Footer,
  Header,
}

export default components
