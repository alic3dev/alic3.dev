import 'server-only'

import { ipAddress } from '@vercel/functions'
import { NextRequest } from 'next/server'

export function getClientIp(req: NextRequest): string {
  return (
    ipAddress(req) ||
    req.headers.get('X-Real-IP') ||
    req.headers.get('X-Forwarded-For')?.replace(/\s/g, '').split(',').pop() ||
    '127.0.0.1'
  )
}
