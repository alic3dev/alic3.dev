import type { ColumnType, Generated } from 'kysely'

declare global {
  namespace Database.Table {
    interface WritingsCategories {
      id: ColumnType<Generated<number>, never, never>
      slug: string
      title: string
      description: string
      submitted_timestamp: ColumnType<Date, never, never>
    }
  }
}

export {}

// CREATE TABLE writings_categories (
//    id serial PRIMARY KEY,
//    slug varchar(255) NOT NULL,
//    title varchar(255) NOT NULL,
//    description text,
//    submitted_timestamp timestamp default current_timestamp
// );
