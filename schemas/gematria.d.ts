import { ColumnType, Generated } from 'kysely'

import { GematriaMethod } from '@/utils/gematria'

declare global {
  namespace Database.Table {
    interface Gematria {
      id: ColumnType<Generated<number>, never, never>
      text: string
      count: number
      submitted_timestamp: ColumnType<Date, never, never>
      last_updated_timestamp: ColumnType<Date, never, never>
    }

    interface GematriaValue {
      id: ColumnType<Generated<number>, never, never>
      gematria_id: Generated<number>
      method: GematriaMethod
      decoded: number[]
    }

    interface GematriaSubmission {
      id: ColumnType<Generated<number>, never, never>
      gematria_id: Generated<number>
      client_ip: string | null
      submitted_timestamp: ColumnType<Date, never, never>
    }
  }
}

export {}

// CREATE TABLE contact_form (
//     id serial,
//     name varchar(100) not null,
//     contact_method contact_method not null,
//     email varchar(254),
//     phone varchar(15),
//     message varchar(5000) not null,
//     terms_privacy_disclaimer_agreement boolean not null,
//     contact_consent boolean not null,
//     client_ip inet,
//     submitted_timestamp timestamp default current_timestamp
// );
