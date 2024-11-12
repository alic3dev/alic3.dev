import 'server-only'

import type { ServerRuntime } from 'next'
import type { NextRequest } from 'next/server'

import type { DecodeOptions } from '@/utils/gematria'

import { NextResponse } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import { ipAddress } from '@vercel/functions'
import { kv } from '@vercel/kv'

import { decode, defaultDecodeOptions } from '@/utils/gematria'

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
    ipAddress(req) ||
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
