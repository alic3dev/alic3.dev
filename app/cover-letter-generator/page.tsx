import type { Metadata } from 'next'

import dynamic from 'next/dynamic'

import { NoPageScroll } from '@/utils/useNoPageScroll'
import { CoverLetterGenerator as _CoverLetterGenerator } from '@/components/CoverLetterGenerator'

export const metadata: Metadata = {
  title: 'Cover Letter Generator',
  description: 'A cover letter for Alice Grace',
}

const CoverLetterGenerator = dynamic(
  () => Promise.resolve(_CoverLetterGenerator),
  { ssr: false },
)

export default function AliceGraceCoverLetterPDF(): React.ReactNode {
  return (
    <>
      <NoPageScroll />
      <CoverLetterGenerator />
    </>
  )
}
