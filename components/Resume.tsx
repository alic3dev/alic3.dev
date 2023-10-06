'use client'

import dynamic from 'next/dynamic'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
})

export function Resume() {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Section #1</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  )
}

const ResumeWithViewer = dynamic(() =>
  import('@react-pdf/renderer/lib/react-pdf.browser.cjs').then(
    ({ PDFViewer }) => {
      // Create Document Component
      const ResumePDFViewer = () => (
        <PDFViewer height="100%" width="100%" style={{ border: 'none' }}>
          <Resume />
        </PDFViewer>
      )

      return ResumePDFViewer
    }
  )
)

export default ResumeWithViewer
