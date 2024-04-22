import { ColumnType, Generated } from 'kysely'

declare global {
  namespace Database.Table {
    interface Activity {
      id: ColumnType<Generated<number>, never, never>
      value: string
      submitted_timestamp: ColumnType<Date, never, never>
    }
  }
}

export {}

// CREATE TABLE activity (
//     id serial PRIMARY KEY,
//     value varchar(100) not null,
//     submitted_timestamp timestamp default current_timestamp
// );
