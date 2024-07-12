import type { Links } from '@/components/LinksWithIcons'
import type { TechnologyName } from '@/components/decorative/TechnologyIcon'

import React from 'react'
// import { GiBleedingEye } from 'react-icons/gi'

import { ImageWithViewer } from '@/components/ImageWithViewer'

import styles from '@/data/projects.module.scss'

export interface Project {
  title: string
  links?: Links
  description: JSX.Element | JSX.Element[]
  visual: JSX.Element
  technologies: TechnologyName[]
}

export const projects: Project[] = [
  {
    title: 'BLUEGREEN',
    links: {
      external: 'https://bluegreen.alic3.dev/',
      github: 'https://github.com/alic3dev/bluegreen',
    },
    description: (
      <>
        A collection of tools/modules for the generation and manipulation of
        audio including <a href="https://bluegreen.alic3.dev/zer0">ゼロ</a> - a
        DAW for my WebAudio API based library{' '}
        <a href="https://github.com/alic3dev/zer0">ZER0</a>.
      </>
    ),
    visual: (
      <ImageWithViewer
        imageProps={{
          className: styles.image,
          src: '/23u5i3.light.png',
          srcdark: '/23u5i3.dark.png',
          srclight: '/23u5i3.light.png',
          alt: 'ZER0 screenshot',
          width: 3620,
          height: 2336,
          quality: 60,
        }}
      />
    ),
    technologies: ['vite', 'react', 'ts', 'sass'],
  },
  {
    title: 'Tirest',
    links: {
      external: 'https://tirest.alic3.dev/',
      github: 'https://github.com/alic3dev/tirest',
    },
    description: (
      <>
        Tired.. Tirest.. Tertis.. Tet.. ris?
        <br />
        <br />
        Play my own version of the classic block dropping game with leaderboards
        and account statistics.
      </>
    ),
    visual: (
      <ImageWithViewer
        imageProps={{
          className: styles.image,
          src: '/htri2o.png',
          alt: 'Tirest screenshot',
          width: 3620,
          height: 2336,
          quality: 60,
        }}
      />
    ),
    technologies: ['qwik', 'ts', 'sass'],
  },
  {
    title: 'Nature of Code',
    links: {
      external: 'https://nature-of-code.alic3.dev/',
      github: 'https://github.com/alic3dev/nature-of-code',
    },
    description: (
      <>
        This is an ongoing implementation of exercises from the book{' '}
        <a href="https://natureofcode.com/">The Nature of Code</a> by Daniel
        Shiffman.
      </>
    ),
    visual: (
      <ImageWithViewer
        imageProps={{
          className: styles.image,
          src: '/j24ihg.png',
          alt: 'Nature of Code screenshot',
          width: 3620,
          height: 2336,
          quality: 60,
        }}
      />
    ),
    technologies: ['vite', 'react', 'ts', 'sass'],
  },
  {
    title: 'Kana Totsugeki',
    links: {
      external: 'https://kana-totsugeki.alic3.dev/',
      github: 'https://github.com/alic3dev/Kana-Totsugeki',
    },
    description: (
      <>
        A simple game to help learn the Japanese kana systems hiragana and
        katakana through the repitition of time restricted recognization.
      </>
    ),
    visual: (
      <ImageWithViewer
        imageProps={{
          className: styles.image,
          src: '/234uo9.png',
          alt: 'Kana Totsugeki screenshot',
          width: 3620,
          height: 2336,
          quality: 60,
        }}
      />
    ),
    technologies: ['vite', 'react', 'ts', 'sass'],
  },
  // {
  //   title: 'Miscellaneous Magickal Tools',
  //   links: {
  //     external: '/portal',
  //     github:
  //       'https://github.com/alic3dev/alic3.dev/blob/main/app/portal/page.tsx',
  //   },
  //   description: [
  //     <React.Fragment key={'waiting'}>
  //       We&apos;(re/ve) are._-been// waiting.
  //     </React.Fragment>,
  //     <ul key={'includes'}>
  //       <li>Tarot</li>
  //       <li>Gematria</li>
  //       <li>
  //         d4<strong>c</strong>2792<strong>a</strong>724<strong>52</strong>
  //         846f75dc4893e
  //         <strong>8</strong>51977cb<strong>1</strong>33d<strong>b</strong>3
  //       </li>
  //       <li>More...</li>
  //     </ul>,
  //   ],
  //   visual: (
  //     <div className={styles['icons-container']}>
  //       <GiBleedingEye className={styles.icon} aria-hidden />
  //     </div>
  //   ),
  //   technologies: []
  // },
]
