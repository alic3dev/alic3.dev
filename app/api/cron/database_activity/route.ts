import 'server-only'

import type { ServerRuntime } from 'next'
import type { NextRequest } from 'next/server'

import { kv } from '@vercel/kv'
import { createKysely } from '@vercel/postgres-kysely'

export const runtime: ServerRuntime = 'nodejs'

export async function GET(request: NextRequest): Promise<Response> {
  const authHeader = request.headers.get('authorization')

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401,
    })
  }

  let successfulKV: boolean = true
  let successfulKysely: boolean = true

  try {
    await kv.del('activity_key')
    await kv.set('activity_key', crypto.randomUUID())
  } catch {
    successfulKV = false
  }

  const db = createKysely<Database.Alic3Dev>()

  try {
    await db.deleteFrom('activity').executeTakeFirst()
    await db
      .insertInto('activity')
      .values({
        value: crypto.randomUUID(),
      })
      .executeTakeFirst()
  } catch {
    successfulKysely = false
  }

  return Response.json({ success: true, successfulKV, successfulKysely })
}
