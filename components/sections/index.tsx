import ContactSection from '@/components/sections/ContactSection'
import HomeSection from '@/components/sections/HomeSection'
import SkillsetSection from '@/components/sections/SkillsetSection'
import WorkSection from '@/components/sections/WorkSection'

export { ContactSection, HomeSection, SkillsetSection, WorkSection }

const sections: {
  [section: string]: React.FC
} = {
  ContactSection,
  HomeSection,
  SkillsetSection,
  WorkSection,
}

export default sections
