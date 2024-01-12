'use client'

import React from 'react'
import { GiBleedingEye } from 'react-icons/gi'

import Image from 'next/image'

import { Section } from '@/components/sections/Section'
import { Project } from '@/components/Project'

import styles from './ProjectsSection.module.scss'

export function ProjectsSection(): JSX.Element {
  return (
    <Section name="projects" className={styles.section}>
      <div className={styles['section-header']}>
        <h2>Personal Projects</h2>
      </div>

      <Project
        title="BLUEGREEN"
        links={{
          external: 'https://bluegreen.alic3.dev',
          github: 'https://github.com/alic3dev/bluegreen',
        }}
        description={
          <>
            A collection of tools/modules for the generation and manipulation of
            audio including <a href="https://bluegreen.alic3.dev/zer0">ゼロ</a>{' '}
            - a DAW for our WebAudio API based library{' '}
            <a href="https://github.com/alic3dev/zer0">ZER0</a>.
          </>
        }
        visual={
          <Image
            className={styles.image}
            src="/23u5i3.png"
            alt="ZER0 screenshot"
            width={3620}
            height={2336}
            quality={60}
          />
        }
      />

      <Project
        title="Nature of Code"
        links={{
          external: 'https://nature-of-code.alic3.dev/',
          github: 'https://github.com/alic3dev/nature-of-code',
        }}
        description={
          <>
            This is an ongoing implementation of exercises from the book{' '}
            <a href="https://natureofcode.com/">The Nature of Code</a> by Daniel
            Shiffman.
          </>
        }
        visual={
          <Image
            className={styles.image}
            src="/j24ihg.png"
            alt="Nature of Code screenshot"
            width={3620}
            height={2336}
            quality={60}
          />
        }
      />

      <Project
        title="Kana Totsugeki"
        links={{
          external: 'https://nature-of-code.alic3.dev/',
          github: 'https://github.com/alic3dev/nature-of-code',
        }}
        description={
          <>
            A simple game to help learn the Japanese kana systems hiragana and
            katakana through the repitition of time restricted recognization.
          </>
        }
        visual={
          <Image
            className={styles.image}
            src="/234uo9.png"
            alt="Kana Totsugeki screenshot"
            width={3620}
            height={2336}
            quality={60}
          />
        }
      />

      <Project
        title="Miscellaneous Magickal Tools"
        links={{
          external: '/portal',
          github:
            'https://github.com/alic3dev/alic3.dev/blob/main/app/tarot/_page.tsx',
        }}
        description={[
          <React.Fragment key={'waiting'}>
            We&apos;(re/ve) are._-been// waiting.
          </React.Fragment>,
          <ul key={'includes'}>
            <li>Tarot</li>
            <li>Gematria</li>
            <li>
              d4<strong>c</strong>2792<strong>a</strong>724<strong>52</strong>
              846f75dc4893e
              <strong>8</strong>51977cb<strong>1</strong>33d<strong>b</strong>3
            </li>
            <li>More...</li>
          </ul>,
        ]}
        visual={
          <div className={styles['icons-container']}>
            <GiBleedingEye className={styles.icon} aria-hidden />
          </div>
        }
      />
    </Section>
  )
}
