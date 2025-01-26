type RecaptchaActions = 'SUBMIT_CONTACT_FORM' | 'DEMANDMENT_ADMIN_LOGIN'

export const expectedActions: { [key in RecaptchaActions]: string } = {
  SUBMIT_CONTACT_FORM: 'SUBMIT_CONTACT_FORM',
  DEMANDMENT_ADMIN_LOGIN: 'DEMANDMENT_ADMIN_LOGIN',
}
