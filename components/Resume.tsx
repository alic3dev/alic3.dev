'use client'

import React from 'react'

// TODO: Get fonts working properly
// import { Lato } from 'next/font/google'
import dynamic, { LoaderComponent } from 'next/dynamic'

import {
  /* Font, */
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
  skills,
  WorkHistoryCompany,
  WorkHistoryPosition,
} from '@/data/workHistory'

// FIXME: Figure out why hyphenation can't be disabled
// const hyphenationCallback = (word: string): string[] => [word]
// Font.registerHyphenationCallback(hyphenationCallback)

const SkillView = ({ skill }: { skill: string }): JSX.Element => (
  <View style={styles.textContainer}>
    <Text style={styles.skillsText}>{skill}</Text>
  </View>
)

const CompanyPositionView = ({
  position,
}: {
  position: WorkHistoryPosition
}): JSX.Element => (
  <View style={styles.companyPosition}>
    <Text style={styles.companyPositionName}>{position.name}</Text>
    <Text style={styles.companyPositionLength}>{position.detailedLength}</Text>
    <Text style={styles.companyPositionDescription}>
      {position.description}
    </Text>
  </View>
)

const CompanyView = ({
  company,
}: {
  company: WorkHistoryCompany
}): JSX.Element => {
  return (
    <View style={styles.company}>
      <Text style={styles.companyName}>{company.name}</Text>
      {company.positions.map((position) => (
        <CompanyPositionView key={position.name} position={position} />
      ))}
    </View>
  )
}

const EducationPositionView = ({
  education,
  position,
}: {
  education: WorkHistoryCompany
  position: WorkHistoryPosition
}): JSX.Element => (
  <View key={position.name} style={styles.companyPosition}>
    <Text>{position.shortName}</Text>
    <Text style={styles.educationName}>{education.name}</Text>
    <Text style={styles.companyPositionLength}>{position.detailedLength}</Text>
  </View>
)

const EducationView = ({
  education,
}: {
  education: WorkHistoryCompany
}): JSX.Element => (
  <View>
    {education.positions.map(
      (position: WorkHistoryPosition): JSX.Element => (
        <EducationPositionView
          key={position.name}
          education={education}
          position={position}
        />
      )
    )}
  </View>
)

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
          {jobHistory.map(
            (company: WorkHistoryCompany): JSX.Element => (
              <CompanyView key={company.name} company={company} />
            )
          )}
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
            {skills.languages.map(
              (language: string): JSX.Element => (
                <SkillView key={language} skill={language} />
              )
            )}

            <Text style={styles.subHeading}>Libraries/Frameworks</Text>
            {skills.librariesAndFrameworks.map(
              (libraryOrFramework: string): JSX.Element => (
                <SkillView
                  key={libraryOrFramework}
                  skill={libraryOrFramework}
                />
              )
            )}

            <Text style={styles.subHeading}>Development Software</Text>
            {skills.software.map(
              (software: string): JSX.Element => (
                <SkillView key={software} skill={software} />
              )
            )}
          </View>

          <View style={styles.contentSection}>
            <Text style={styles.heading}>Education</Text>
            {educationHistory.map(
              (education: WorkHistoryCompany): JSX.Element => (
                <EducationView key={education.name} education={education} />
              )
            )}
          </View>
        </View>
      </Page>
    </Document>
  )
}

const ResumeWithViewer = dynamic(
  (): LoaderComponent =>
    import('@react-pdf/renderer/lib/react-pdf.browser.cjs').then(
      ({ PDFViewer }): (() => JSX.Element) =>
        function ResumePDFViewer(): JSX.Element {
          return (
            <PDFViewer height="100%" width="100%" style={{ border: 'none' }}>
              <Resume />
            </PDFViewer>
          )
        }
    )
)

export default ResumeWithViewer