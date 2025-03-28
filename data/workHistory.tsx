import type {
  ExperienceSummaries,
  WorkHistoryCompany,
} from './workHistory.types'

import Image from 'next/image'

export const experienceSummaries: ExperienceSummaries = {
  full: 'Dynamic and detail-oriented Full Stack Developer with over five years of experience in developing and maintaining high-quality web applications. Proficient in TypeScript, React, and Node.js, with a strong background in creating and maintaining REST APIs, enhancing video streaming technologies, and improving developer experiences. Demonstrated ability to lead vulnerability triage and resolution, upgrade payment processors, and develop mobile apps. Adept at translating design files into functional web pages and optimizing code for performance and maintainability. Proven track record of increasing supporter conversion rates and adhering to modern development standards. Seeking to leverage my technical expertise and innovative problem-solving skills in a challenging development role.',
  condensed:
    'Experienced Full Stack Developer with 5+ years in TypeScript, React, and Node.js. Skilled in developing and maintaining REST APIs, enhancing video streaming, and improving developer experiences. Proven success in increasing supporter conversion rates and resolving security vulnerabilities. Seeking a challenging role to apply my technical expertise and innovative problem-solving skills.',
}

const imageSizes: string = "sizes='400px'"

export const jobHistory: WorkHistoryCompany[] = [
  {
    name: 'The Humane League',

    logoLight: (
      <Image
        src={'/thl-logo.light.png'}
        alt="The Humane League"
        sizes={imageSizes}
        fill
        suppressHydrationWarning
      />
    ),

    logoDark: (
      <Image
        src={'/thl-logo.dark.png'}
        alt="The Humane League"
        sizes={imageSizes}
        fill
        suppressHydrationWarning
      />
    ),

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
          'Improved developer experience by maintaining configurations for linting, formatting, and typings.',
          'Built components and pages using Typescript, React, and JSX.',
          'Created and maintained Contentful CMS components.',
          'Contributed to enhancing donation processes and analytic systems for higher supporter conversion rates.',
        ],
        technologies: ['ts', 'react', 'sass', 'postgresql'],
        location: 'Remote',
      },
    ],
  },
  {
    name: 'Osmosis - Knowledge Diffusion',

    logo: (
      <Image
        src="/osmosis-full.webp"
        alt="Osmosis from ELSEVIER"
        sizes={imageSizes}
        fill
      />
    ),

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
          'Enhanced video streaming technologies by implementing encrypted HLS feeds using an FFMPEG processing pipeline to prevent content piracy.',
          'Led vulnerability triage and resolution efforts on HackerOne platform.',
          'Created mobile apps with Apache Cordova framework.',
          'Upgraded Stripe payment processor for managing recurring subscription payments via Recurly.',
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
          'Maintained existing pages to meet updated code standards and minimize technical debt.',
          'Resolved user bug reports by reproducing and fixing issues.',
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

    logo: <></>,

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
          'Rewrote front-end code from jQuery/HTML to React JSX.',
          'Refactored repository to adhere to modern standards and integrated package management using NPM.',
        ],
        technologies: ['html', 'sass', 'mysql', 'php', 'react'],
      },
    ],
  },
  {
    name: 'Clean Lines Lawn Care',

    logo: <></>,

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
          'Developed front and back-end using PHP for public facing pages editable via an admin interface.',
          'Offered hosting and domain assistance through DigitalOcean and Namecheap.',
        ],
        technologies: ['html', 'sass', 'mysql', 'php', 'js', 'jquery'],
      },
    ],
  },
]

export const educationHistory: WorkHistoryCompany[] = [
  {
    name: 'ECPI University',

    logo: (
      <Image
        src="/ecpi-logo.svg"
        alt="ECPI University"
        sizes={imageSizes}
        fill
      />
    ),

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
  languages: [
    'JavaScript',
    'TypeScript',
    'HTML5',
    'CSS3',
    'Sass',
    'PostgreSQL',
  ],
  librariesAndFrameworks: ['React', 'Next.js', 'Vite', 'Node.js'],
  software: ['Figma', 'Trello', 'Asana', 'Jira'],
}

export const data: WorkHistoryCompany[] = [...jobHistory, ...educationHistory]
