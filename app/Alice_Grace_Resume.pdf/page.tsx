import type { Metadata } from 'next'

import { Resume } from '@/components'

import '@/app/noScroll.scss'

export const metadata: Metadata = {
  title: 'Alice_Grace_Resume.pdf',
  description: 'A resume for Alice Grace',
}

export default function AliceGraceResumePDF() {
  return <Resume />
}
