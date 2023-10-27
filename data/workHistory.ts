export interface WorkHistoryPosition {
  name: string
  shortName?: string
  focus?: string
  length?: string
  detailedLength?: string
  description: string[]
  technologies: string[]
}

export interface WorkHistoryCompany {
  name: string
  length: string
  detailedLength: string
  positions: WorkHistoryPosition[]
}

export const jobHistory: WorkHistoryCompany[] = [
  {
    name: 'The Humane League',
    length: '8 Months',
    detailedLength: 'Jan 2022 - Sep 2022',

    positions: [
      {
        length: '8 Months',
        detailedLength: 'Jan 2022 - Sep 2022',
        name: 'Full-Stack Developer',
        description: [
          'Collaborated across teams for the creation/support of features to be used internally with Contentful CMS for independent non-developer management of dynamic pages and articles.',
          'Assisted in reworkings of donation processes and analytic systems to increase supporter conversion.',
        ],
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
        description: [
          'Development and maintenance of backend REST APIs.',
          'Improvements to video streaming technologies including the introduction of encrypted HLS feeds through the creation of a processing pipeline using FFMPEG to guard against content piracy.',
          'Lead in vulnerability triaging and resolution through HackerOne.',
          'Mobile app development utilizing Apache Cordova.',
          'Upgrades to Stripe payment processor allowing recurring subscription based payments with Recurly.',
        ],
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
        description: [
          'Implementation of new features for both users and administators.',
          'Maintenance of existing pages to keep up with the evolving standards of the codebases reducing technical debt.',
          'Addressing user bug reports through replication and resolution of unexpected behavior.',
          'Ensuring mobile responsiveness on new and existing pages.',
        ],
        technologies: [/*'js',*/ 'knockout', 'less', 'pug'],
      },
      {
        name: 'Front-End Developer Intern',
        length: '2 Months',
        detailedLength: 'Jan 2018 - Mar 2018',
        description: [
          'Production of web pages based upon Figma design files working closely across teams.',
        ],
        technologies: [/*'js',*/ 'knockout', 'less', 'pug'],
      },
    ],
  },
]

export const freelancingHistory: WorkHistoryCompany[] = [
  {
    name: 'Clean Lines Lawn Care',
    length: '2 Months',
    detailedLength: 'Aug 2021 - Sep 2021',

    positions: [
      {
        name: 'Freelance Web Developer',
        length: '2 Months',
        detailedLength: 'Aug 2021 - Sep 2021',
        description: [
          'Completed a full redesign of public facing site along with a rewrite of front-end code from jQuery/HTML into React/JSX for maintainability.',
          'Refactor of repository to follow modern standards and implement package management through NPM.',
        ],
        technologies: ['html', 'sass', 'mysql', 'php', 'react'],
      },
      {
        name: 'Freelance Web Developer',
        length: '2 Months',
        detailedLength: 'Mar 2017 - Apr 2017',
        description: [
          'Solo development of the front/back-end to implement public facing pages modifyable through an administrative interface.',
          'Provided hosting and domain support via Digital Ocean droplets and Namecheap.',
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

    positions: [
      {
        name: 'Student - Computer Science',
        shortName: 'Computer Science',
        focus: 'Database Programming',
        length: '2 Years',
        detailedLength: '2014 - 2016',
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
  languages: ['TypeScript', 'HTML5', 'CSS3', 'Sass', 'MySQL', 'PostgreSQL'],
  librariesAndFrameworks: ['React', 'Node.js'],
  software: ['Figma', 'Trello', 'Asana', 'Jira'],
}

export const data: WorkHistoryCompany[] = [...jobHistory, ...educationHistory]

export default data
