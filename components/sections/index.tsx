import { ContactSection } from '@/components/sections/ContactSection'
import { HomeSection } from '@/components/sections/HomeSection'
import { FocusSection } from '@/components/sections/FocusSection'
import { WorkSection } from '@/components/sections/WorkSection'
import { Section } from '@/components/sections/Section'

const sections: {
  [section: string]: React.FC
} = {
  ContactSection,
  HomeSection,
  FocusSection,
  WorkSection,
}

export {
  ContactSection,
  HomeSection,
  FocusSection,
  WorkSection,
  Section,
  sections,
}
