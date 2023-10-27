'use client'

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

import Section from '@/components/sections/Section'
import styles from '@/components/sections/WorkSection.module.scss'

import workHistory from '@/data/workHistory'

const iconLookup: { [iconName: string]: React.ReactElement } = {
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

const minimizedDescriptionsLocalStorageKey: string =
  'root:work-section:minimized-descriptions'

export default function WorkSection(): JSX.Element {
  const [minimizedDescriptions, setMinimizedDescriptions] = React.useState<
    string[]
  >([])

  const toggleMinimizeDescription = React.useCallback((key: string): void => {
    setMinimizedDescriptions((prevState: string[] = []): string[] => {
      if (prevState.includes(key))
        return prevState.filter((fKey: string): boolean => fKey !== key)

      return [...prevState, key]
    })
  }, [])

  React.useEffect((): void => {
    const minimizedDescriptionsJSON: string | null =
      window.localStorage.getItem(minimizedDescriptionsLocalStorageKey)

    if (!minimizedDescriptionsJSON) return

    try {
      const minimizedDescriptionsJSONParsed: string[] = JSON.parse(
        minimizedDescriptionsJSON
      )

      if (Array.isArray(minimizedDescriptionsJSONParsed))
        setMinimizedDescriptions(minimizedDescriptionsJSONParsed)
      else window.localStorage.removeItem(minimizedDescriptionsLocalStorageKey)
    } catch {}
  }, [])

  React.useEffect((): void => {
    const minimizedDescriptionsJSON: string = JSON.stringify(
      minimizedDescriptions
    )

    window.localStorage.setItem(
      minimizedDescriptionsLocalStorageKey,
      minimizedDescriptionsJSON
    )
  }, [minimizedDescriptions])

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
            </div>

            <div className={styles['work-item-positions']}>
              {company.positions.map((position) => {
                const companyPositionKey: string = `${company.name}:${position.name}`

                const minimized: boolean =
                  minimizedDescriptions.includes(companyPositionKey)

                return (
                  <div
                    key={companyPositionKey}
                    className={styles['work-item-position']}
                  >
                    <div className={styles['work-item-position-info']}>
                      <h4 className={styles['work-item-position-info-title']}>
                        {position.name}
                      </h4>
                      <span
                        className={styles['work-item-position-info-length']}
                      >
                        {position.length || company.length}{' '}
                        <span
                          className={
                            styles['work-item-position-info-length-detailed']
                          }
                        >
                          ({position.detailedLength || company.detailedLength})
                        </span>
                      </span>

                      <div
                        className={styles['work-item-position-info-seperator']}
                      />

                      <button
                        className={`
                          ${styles['work-item-position-info-toggle-minimize']}
                          ${minimized ? styles['minimized'] : ''}
                        `}
                        onClick={() =>
                          toggleMinimizeDescription(companyPositionKey)
                        }
                        aria-label={
                          minimized
                            ? 'Expand description'
                            : 'Minimize description'
                        }
                        title={
                          minimized
                            ? 'Expand description'
                            : 'Minimize description'
                        }
                      >
                        {minimized ? '+' : '-'}
                      </button>
                    </div>
                    {minimized || (
                      <>
                        <p className={styles['work-item-position-description']}>
                          {position.description.join(' ')}
                        </p>

                        <div
                          className={styles['work-item-position-technologies']}
                        >
                          <div
                            className={
                              styles['work-item-position-technologies-intro']
                            }
                          >
                            <span
                              className={
                                styles[
                                  'work-item-position-technologies-intro-text'
                                ]
                              }
                            >
                              stack | tech
                            </span>
                          </div>
                          {position.technologies.map((technology) => (
                            <div
                              key={technology}
                              className={
                                styles[
                                  'work-item-position-technology-icon-wrapper'
                                ]
                              }
                              title={technology}
                            >
                              {iconLookup[technology]}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )
              })}
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
