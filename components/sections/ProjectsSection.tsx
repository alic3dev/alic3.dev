'use client'

import React from 'react'
// import Link from 'next/link'

import { Section } from '@/components/sections/Section'

import styles from './ProjectsSection.module.scss'
// import { BackgroundImages } from '../decorative'

export function ProjectsSection(): JSX.Element {
  return (
    <Section name="projects">
      <div className={styles['section-header']}>
        {/* <BackgroundImages
          images={[
            // '/_216f6363-270e-47cf-b032-4ef8e523fb76.jpeg',
            '/_be3eddb9-c9e1-4bc9-a8df-2ec87a5e03df.jpeg',
            '/_c42c778a-c0b4-43eb-a69f-983003c3fb02.jpeg',
          ]}
        /> */}

        <h2>Personal Projects</h2>

        <h3>ゼロ</h3>
      </div>
    </Section>
  )
}
