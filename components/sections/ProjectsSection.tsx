'use client'

import React from 'react'
import { GiBleedingEye } from 'react-icons/gi'
// import { PiFaceMaskFill } from 'react-icons/pi'

import Image from 'next/image'

import { Section } from '@/components/sections/Section'
import { BackgroundImages } from '../decorative'

import styles from './ProjectsSection.module.scss'

export function ProjectsSection(): JSX.Element {
  return (
    <Section name="projects" className={styles.section}>
      {/* <BackgroundImages
        images={[
          '/_216f6363-270e-47cf-b032-4ef8e523fb76.jpeg',
          '/_9ac79e92-1d59-4904-bbf3-85ce2d031d1e.jpeg',
          '/_9b3162b1-e1a8-4fa6-b578-381be3d8ee87.jpeg',
          '/_84b3790c-609b-4464-8e23-6d21c41c579d.jpeg',
          '/_38162f49-6778-4b3b-abeb-07be3a7b0103.jpeg',
          // '/_c42c778a-c0b4-43eb-a69f-983003c3fb02.jpeg',
        ]}
      /> */}
      <div className={styles['section-header']}>
        <h2>Personal Projects</h2>
      </div>

      <div className={styles.project}>
        <div className={styles.visualization}>
          <Image
            className={styles.image}
            src="/_be3eddb9-c9e1-4bc9-a8df-2ec87a5e03df.jpeg"
            alt="BLUEGREEN"
            width={1024}
            height={1024}
          />
        </div>
        <div className={styles.info}>
          <h3 className={styles['project-title']}>BLUEGREEN</h3>
          <p className={styles.description}>
            A collection of tools/modules for the generation and manipulation of
            audio including a DAW for our WebAudio API based library ZER0.
          </p>
        </div>
      </div>

      <div className={styles.project}>
        <div className={styles.info}>
          <h3 className={styles['project-title']}>
            Miscellaneous Magickal Tools
          </h3>
          <p className={styles.description}>Explore esotericism.</p>
          <p className={styles.description}>
            We&apos;(re/ve) are._-been// waiting.
          </p>
          <ul className={styles.description}>
            <li>Tarot</li>
            <li>Gematria</li>
            <li>d4c2792a72452846f75dc4893e851977cb133db3</li>
            <li>More...</li>
          </ul>
        </div>

        <div className={`${styles.visualization} ${styles['with-icons']}`}>
          {/* <Image
            className={styles.image}
            src="/4a03107ee9f15ae9b82cedbaa4ee027f042f5d87.jpeg"
            alt=""
            width={1024}
            height={1024}
          /> */}

          <GiBleedingEye className={styles.icon} />
          {/* <div className={styles.mouth}>
            <PiFaceMaskFill className={styles.icon} />
          </div> */}
        </div>
      </div>
    </Section>
  )
}
