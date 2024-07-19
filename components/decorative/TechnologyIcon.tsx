import type { IconType } from 'react-icons/lib'

import React from 'react'
import { DiPhonegap, DiJqueryLogo } from 'react-icons/di'
import { LiaJava, LiaPhp } from 'react-icons/lia'
import {
  SiHackerone,
  SiLess,
  SiMariadb,
  SiPostgresql,
  SiPug,
  SiSvelte,
  SiTensorflow,
  SiThreedotjs,
  SiQwik,
} from 'react-icons/si'
import {
  TbBrandCpp,
  TbBrandHtml5,
  TbBrandJavascript,
  TbBrandMysql,
  TbBrandReact,
  TbBrandSass,
  TbBrandStripe,
  TbBrandTypescript,
  TbBrandVite,
  TbSquareLetterK,
} from 'react-icons/tb'

import styles from '@/components/decorative/TechnologyIcon.module.scss'

export type TechnologyName =
  | 'ts'
  | 'react'
  | 'sass'
  | 'postgresql'
  | 'js'
  | 'knockout'
  | 'less'
  | 'pug'
  | 'c++'
  | 'mysql'
  | 'java'
  | 'phonegap'
  | 'mariadb'
  | 'stripe'
  | 'hackerone'
  | 'html'
  | 'php'
  | 'jquery'
  | 'vite'
  | 'qwik'
  | 'three'
  | 'tf'
  | 'svelte'

interface Technology {
  icon: IconType
  title: string
}

const technologyLookup: Record<TechnologyName, Technology> = {
  ts: {
    icon: TbBrandTypescript,
    title: 'TypeScript',
  },
  react: {
    icon: TbBrandReact,
    title: 'React',
  },
  sass: {
    icon: TbBrandSass,
    title: 'Sass',
  },
  postgresql: {
    icon: SiPostgresql,
    title: 'PostgreSQL',
  },
  js: {
    icon: TbBrandJavascript,
    title: 'JavaScript',
  },
  knockout: {
    icon: TbSquareLetterK,
    title: 'Knockout',
  },
  less: {
    icon: SiLess,
    title: 'Less',
  },
  pug: {
    icon: SiPug,
    title: 'Pug',
  },
  'c++': {
    icon: TbBrandCpp,
    title: 'C++',
  },
  mysql: {
    icon: TbBrandMysql,
    title: 'MySQL',
  },
  java: {
    icon: LiaJava,
    title: 'Java',
  },
  phonegap: {
    icon: DiPhonegap,
    title: 'PhoneGap',
  },
  mariadb: {
    icon: SiMariadb,
    title: 'MariaDB',
  },
  stripe: {
    icon: TbBrandStripe,
    title: 'Stripe',
  },
  hackerone: {
    icon: SiHackerone,
    title: 'HackerOne',
  },
  html: {
    icon: TbBrandHtml5,
    title: 'HTML5',
  },
  php: {
    icon: LiaPhp,
    title: 'PHP',
  },
  jquery: {
    icon: DiJqueryLogo,
    title: 'jQuery',
  },
  vite: {
    icon: TbBrandVite,
    title: 'Vite',
  },
  qwik: {
    icon: SiQwik,
    title: 'Qwik',
  },
  three: {
    icon: SiThreedotjs,
    title: 'Three.js',
  },
  tf: {
    icon: SiTensorflow,
    title: 'TensorFlow',
  },
  svelte: {
    icon: SiSvelte,
    title: 'Svelte',
  },
}

export function TechnologyIcon({
  technology,
}: {
  technology: TechnologyName
}): React.ReactNode {
  const tech: Technology = technologyLookup[technology]

  return (
    <div className={styles['technology-icon']} title={technology}>
      <tech.icon title={tech.title} />
    </div>
  )
}
