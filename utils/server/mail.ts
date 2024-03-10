import 'server-only'

import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.mail.me.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.ICLOUD_USER,
    pass: process.env.ICLOUD_PASSWORD,
  },
})

const defaultMailOptions: Partial<nodemailer.SendMailOptions> = {
  from: `"Alic3.Dev Mailer" <${process.env.ICLOUD_USER}>`,
  subject: 'Mail from Alic3',
}

export async function send(
  options: Partial<nodemailer.SendMailOptions>,
): Promise<boolean> {
  if (!options.to || !options.text || !options.html) return false

  const constructedOptions: nodemailer.SendMailOptions = {
    ...defaultMailOptions,
    ...options,
  }

  try {
    await transporter.sendMail(constructedOptions)
  } catch (err) {
    console.error(err)
    return false
  }

  return true
}
