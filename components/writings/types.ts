import type { Generated } from 'kysely'

export interface WritingCategoryPageData {
  slug: string
  title: string
  submitted_timestamp: Date
}

export interface WritingCategoryData {
  id?: Generated<number> | number

  description: string
  title: string
  slug: string

  writings: WritingCategoryPageData[]
}

export interface WritingPageData extends WritingCategoryPageData {
  content: string

  category_description: string
  category_title: string
  category_slug: string
}
