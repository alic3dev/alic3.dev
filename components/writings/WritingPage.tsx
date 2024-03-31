import React from 'react'
import Link from 'next/link'

import type { WritingPageData } from '@/components/writings'

import styles from '@/components/writings/WritingPage.module.scss'
import { cascadingDifferenceDisplay } from '@/utils/dates'

function parseContent(content: string): React.ReactNode {
  const splitContent: string[] = content.replaceAll('&apos;', "'").split('\\n')
  const parsedContent: React.JSX.Element[] = []

  for (const contentString of splitContent) {
    parsedContent.push(<p>{contentString}</p>)
  }

  return (
    <>
      {parsedContent.map(
        (elem: React.JSX.Element): React.JSX.Element => (
          <React.Fragment key={crypto.randomUUID()}>{elem}</React.Fragment>
        ),
      )}
    </>
  )
}

export function WritingPage({
  writingPageData,
}: {
  writingPageData: WritingPageData
}): React.ReactNode {
  const content = React.useMemo(
    (): React.ReactNode => parseContent(writingPageData.content),
    [writingPageData.content],
  )

  const timeSince: string = React.useMemo(
    () =>
      cascadingDifferenceDisplay(
        new Date(),
        writingPageData.submitted_timestamp,
      ),
    [writingPageData.submitted_timestamp],
  )

  return (
    <div className={styles['writing-page']}>
      <div className={styles.content}>
        <nav className={styles.navigation}>
          ↩{' '}
          <Link href="/writings" className={styles.previous}>
            Writings
          </Link>
          /
          <Link
            href={`/writings/${writingPageData.category_slug}`}
            title={writingPageData.category_description}
            className={styles.previous}
          >
            {writingPageData.category_title}
          </Link>
        </nav>

        <h2 className={styles.title}>{writingPageData.title}</h2>
        <div className={styles.posted}>
          Posted:{' '}
          <span
            className={styles['posted-value']}
            title={writingPageData.submitted_timestamp.toDateString()}
          >
            {timeSince}
          </span>
        </div>

        <div className={styles.writing}>{content}</div>
      </div>
    </div>
  )
}
