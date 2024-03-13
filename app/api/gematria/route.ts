import 'server-only'

import { ServerRuntime } from 'next'
import { NextRequest, NextResponse } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import { createKysely } from '@vercel/postgres-kysely'
import { kv } from '@vercel/kv'

import { Transaction } from 'kysely'

export const runtime: ServerRuntime = 'edge'

const ratelimitCache: { [type: string]: Map<string, number> } = {
  presubmit: new Map<string, number>(),
  submit: new Map<string, number>(),
}
const ratelimit: { [type: string]: Ratelimit } = {
  presubmit: new Ratelimit({
    redis: kv,
    limiter: Ratelimit.slidingWindow(10, '10 s'),
    ephemeralCache: ratelimitCache.presubmit,
  }),
  submit: new Ratelimit({
    redis: kv,
    limiter: Ratelimit.slidingWindow(1, '1 d'),
    ephemeralCache: ratelimitCache.submit,
    prefix: '@upstash/ratelimit/contact_submit',
  }),
}

export const POST = async (req: NextRequest) => {
  return NextResponse.json({}, { status: 500 })

  const clientIp: string =
    req.ip ||
    req.headers.get('X-Real-IP') ||
    req.headers.get('X-Forwarded-For')?.replace(/\s/g, '').split(',').pop() ||
    '127.0.0.1'

  if (!(await ratelimit.presubmit.limit(clientIp)).success)
    return NextResponse.json({}, { status: 429 })

  // const contactFormData: FormData = await req.formData()

  // if (contactDataErrors.length)
  //   return NextResponse.json({ errors: contactDataErrors }, { status: 400 })

  if (!(await ratelimit.submit.limit(clientIp)).success)
    return NextResponse.json({}, { status: 429 })

  const db = createKysely<Database.Alic3Dev>()
  try {
    await db
      .transaction()
      .setIsolationLevel('serializable')
      .execute(async (trx: Transaction<Database.Alic3Dev>): Promise<void> => {
        // trx.selectFrom('gematria').selectAll().where('text')
        await db.updateTable('gematria').executeTakeFirstOrThrow()
        await db.insertInto('gematria').executeTakeFirstOrThrow()

        await db.insertInto('gematria_submission').values({
          client_ip: '',
          gematria_id: 32,
        })
      })

    // await db
    //   .insertInto('gematria')
    //   .values({
    //     // name: contactData.name as string,
    //     // contact_method: contactData.contactMethod as Api.Contact.Method,
    //     // email: (contactData.email as string) || null,
    //     // phone: (contactData.phone as string) || null,
    //     // message: contactData.message as string,
    //     // terms_privacy_disclaimer_agreement:
    //     //   contactData.termsPrivacyDisclaimerAgreement === 'on',
    //     // contact_consent: contactData.contactConsent === 'on',
    //     client_ip: clientIp,
    //   })
    //   .executeTakeFirstOrThrow()
  } catch {
    return NextResponse.json({}, { status: 500 })
  } finally {
    db.destroy()
  }

  // TODO: Send an email notification that someone submitted this form

  return NextResponse.json({ success: true })
}
