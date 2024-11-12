import type { Metadata } from 'next'

import { NoPageScroll } from '@/utils/useNoPageScroll'
import { CoverLetterGeneratorDynamic } from '@/components/CoverLetterGenerator'

export const metadata: Metadata = {
  title: 'Cover Letter Generator',
  description: 'A cover letter for Alice Grace',
}

export default function AliceGraceCoverLetterPDF(): React.ReactNode {
  return (
    <>
      <NoPageScroll />
      <CoverLetterGeneratorDynamic />
    </>
  )
}
