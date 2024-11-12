import type { Metadata } from 'next'

import type { WritingCategoryData } from '@/components/writings'

import React from 'react'
import { createKysely } from '@vercel/postgres-kysely'
import { redirect } from 'next/navigation'

import { Footer, Header } from '@/components'
import { WritingCategory } from '@/components/writings'

import styles from '@/app/writings/[category]/page.module.scss'

interface CategoryParams {
  category: string
}

type CategoryServerParams = Promise<CategoryParams>

export async function generateMetadata({
  params,
}: {
  params: CategoryServerParams
}): Promise<Metadata> {
  'use server'

  const paramsVal: CategoryParams = await params

  const db = createKysely<Database.Alic3Dev>()

  let categoryTitle: string = 'Unknown'
  let categoryDescription: string = ''

  try {
    const data: { title: string; description: string } | undefined = await db
      .selectFrom('writings_categories')
      .select(['title', 'description'])
      .where('slug', '=', paramsVal.category)
      .executeTakeFirst()

    if (data?.title) {
      categoryTitle = data.title
    }

    if (data?.description) {
      categoryDescription = data.description
    }
  } catch (err) {
    console.error(err)
  } finally {
    db.destroy()
  }

  return {
    title: `Alic3.Dev - ${categoryTitle} Writings`,
    description: categoryDescription,
  }
}

async function getCategoryData(
  slug: string,
): Promise<WritingCategoryData | undefined> {
  'use server'

  const db = createKysely<Database.Alic3Dev>()

  let data: WritingCategoryData | undefined

  try {
    const returnedData: Omit<WritingCategoryData, 'writings'> | undefined =
      await db
        .selectFrom('writings_categories')
        .select([
          'writings_categories.id',
          'writings_categories.slug',
          'writings_categories.description',
          'writings_categories.title',
        ])
        .where('writings_categories.slug', '=', slug)
        .executeTakeFirst()

    if (returnedData) {
      data = {
        ...returnedData,
        writings: await db
          .selectFrom('writings')
          .innerJoin(
            'writings_categories',
            'writings.category',
            'writings_categories.id',
          )
          .select([
            'writings.title',
            'writings.slug',
            'writings.submitted_timestamp',
          ])
          .where('writings.category', '=', returnedData.id as unknown as number)
          .orderBy('writings.submitted_timestamp desc')
          .execute(),
      }
    }
  } catch (err) {
    console.error(err)
  }

  delete data?.id

  return data
}

export default async function WritingsPageCategory({
  params,
}: {
  params: CategoryServerParams
}): Promise<React.JSX.Element> {
  const paramsVal: CategoryParams = await params

  const writingCategoryData: WritingCategoryData | undefined =
    await getCategoryData(paramsVal.category)

  if (!writingCategoryData) {
    return redirect('/writings')
  }

  return (
    <main className={styles['writings-page-category']}>
      <WritingCategory writingCategoryData={writingCategoryData} />

      <Footer />
      <Header minimal />
    </main>
  )
}
