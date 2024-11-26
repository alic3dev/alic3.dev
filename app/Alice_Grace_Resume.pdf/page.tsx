import type { Metadata } from 'next'

import React from 'react'

import { ResumeDynamic } from '@/components/Resume'

import { NoPageScroll } from '@/utils/useNoPageScroll'

export const metadata: Metadata = {
  title: 'Alice_Grace_Resume.pdf',
  description: 'A resume for Alice Grace',
}

export default function AliceGraceResumePDF(): React.ReactNode {
  return (
    <>
      <NoPageScroll />
      <ResumeDynamic />
    </>
  )
}
