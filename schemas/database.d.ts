declare global {
  namespace Database {
    interface Alic3Dev {
      contact_form: Database.Table.ContactForm
      gematria: Database.Table.Gematria
      gematria_value: Database.Table.GematriaValue
      gematria_submission: Database.Table.GematriaSubmission
    }
  }
}

export {}
