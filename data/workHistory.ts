export interface WorkHistoryPosition {
  name: string
  length?: string
  detailedLength?: string
  description: string
  technologies: string[]
}

export interface WorkHistoryCompany {
  name: string
  length: string
  detailedLength: string
  positions: WorkHistoryPosition[]
}

export const data: WorkHistoryCompany[] = [
  {
    name: 'The Humane League',
    length: '8 Months',
    detailedLength: 'Jan 2022 - Sep 2022',

    positions: [
      {
        name: 'Full-Stack Developer',
        description: 'TODO: Describe this position',
        technologies: ['ts', 'react', 'sass', 'postgresql'],
      },
    ],
  },
  {
    name: 'Osmosis - Knowledge Diffusion',
    length: '3 Years 5 Months',
    detailedLength: 'Jan 2018 - Jun 2021',

    positions: [
      {
        name: 'Full-Stack Developer',
        length: '2 Years 5 Months',
        detailedLength: 'Jan 2019 - Jun 2021',
        description:
          'Development and maintenance of backend APIs. Improvements to video processing and streaming technologies. Lead in vulnerability triaging and resolution. Mobile app development. Upgrades to payment processor.',
        technologies: [
          /*'js',*/ 'knockout',
          'less',
          'pug',
          'phonegap',
          'mariadb',
          'stripe',
          'hackerone',
        ],
      },
      {
        name: 'Front-End Developer',
        length: '10 Months',
        detailedLength: 'Mar 2018 - Jan 2019',
        description:
          'Implementation of new features. Maintenance of existing pages. Bug fixing. Ensuring mobile responsiveness.',
        technologies: [/*'js',*/ 'knockout', 'less', 'pug'],
      },
      {
        name: 'Front-End Developer Intern',
        length: '2 Months',
        detailedLength: 'Jan 2018 - Mar 2018',
        description: 'Developed web pages based upon Figma design files.',
        technologies: [/*'js',*/ 'knockout', 'less', 'pug'],
      },
    ],
  },
  {
    name: 'ECPI University',
    length: '2 Years',
    detailedLength: '2014 - 2016',

    positions: [
      {
        name: 'Student - Computer Science',
        length: '2 Years',
        detailedLength: '2014 - 2016',
        description: 'Focus on Database Programming',
        technologies: ['c++', 'mysql', 'java'],
      },
    ],
  },
]

export default data
