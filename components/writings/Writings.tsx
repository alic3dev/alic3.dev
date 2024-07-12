import type {
  WritingCategoryData,
  WritingCategoryPageData,
} from '@/components/writings/types'

import React from 'react'
import Link from 'next/link'

import { cascadingDifferenceDisplay } from '@/utils/dates'

import styles from '@/components/writings/Writings.module.scss'

export function Writings({
  writingCategoriesData,
}: {
  writingCategoriesData: WritingCategoryData[]
}): React.ReactNode {
  const currentDate: Date = new Date()

  return (
    <div className={styles.writings}>
      <h1>Writings</h1>

      <div className={styles.categories}>
        {writingCategoriesData.map(
          (category: WritingCategoryData): React.ReactNode => (
            <div key={category.slug} className={styles.category}>
              <h3 className={styles['category-title']}>
                <Link href={`/writings/${category.slug}`}>
                  {category.title}
                </Link>
              </h3>

              <ul className={styles.pages}>
                {category.writings.map(
                  (page: WritingCategoryPageData): React.ReactNode => (
                    <li key={page.slug}>
                      <span className={styles['page-content']}>
                        <Link
                          href={`/writings/${category.slug}/${page.slug}`}
                          className={styles['page-link']}
                          title={page.title}
                        >
                          {page.title}
                        </Link>
                        <span
                          className={styles.posted}
                          title={page.submitted_timestamp.toDateString()}
                        >
                          {' - '}
                          {cascadingDifferenceDisplay(
                            currentDate,
                            page.submitted_timestamp,
                          )}
                        </span>
                      </span>
                    </li>
                  ),
                )}
              </ul>
            </div>
          ),
        )}
      </div>
    </div>
  )
}
