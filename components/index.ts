import BackgroundCanvas from '@/components/BackgroundCanvas'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import HeaderItem from '@/components/HeaderItem'
import Title from '@/components/Title'

import Sections from '@/components/sections'

export { Sections, BackgroundCanvas, Footer, Header, HeaderItem, Title }

const components: {
  [component: string]: React.FC<any> | { [component: string]: React.FC<any> }
} = {
  Sections,

  BackgroundCanvas,
  Footer,
  Header,
  HeaderItem,
  Title,
}

export default components
