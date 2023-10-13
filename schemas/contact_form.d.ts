import { ColumnType, Generated } from 'kysely'

type ContactMethod = 'email' | 'phone' | 'either'

interface ContactFormTable {
  id: ColumnType<Generated<number>, never, never>
  name: string
  contact_method: ContactMethod
  email: string | null
  phone: string | null
  message: string
  terms_privacy_disclaimer_agreement: boolean
  contact_consent: boolean
  client_ip: string | null
  submitted_timestamp: ColumnType<Date, never, never>
}
