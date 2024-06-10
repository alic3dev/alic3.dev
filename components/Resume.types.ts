import type { PDFViewer as _PDFViewerType } from '@react-pdf/renderer'
export type PDFViewerType = typeof _PDFViewerType

export interface ResumeContactInfo {
  email: string
  phone: string
}

export interface ResumeLink {
  href: string
  name?: string
}

export interface ResumeLinksInfo {
  portfolio: ResumeLink
  github: ResumeLink
}

export interface ResumeInfo {
  name: string
  title: string
  location: string
  contact: ResumeContactInfo
  links: ResumeLinksInfo
}
