import type { Metadata } from 'next'

import { Resume } from '@/components'

export const metadata: Metadata = {
  title: 'Alice_Grace_Resume.pdf',
  description: 'A resume for Alice Grace',
}

export default function AliceGraceResumePDF() {
  return <Resume />
}
