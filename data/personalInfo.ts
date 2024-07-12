interface PersonalContactInfo {
  email: string
  phone: string
}

interface PersonalLink {
  href: string
  name?: string
}

interface ResumeLinksInfo {
  portfolio: PersonalLink
  github: PersonalLink
}

export interface PersonalInfo {
  name: string
  title: string
  location: string
  contact: PersonalContactInfo
  links: ResumeLinksInfo
}

export const personalInfo: PersonalInfo = {
  name: 'Alice Grace',
  title: 'Full Stack Developer',
  location: 'Fork Union, VA',
  contact: {
    email: 'alice@alic3.dev',
    phone: '+1 (434) 207-1336',
  },
  links: {
    github: {
      href: 'https://github.com/alic3dev',
      name: 'github.com/alic3dev',
    },
    portfolio: {
      href: 'https://alic3.dev',
      name: 'alic3.dev',
    },
  },
}
