import type { WorkHistoryPosition } from '@/data/workHistory'

import React from 'react'
import { DiPhonegap } from 'react-icons/di'
import { LiaJava } from 'react-icons/lia'
import {
  SiHackerone,
  SiLess,
  SiMariadb,
  SiPostgresql,
  SiPug,
} from 'react-icons/si'
import {
  TbBrandCpp,
  TbBrandJavascript,
  TbBrandMysql,
  TbBrandReact,
  TbBrandSass,
  TbBrandStripe,
  TbBrandTypescript,
  TbSquareLetterK,
} from 'react-icons/tb'
import Link from 'next/link'

import { Section } from '@/components/sections/Section'
import { LinksWithIcons } from '@/components/LinksWithIcons'
import { CollapsibleItem } from '@/components/CollapsibleItem'

import { data as workHistory } from '@/data/workHistory'

import styles from '@/components/sections/WorkSection.module.scss'

const iconLookup: Record<string, React.ReactElement> = {
  ts: <TbBrandTypescript />,
  react: <TbBrandReact />,
  sass: <TbBrandSass />,
  postgresql: <SiPostgresql />,
  js: <TbBrandJavascript />,
  knockout: <TbSquareLetterK />,
  less: <SiLess />,
  pug: <SiPug />,
  'c++': <TbBrandCpp />,
  mysql: <TbBrandMysql />,
  java: <LiaJava />,
  phonegap: <DiPhonegap />,
  mariadb: <SiMariadb />,
  stripe: <TbBrandStripe />,
  hackerone: <SiHackerone />,
}

export function WorkSection(): JSX.Element {
  return (
    <Section name="work">
      <div className={styles['section-header']}>
        <h2>Professional Experience</h2>
      </div>

      <div className={styles['work-item-seperator']} />

      {workHistory.map((company) => (
        <React.Fragment key={company.name}>
          <section className={styles['work-item']}>
            <div className={styles['work-item-company']}>
              <h3 className={styles['work-item-company-name']}>
                {company.name}
              </h3>

              <span className={styles['work-item-company-length']}>
                {company.length}
                <br />
                <span className={styles['work-item-company-length-detailed']}>
                  ({company.detailedLength})
                </span>
              </span>

              <LinksWithIcons links={company.links} />
            </div>

            <div className={styles['work-item-positions']}>
              {company.positions.map(
                (position: WorkHistoryPosition): React.ReactNode => (
                  <CollapsibleItem
                    key={`${company.name}:${position.name}`}
                    id={`work-section|${company.name}:${position.name}`}
                    title={position.name}
                    subTitle={position.length || company.length}
                    detailedTitle={
                      position.detailedLength || company.detailedLength
                    }
                    content={position.description.join(' ')}
                    footer={position.technologies.map(
                      (technology: string): React.ReactNode => (
                        <div
                          key={technology}
                          className={styles['technology-icon-wrapper']}
                          title={technology}
                        >
                          {iconLookup[technology]}
                        </div>
                      ),
                    )}
                    footerIntro="stack | tech"
                  />
                ),
              )}
            </div>
          </section>

          <div className={styles['work-item-seperator']} />
        </React.Fragment>
      ))}

      <Link
        className={'button ' + styles['resume-link']}
        href="/Alice_Grace_Resume.pdf"
        target="_blank"
      >
        View/download resume{' '}
        <span className={styles['resume-link-extension']}>(PDF)</span>
      </Link>
    </Section>
  )
}
