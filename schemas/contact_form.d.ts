import { ColumnType, Generated } from 'kysely'

declare global {
  namespace Database.Table {
    interface ContactForm {
      id: ColumnType<Generated<number>, never, never>
      name: string
      contact_method: Api.Contact.Method
      email: string | null
      phone: string | null
      message: string
      terms_privacy_disclaimer_agreement: boolean
      contact_consent: boolean
      client_ip: string | null
      submitted_timestamp: ColumnType<Date, never, never>
    }
  }
}

export {}

// CREATE TABLE contact_form (
//     id serial PRIMARY KEY,
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
