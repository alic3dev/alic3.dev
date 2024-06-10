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
}

export const jobHistory: WorkHistoryCompany[] = [
  {
    name: 'The Humane League',

    length: '8 Months',
    detailedLength: 'Jan 2022 - Sep 2022',
    startDate: new Date('Jan 2022'),
    endDate: new Date('Sep 2022'),

    location: 'Remote',

    links: {
      external: 'https://thehumaneleague.org/',
    },

    positions: [
      {
        length: '8 Months',
        detailedLength: 'Jan 2022 - Sep 2022',
        startDate: new Date('Jan 2022'),
        endDate: new Date('Sep 2022'),
        name: 'Full Stack Developer',
        description: [
          'Developed components and pages in Typescript, React, and JSX.',
          'Creation and support of Contentful CMS components.',
          'Assisted in the reworking of donation processes and analytic systems to increase supporter conversion.',
          'Enhanced developer experience and reduced friction through maintenance of configurations for linting, formatting, and typings.',
        ],
        technologies: ['ts', 'react', 'sass', 'postgresql'],
        location: 'Remote',
      },
    ],
  },
  {
    name: 'Osmosis - Knowledge Diffusion',

    length: '3 Years 5 Months',
    detailedLength: 'Jan 2018 - Jun 2021',
    startDate: new Date('Jan 2018'),
    endDate: new Date('Jun 2021'),

    location: 'Hybrid Remote',

    links: {
      external: 'https://www.osmosis.org/',
    },

    positions: [
      {
        name: 'Full Stack Developer',

        length: '2 Years 5 Months',
        detailedLength: 'Jan 2019 - Jun 2021',
        startDate: new Date('Jan 2019'),
        endDate: new Date('Jun 2021'),

        location: 'Remote',

        description: [
          'Development and maintenance of backend REST APIs.',
          'Improvements to video streaming technologies including the introduction of encrypted HLS feeds through an FFMPEG processing pipeline to guard against content piracy.',
          'Lead in vulnerability triaging and resolution through HackerOne.',
          'Mobile app development with Apache Cordova.',
          'Upgrades to Stripe payment processor allowing recurring subscription based payments with Recurly.',
        ],
        technologies: [
          'knockout',
          'less',
          'pug',
          'phonegap',
          'mariadb',
          'stripe',
          'hackerone',
        ],
      },
      {
        name: 'Front End Developer',

        length: '10 Months',
        detailedLength: 'Mar 2018 - Jan 2019',
        startDate: new Date('Mar 2018'),
        endDate: new Date('Jan 2019'),

        location: 'Hybrid-Remote',

        description: [
          'Maintenance of existing pages to keep up with the evolving standards of the codebases reducing technical debt.',
          'Addressed user bug reports through replication and resolution.',
        ],
        technologies: ['knockout', 'less', 'pug'],
      },
      {
        name: 'Front End Developer Intern',

        length: '2 Months',
        detailedLength: 'Jan 2018 - Mar 2018',
        startDate: new Date('Jan 2018'),
        endDate: new Date('Mar 2018'),

        location: 'Hybrid-Remote',

        description: [
          'Production of web pages based upon Figma design files in a proprietary framework which utilized Knockout.js + Jade templating.',
        ],
        technologies: ['knockout', 'less', 'pug'],
      },
    ],
  },
]

export const freelancingHistory: WorkHistoryCompany[] = [
  {
    name: 'Clean Lines Lawn Care',

    length: '2 Months',
    detailedLength: 'Aug 2021 - Sep 2021',
    startDate: new Date('Aug 2021'),
    endDate: new Date('Sep 2021'),

    location: 'Remote',

    links: {
      external: 'https://www.cleanlineslawncare.com/',
    },

    positions: [
      {
        name: 'Freelance Web Developer',

        length: '2 Months',
        detailedLength: 'Aug 2021 - Sep 2021',
        startDate: new Date('Aug 2021'),
        endDate: new Date('Sep 2021'),

        location: 'Solo',

        description: [
          'Rewrite of front-end code from jQuery/HTML to React/JSX.',
          'Refactor of repository to follow modern standards and implement package management through NPM.',
        ],
        technologies: ['html', 'sass', 'mysql', 'php', 'react'],
      },
    ],
  },
  {
    name: 'Clean Lines Lawn Care',

    length: '2 Months',
    detailedLength: 'Mar 2017 - Apr 2017',
    startDate: new Date('Mar 2017'),
    endDate: new Date('Apr 2017'),

    location: 'Remote',

    links: {
      external: 'https://www.cleanlineslawncare.com/',
    },

    positions: [
      {
        name: 'Freelance Web Developer',

        length: '2 Months',
        detailedLength: 'Mar 2017 - Apr 2017',
        startDate: new Date('Mar 2017'),
        endDate: new Date('Apr 2017'),

        location: 'Solo',

        description: [
          'Solo development of a front and back-end with PHP to implement public facing pages modifiable through an administrative interface.',
          'Provided hosting/domain support via DigitalOcean and Namecheap.',
        ],
        technologies: ['html', 'sass', 'mysql', 'php', 'js', 'jquery'],
      },
    ],
  },
]

export const educationHistory: WorkHistoryCompany[] = [
  {
    name: 'ECPI University',

    length: '2 Years',
    detailedLength: '2014 - 2016',
    startDate: new Date('Jan 2014'),
    endDate: new Date('Sep 2016'),

    links: {
      external: 'https://www.ecpi.edu/',
    },

    positions: [
      {
        name: 'Student - Computer Science',
        shortName: 'Computer Science',
        focus: 'Database Programming',

        length: '2 Years',
        detailedLength: '2014 - 2016',
        startDate: new Date('Jan 2014'),
        endDate: new Date('Sep 2016'),

        description: ['Focus on Database Programming.'],
        technologies: ['c++', 'mysql', 'java'],
      },
    ],
  },
]

export const skills: {
  languages: string[]
  librariesAndFrameworks: string[]
  software: string[]
} = {
  languages: ['TypeScript', 'HTML5', 'CSS3', 'Sass', 'PostgreSQL'],
  librariesAndFrameworks: ['React', 'Next.js', 'Vite', 'Node.js'],
  software: ['Figma', 'Trello', 'Asana', 'Jira'],
}

export const data: WorkHistoryCompany[] = [...jobHistory, ...educationHistory]
