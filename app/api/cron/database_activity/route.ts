import { kv } from '@vercel/kv'
import { createKysely } from '@vercel/postgres-kysely'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest): Promise<Response> {
  const authHeader = request.headers.get('authorization')

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401,
    })
  }

  let successfulKV = true
  let successfulKysely = true

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
