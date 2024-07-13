import type { TechnologyName } from '@/components/decorative/TechnologyIcon'
import type { WorkHistoryPosition } from '@/data/workHistory.types'

import React from 'react'
import Link from 'next/link'

import { Section } from '@/components/sections/Section'

import { LinksWithIcons } from '@/components/LinksWithIcons'
import { CollapsibleItem } from '@/components/CollapsibleItem'
import { TechnologyList } from '@/components/TechnologyList'

import { jobHistory as workHistory } from '@/data/workHistory'

import styles from '@/components/sections/WorkSection.module.scss'
import { WorkItemLogo } from '../WorkItemLogo'

export function WorkSection(): JSX.Element {
  return (
    <Section name="work">
      <div className={styles['section-header']}>
        <h2>Experience</h2>
      </div>

      {workHistory.map((company) => (
        <section key={company.name} className={styles['work-item']}>
          <CollapsibleItem id={`company|${company.name}`} title={company.name}>
            <div className={styles['work-item-content']}>
              <div className={styles['work-item-company-info']}>
                <div className={styles['work-item-company-logo']}>
                  <WorkItemLogo
                    logo={company.logo}
                    logoDark={company.logoDark}
                    logoLight={company.logoLight}
                  />
                </div>

                <div className={styles['work-item-company-subtitle']}>
                  <div className={styles['work-item-company-subtitle-content']}>
                    {company.links && <LinksWithIcons links={company.links} />}

                    <span className={styles['work-item-company-length']}>
                      {company.length}
                    </span>
                  </div>

                  <div className={styles['work-item-company-length-detailed']}>
                    ({company.detailedLength})
                  </div>
                </div>
              </div>

              <div className={styles['work-item-positions']}>
                {company.positions.map(
                  (position: WorkHistoryPosition): React.ReactNode => (
                    <div
                      key={`${company.name}:${position.name}`}
                      className={styles['work-item-position']}
                    >
                      <div className={styles['work-item-position-info']}>
                        <h4 className={styles['work-item-position-name']}>
                          {position.name}
                        </h4>

                        <div className={styles['work-item-position-length']}>
                          {position.length || company.length}
                          &nbsp;
                          <span
                            className={
                              styles['work-item-position-length-detailed']
                            }
                          >
                            ({position.detailedLength || company.detailedLength}
                            )
                          </span>
                        </div>
                      </div>

                      <p>{position.description.join(' ')}</p>
                    </div>
                  ),
                )}

                <TechnologyList
                  technologies={company.positions
                    .map((position) => position.technologies)
                    .reduce(
                      (
                        prev: TechnologyName[],
                        cur: TechnologyName[],
                      ): TechnologyName[] => [
                        ...prev,
                        ...cur.filter((val) => !prev.includes(val)),
                      ],
                      [],
                    )}
                />
              </div>
            </div>
          </CollapsibleItem>
        </section>
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
