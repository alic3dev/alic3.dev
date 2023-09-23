'use client'

import WorkSection from '@/components/sections/WorkSection'
import HomeSection from '@/components/sections/HomeSection'

export { WorkSection, HomeSection }

const sections: {
  [section: string]: React.FC
} = {
  WorkSection,
  HomeSection,
}

export default sections
