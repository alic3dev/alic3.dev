import type { PDFViewerType } from '@/components/Resume.types'

import dynamic from 'next/dynamic'

export const PDFViewer: PDFViewerType = dynamic<PDFViewerType>(
  (): PDFViewerType =>
    import('@react-pdf/renderer').then<PDFViewerType>(
      (mod: { PDFViewer: PDFViewerType }): PDFViewerType => mod.PDFViewer,
    ),
  {
    ssr: false,

    loading: (): React.ReactElement => {
      return (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <h1
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            Rendering...
          </h1>
        </div>
      )
    },
  },
)
