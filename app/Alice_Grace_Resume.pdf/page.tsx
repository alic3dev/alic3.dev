import type { Metadata } from 'next'

import ResumeWithViewer from '@/components/Resume'

export const metadata: Metadata = {
  title: 'Alice_Grace_Resume.pdf',
  description: 'A resume for Alice Grace',
}

export default function AliceGraceResumePDF() {
  return <ResumeWithViewer />
}
