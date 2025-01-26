import 'server-only'

import type { ServerRuntime } from 'next'

import { NextResponse } from 'next/server'

export const runtime: ServerRuntime = 'edge'

export const POST = async (): Promise<NextResponse> => {
  return NextResponse.json({ success: true })
}
