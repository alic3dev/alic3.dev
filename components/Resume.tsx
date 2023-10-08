'use client'

import React from 'react'
import dynamic from 'next/dynamic'

// TODO: Get fonts working properly
// import { Lato } from 'next/font/google'
import {
  // Font,
  Document,
  Page,
  Text,
  View,
  Link,
} from '@react-pdf/renderer'

import icons from '@/utils/resumeIcons'
import styles from '@/styles/resumeStyles'
import {
  jobHistory,
  educationHistory,
  WorkHistoryCompany,
  WorkHistoryPosition,
} from '@/data/workHistory'

// FIXME: Figure out why hyphenation can't be disabled
// const hyphenationCallback = (word: string): string[] => [word]
// Font.registerHyphenationCallback(hyphenationCallback)

export function Resume() {
  return (
    <Document
      language="en"
      author="Alice Grace"
      subject="Full-Stack Developer Resume"
      title="Alice Grace - Resume"
      pageLayout="singlePage"
      keywords="Contact 'Work Experience' Education Skills"
    >
      <Page size="A4" wrap={false} style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerName}>Alice Grace</Text>
          <Text style={styles.headerTitle}>Full-Stack Web Developer</Text>
        </View>
        <View style={styles.mainContent}>
          <Text style={styles.heading}>Work Experience</Text>
          {jobHistory.map((company: WorkHistoryCompany) => {
            return (
              <View key={company.name} style={styles.company}>
                <Text style={styles.companyName}>{company.name}</Text>

                {company.positions.map((position: WorkHistoryPosition) => (
                  <View key={position.name} style={styles.companyPosition}>
                    <Text style={styles.companyPositionName}>
                      {position.name}
                    </Text>
                    <Text style={styles.companyPositionLength}>
                      {position.detailedLength}
                    </Text>
                    <Text style={styles.companyPositionDescription}>
                      {position.description}
                    </Text>
                  </View>
                ))}
              </View>
            )
          })}
        </View>
        <View style={styles.sideContent}>
          <View style={styles.contentSection}>
            <Text style={styles.heading}>Contact</Text>

            <View style={styles.textContainer}>
              {icons.email}
              <Text style={styles.sideContentText}>alic3dev@gmail.com</Text>
            </View>

            <View style={styles.textContainer}>
              {icons.phone}
              {/* TODO: Update this phone to a cell */}
              <Text style={styles.sideContentText}>+1 (434) 842-3440</Text>
            </View>

            <View style={styles.textContainer}>
              {icons.location}
              <Text style={styles.sideContentText}>Richmond, VA</Text>
            </View>

            <View style={styles.textContainer}>
              {icons.browser}
              <Link style={styles.sideContentText} src="https://www.alic3.dev">
                alic3.dev
              </Link>
            </View>

            <View style={styles.textContainer}>
              {icons.github}
              <Link
                style={styles.sideContentText}
                src="https://www.github.com/alic3dev"
              >
                github.com/alic3dev
              </Link>
            </View>
          </View>

          <View style={styles.contentSection}>
            <Text style={styles.heading}>Skills</Text>

            <Text style={styles.subHeadingCompact}>Languages</Text>
            {[
              'TypeScript',
              // 'React',
              // 'Node.js',
              'HTML5',
              'CSS3',
              'Sass',
              'MySQL',
              'PostgreSQL',
            ].map((skill) => (
              <View key={skill} style={styles.textContainer}>
                <Text style={styles.skillsText}>{skill}</Text>
              </View>
            ))}

            <Text style={styles.subHeading}>Libraries/Frameworks</Text>
            {[
              // 'TypeScript',
              'React',
              'Node.js',
              // 'HTML5',
              // 'CSS3',
              // 'Sass',
              // 'MySQL',
              // 'PostgreSQL',
            ].map((skill) => (
              <View key={skill} style={styles.textContainer}>
                <Text style={styles.skillsText}>{skill}</Text>
              </View>
            ))}

            <Text style={styles.subHeading}>Development Software</Text>
            {['Figma', 'Trello', 'Asana', 'Jira'].map((software) => (
              <View key={software} style={styles.textContainer}>
                <Text style={styles.skillsText}>{software}</Text>
              </View>
            ))}
          </View>

          <View style={styles.contentSection}>
            <Text style={styles.heading}>Education</Text>
            {educationHistory.map((education: WorkHistoryCompany) => (
              <View key={education.name}>
                {education.positions.map((position: WorkHistoryPosition) => (
                  <View key={position.name} style={styles.companyPosition}>
                    <Text>{position.shortName}</Text>
                    <Text style={styles.educationName}>{education.name}</Text>
                    <Text style={styles.companyPositionLength}>
                      {position.detailedLength}
                    </Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  )
}

const ResumeWithViewer = dynamic(() =>
  import('@react-pdf/renderer/lib/react-pdf.browser.cjs').then(
    ({ PDFViewer }) =>
      function ResumePDFViewer() {
        return (
          <PDFViewer height="100%" width="100%" style={{ border: 'none' }}>
            <Resume />
          </PDFViewer>
        )
      }
  )
)

export default ResumeWithViewer
