import type { Metadata } from 'next'

import type { WritingPageData } from '@/components/writings'

import React from 'react'
import { createKysely } from '@vercel/postgres-kysely'
import { redirect } from 'next/navigation'

import { Footer, Header } from '@/components'
import { WritingPage } from '@/components/writings'

import styles from '@/app/writings/[category]/[slug]/page.module.scss'

interface WritingPageParams {
  category: string
  slug: string
}

export async function generateMetadata({
  params,
}: {
  params: WritingPageParams
}): Promise<Metadata> {
  'use server'

  const db = createKysely<Database.Alic3Dev>()

  let pageTitle: string = 'Unknown'

  try {
    const data: { title: string } | undefined = await db
      .selectFrom('writings')
      .innerJoin(
        'writings_categories',
        'writings.category',
        'writings_categories.id',
      )
      .select(['writings.title'])
      .where('writings.slug', '=', params.slug)
      .where('writings_categories.slug', '=', params.category)
      .executeTakeFirst()

    if (data?.title) {
      pageTitle = data.title
    }
  } catch {}

  return {
    title: `Alic3.Dev - ${pageTitle}`,
    description: pageTitle,
  }
}

async function getWritingPageData(
  category: string,
  slug: string,
): Promise<WritingPageData | undefined> {
  'use server'

  const db = createKysely<Database.Alic3Dev>()

  let data

  try {
    data = await db
      .selectFrom('writings')
      .innerJoin(
        'writings_categories',
        'writings.category',
        'writings_categories.id',
      )
      .select([
        'writings.slug',
        'writings.title',
        'writings.content',
        'writings.submitted_timestamp',
        'writings_categories.description as category_description',
        'writings_categories.title as category_title',
        'writings_categories.slug as category_slug',
      ])
      .where('writings.slug', '=', slug)
      .where('writings_categories.slug', '=', category)
      .executeTakeFirst()
  } catch (err) {
    console.error(err)
  } finally {
    db.destroy()
  }

  return data
}

export default async function WritingsPageWithCategoryAndSlug({
  params,
}: {
  params: WritingPageParams
}): Promise<React.JSX.Element> {
  const writingPageData: WritingPageData | undefined = await getWritingPageData(
    params.category,
    params.slug,
  )

  if (!writingPageData) {
    return redirect(`/writings/${params.category}`)
  }

  return (
    <main className={styles['writings-page-with-category-and-slug']}>
      <WritingPage writingPageData={writingPageData} />

      <Footer />
      <Header minimal />
    </main>
  )
}
