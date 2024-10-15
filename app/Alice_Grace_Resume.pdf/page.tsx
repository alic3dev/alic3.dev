import type { Metadata } from 'next'

import React from 'react'

import dynamic from 'next/dynamic'

import { Resume as _Resume } from '@/components'
import { NoPageScroll } from '@/utils/useNoPageScroll'

export const metadata: Metadata = {
  title: 'Alice_Grace_Resume.pdf',
  description: 'A resume for Alice Grace',
}

const Resume = dynamic(() => Promise.resolve(_Resume), { ssr: false })

export default function AliceGraceResumePDF(): React.ReactNode {
  return (
    <>
      <NoPageScroll />
      <Resume />
    </>
  )
}
