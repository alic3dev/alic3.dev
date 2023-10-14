import { ColumnType, Generated } from 'kysely'

declare global {
  namespace Database.Table {
    interface ContactForm {
      id: ColumnType<Generated<number>, never, never>
      name: string
      contact_method: Api.ContactMethod
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
