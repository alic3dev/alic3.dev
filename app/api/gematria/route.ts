import 'server-only'

import { ServerRuntime } from 'next'
import { NextRequest, NextResponse } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
// import { createKysely } from '@vercel/postgres-kysely'
import { kv } from '@vercel/kv'

import { DecodeOptions, decode, defaultDecodeOptions } from '@/utils/gematria'

// import type { Transaction } from 'kysely'

export const runtime: ServerRuntime = 'edge'

const ratelimitCache: { [type: string]: Map<string, number> } = {
  presubmit: new Map<string, number>(),
  submit: new Map<string, number>(),
}

const ratelimit: { [type: string]: Ratelimit } = {
  submit: new Ratelimit({
    redis: kv,
    limiter: Ratelimit.slidingWindow(30, '60 s'),
    ephemeralCache: ratelimitCache.submit,
    prefix: '@upstash/ratelimit/gematria',
  }),
}

export const POST = async (req: NextRequest) => {
  const clientIp: string =
    req.ip ||
    req.headers.get('X-Real-IP') ||
    req.headers.get('X-Forwarded-For')?.replace(/\s/g, '').split(',').pop() ||
    '127.0.0.1'

  if (!(await ratelimit.submit.limit(clientIp)).success) {
    return NextResponse.json({}, { status: 429 })
  }

  const gematriaFormData: FormData = await req.formData()
  const gematriaDataErrors: Api.Gematria.ResponseError[] = []
  const gematriaData: Api.Gematria.Data = {
    encodedText: gematriaFormData.get('encoded-text'),
  }

  if (
    !gematriaData.encodedText ||
    typeof gematriaData.encodedText !== 'string'
  ) {
    gematriaDataErrors.push({
      field: 'encoded-text',
      type: !gematriaData.encodedText ? 'empty' : 'invalid',
    })
  }

  const decodeOptions: DecodeOptions = {
    ...defaultDecodeOptions,
    ignoreCase: gematriaFormData.get('ignore-case') === 'on',
    ignoreCaseDirection:
      (gematriaFormData.get('ignore-case-direction') as 'Upper' | 'Lower') ??
      defaultDecodeOptions.ignoreCaseDirection,
    ignoreSpaces: gematriaFormData.get('ignore-spaces') === 'on',
  }

  if (
    decodeOptions.ignoreCaseDirection !== 'Lower' &&
    decodeOptions.ignoreCaseDirection !== 'Upper'
  ) {
    gematriaDataErrors.push({
      field: 'ignore-case-direction',
      type: !gematriaData.ignoreCaseDirection ? 'empty' : 'invalid',
    })
  }

  if (gematriaDataErrors.length) {
    return NextResponse.json({ errors: gematriaDataErrors }, { status: 400 })
  }

  const values: number[] = decode(
    gematriaData.encodedText as string,
    decodeOptions,
  )

  return NextResponse.json<Api.Gematria.ResponseData>({
    decoded: {
      sum: values.reduce((a: number, b: number): number => a + b, 0),
      values,
    },
    success: true,
  })
}

// const db = createKysely<Database.Alic3Dev>()
// try {
//   await db
//     .transaction()
//     .setIsolationLevel('serializable')
//     .execute(async (trx: Transaction<Database.Alic3Dev>): Promise<void> => {
//       // trx.selectFrom('gematria').selectAll().where('text')
//       await db.updateTable('gematria').executeTakeFirstOrThrow()
//       await db.insertInto('gematria').executeTakeFirstOrThrow()

//       await db.insertInto('gematria_submission').values({
//         client_ip: '',
//         gematria_id: 32,
//       })
//     })

//   // await db
//   //   .insertInto('gematria')
//   //   .values({
//   //     // name: contactData.name as string,
//   //     // contact_method: contactData.contactMethod as Api.Contact.Method,
//   //     // email: (contactData.email as string) || null,
//   //     // phone: (contactData.phone as string) || null,
//   //     // message: contactData.message as string,
//   //     // terms_privacy_disclaimer_agreement:
//   //     //   contactData.termsPrivacyDisclaimerAgreement === 'on',
//   //     // contact_consent: contactData.contactConsent === 'on',
//   //     client_ip: clientIp,
//   //   })
//   //   .executeTakeFirstOrThrow()
// } catch {
//   return NextResponse.json({}, { status: 500 })
// } finally {
//   db.destroy()
// }
