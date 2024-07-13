import type { Links } from '@/components/LinksWithIcons'
import type { TechnologyName } from '@/components/decorative/TechnologyIcon'

export interface WorkHistoryPosition {
  name: string
  shortName?: string
  focus?: string
  length?: string
  detailedLength?: string
  startDate: Date
  endDate: Date
  description: string[]
  technologies: TechnologyName[]
  location?: 'Remote' | 'Hybrid-Remote' | 'Solo'
}

export interface WorkHistoryCompany {
  name: string
  length: string
  detailedLength: string
  startDate: Date
  endDate: Date
  location?: string
  links?: Links
  positions: WorkHistoryPosition[]

  logo?: JSX.Element
  logoLight?: JSX.Element
  logoDark?: JSX.Element
}

export type ExperienceSummary = string
export interface ExperienceSummaries {
  full: ExperienceSummary
  condensed: ExperienceSummary
}
