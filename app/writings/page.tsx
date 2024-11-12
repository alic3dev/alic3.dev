import type { Metadata } from 'next'

import React from 'react'
import { createKysely } from '@vercel/postgres-kysely'

import { Footer, Header } from '@/components'
import { Writings } from '@/components/writings'

import type {
  WritingCategoryData,
  WritingCategoryPageData,
} from '@/components/writings'

import styles from '@/app/writings/page.module.scss'

export const metadata: Metadata = {
  title: 'Alic3.Dev - Writings',
  description: 'A collection of writings',
}

async function getWritingCategoriesData(): Promise<
  WritingCategoryData[] | undefined
> {
  'use server'

  const db = createKysely<Database.Alic3Dev>()

  let data: WritingCategoryData[] | undefined

  try {
    const returnedCategoriesData: Omit<WritingCategoryData, 'writings'>[] =
      await db
        .selectFrom('writings_categories')
        .select([
          'writings_categories.id',
          'writings_categories.slug',
          'writings_categories.title',
          'writings_categories.description',
        ])
        .execute()

    if (returnedCategoriesData && returnedCategoriesData.length) {
      const dataByCategory: Record<number, WritingCategoryData> = {}

      for (const categoryData of returnedCategoriesData) {
        const categoryId: number = categoryData.id as unknown as number

        const writings: WritingCategoryPageData[] = await db
          .selectFrom('writings')
          .select([
            'writings.slug',
            'writings.title',
            'writings.submitted_timestamp',
          ])
          .where('writings.category', '=', categoryId)
          .orderBy('writings.submitted_timestamp desc')
          .limit(10)
          .execute()

        if (writings && writings.length) {
          if (!dataByCategory[categoryId]) {
            dataByCategory[categoryId] = {
              slug: categoryData.slug,
              title: categoryData.title,
              description: categoryData.description,
              writings: [],
            }
          }

          for (const row of writings) {
            dataByCategory[categoryId].writings.push(row)
          }
        }
      }

      const categories = Object.values(dataByCategory)

      if (categories.length) {
        data = Object.values(dataByCategory)
      }
    }
  } catch (err) {
    console.error(err)
  } finally {
    db.destroy()
  }

  return data
}

export default async function WritingsPage(): Promise<React.JSX.Element> {
  const writingCategoriesData: WritingCategoryData[] | undefined =
    await getWritingCategoriesData()

  if (!writingCategoriesData) {
    return (
      <main className={styles.writings}>
        <p>Whoops, something went wrong. :(</p>

        <Footer />
        <Header minimal />
      </main>
    )
  }

  return (
    <main className={styles.writings}>
      <Writings writingCategoriesData={writingCategoriesData} />

      <Footer />
      <Header minimal />
    </main>
  )
}
