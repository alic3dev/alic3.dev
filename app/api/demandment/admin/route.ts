import 'server-only'

import type { ServerRuntime } from 'next'
import type { NextRequest } from 'next/server'

import { NextResponse } from 'next/server'

export const runtime: ServerRuntime = 'edge'

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  return NextResponse.json({ success: true })
}
