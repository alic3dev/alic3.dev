import ContactSection from '@/components/sections/ContactSection'
import HomeSection from '@/components/sections/HomeSection'
import FocusSection from '@/components/sections/FocusSection'
import WorkSection from '@/components/sections/WorkSection'

export { ContactSection, HomeSection, FocusSection, WorkSection }

const sections: {
  [section: string]: React.FC
} = {
  ContactSection,
  HomeSection,
  FocusSection,
  WorkSection,
}

export default sections
