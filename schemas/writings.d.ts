import { ColumnType, Generated } from 'kysely'

declare global {
  namespace Database.Table {
    interface Writings {
      id: ColumnType<Generated<number>, never, never>
      slug: string
      title: string
      content: string
      category: number
      submitted_timestamp: ColumnType<Date, never, never>
    }
  }
}

export {}

// CREATE TABLE writings (
//    id serial PRIMARY KEY,
//    slug varchar(255) NOT NULL,
//    title varchar(255) NOT NULL,
//    content text NOT NULL,
//    category integer references writings_categories(id) NOT NULL,
//    submitted_timestamp timestamp default current_timestamp
// );
