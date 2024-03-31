import React from 'react'
import Link from 'next/link'

import type { WritingCategoryData } from '@/components/writings'

import styles from '@/components/writings/WritingCategory.module.scss'
import { cascadingDifferenceDisplay } from '@/utils/dates'

export function WritingCategory({
  writingCategoryData,
}: {
  writingCategoryData: WritingCategoryData
}): React.ReactNode {
  const currentDate: Date = new Date()

  return (
    <div className={styles['writing-category']}>
      <div className={styles.content}>
        <nav className={styles.navigation}>
          ↩{' '}
          <Link href="/writings" className={styles.previous}>
            Writings
          </Link>
        </nav>

        <h2 className={styles.title}>{writingCategoryData.title}</h2>

        <nav>
          <ul>
            {writingCategoryData.writings.map(
              (writing): React.ReactNode => (
                <li key={writing.slug}>
                  <span className={styles['writing-content']}>
                    <Link
                      href={`/writings/${writingCategoryData.slug}/${writing.slug}`}
                    >
                      {writing.title}
                    </Link>
                    <span
                      className={styles.posted}
                      title={writing.submitted_timestamp.toDateString()}
                    >
                      {' - '}
                      {cascadingDifferenceDisplay(
                        currentDate,
                        writing.submitted_timestamp,
                      )}
                    </span>
                  </span>
                </li>
              ),
            )}
          </ul>
        </nav>
      </div>
    </div>
  )
}
